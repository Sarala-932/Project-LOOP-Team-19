import Feedback from "../models/feedback.model.mjs";
import mongoose from "mongoose";

export const getDashboardStatsService = async (workspaceId) => {
   
    const statsPipeline = [
        { $match: { workspaceId: new mongoose.Types.ObjectId(workspaceId) } },
        {
            $group: {
                _id: null,
                totalFeedbacks: { $sum: 1 },
                positiveCount: {
                    $sum: { $cond: [{ $eq: ["$sentiment", "POS"] }, 1, 0] },
                },
                negativeCount: {
                    $sum: { $cond: [{ $eq: ["$sentiment", "NEG"] }, 1, 0] },
                },
                neutralCount: {
                    $sum: { $cond: [{ $eq: ["$sentiment", "NEU"] }, 1, 0] },
                },
            },
        },
    ];

    // 2. Get volume over time (last 30 days) split by sentiment
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const volumePipeline = [
        {
            $match: {
                workspaceId: new mongoose.Types.ObjectId(workspaceId),
                createdAt: { $gte: thirtyDaysAgo },
                sentiment: { $in: ["POS", "NEG"] }, // Focus on POS/NEG for the line chart
            },
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sentiment: "$sentiment"
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { "_id.date": 1 } },
    ];

    // 3. Get feedback by source (channel) for the Donut Chart
    const channelPipeline = [
        { $match: { workspaceId: new mongoose.Types.ObjectId(workspaceId) } },
        {
            $group: {
                _id: "$channel",
                count: { $sum: 1 },
            },
        },
    ];

    // Execute pipelines in parallel
    const [statsResult, volumeResult, channelResult] = await Promise.all([
        Feedback.aggregate(statsPipeline),
        Feedback.aggregate(volumePipeline),
        Feedback.aggregate(channelPipeline),
    ]);

    const stats = statsResult[0] || {
        totalFeedbacks: 0,
        positiveCount: 0,
        negativeCount: 0,
        neutralCount: 0,
    };

    // Format Volume Result (convert to something easier for the line chart)
    const volumeMap = {};
    volumeResult.forEach(item => {
        const date = item._id.date;
        const sentiment = item._id.sentiment;
        if (!volumeMap[date]) {
            volumeMap[date] = { date, POS: 0, NEG: 0 };
        }
        volumeMap[date][sentiment] = item.count;
    });
    
    // Sort dates properly
    const volumeOverTime = Object.values(volumeMap).sort((a, b) => new Date(a.date) - new Date(b.date));

    // Format Channel Result
    const channels = {};
    channelResult.forEach(item => {
        channels[item._id] = item.count;
    });

    // Calculate percentage for stat cards
    const negativePercentage =
        stats.totalFeedbacks === 0
            ? 0
            : ((stats.negativeCount / stats.totalFeedbacks) * 100).toFixed(1);

    return {
        statCards: {
            totalFeedbacks: stats.totalFeedbacks,
            positiveCount: stats.positiveCount,
            negativeCount: stats.negativeCount,
            negativePercentage,
        },
        sentimentBreakdown: {
            POS: stats.positiveCount,
            NEG: stats.negativeCount,
            NEU: stats.neutralCount,
        },
        feedbackBySource: channels,
        volumeOverTime: volumeOverTime,
        topThemes: [], // Placeholder: will be powered by AI clustering in Week 3
    };
};
