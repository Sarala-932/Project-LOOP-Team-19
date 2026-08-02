import Feedback from "../models/feedback.model.mjs";
import createError from "../utils/createError.mjs";
import csv from "csv-parser";
import { Readable } from "stream";

export const createFeedbackService = async (workspaceId, data) => {
    if (!data.text) {
        throw createError("Feedback text is required", 400);
    }

    // Creating feedback linked specifically to the user's workspace
    const feedback = await Feedback.create({
        workspaceId,
        content: data.text,
        channel: data.channel || "MANUAL",
        sentiment: data.sentiment || "NEUTRAL",
        status: data.status || "NEW",
    });

    return feedback;
};

export const getFeedbacksService = async (workspaceId, query) => {
    const {page = 1, limit = 10, status, channel, sentiment, search, startDate, endDate} = query;

    // MANDATORY TENANT ISOLATION: Every query must filter by workspaceId
    const filter = {workspaceId};

    if (status) filter.status = status;
    if (channel) filter.channel = channel;
    if (sentiment) filter.sentiment = sentiment;

    // Date Range Filter
    if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate);
        if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // Full-Text Search
    if (search) {
        filter.content = {$regex: search, $options: "i"}; // Case-insensitive regex search
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const feedbacks = await Feedback.find(filter)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Feedback.countDocuments(filter);

    return {
        feedbacks,
        pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
        },
    };
};

export const getFeedbackByIdService = async (workspaceId, feedbackId) => {
    // Tenant isolation: Ensure feedback belongs to user's workspace
    const feedback = await Feedback.findOne({
        _id: feedbackId,
        workspaceId,
    });

    if (!feedback) {
        throw createError("Feedback not found or access denied", 404);
    }
    return feedback;
};

export const updateFeedbackService = async (workspaceId, feedbackId, updateData) => {
    // Tenant isolation: Ensure update only happens if it belongs to user's workspace
    const feedback = await Feedback.findOneAndUpdate({_id: feedbackId, workspaceId}, updateData, {
        new: true,
        runValidators: true,
    });

    if (!feedback) {
        throw createError("Feedback not found or access denied", 404);
    }
    return feedback;
};

export const deleteFeedbackService = async (workspaceId, feedbackId) => {
    // Tenant isolation: Ensure delete only happens if it belongs to user's workspace
    const feedback = await Feedback.findOneAndDelete({_id: feedbackId, workspaceId});
    if (!feedback) {
        throw createError("Feedback not found or access denied", 404);
    }
    return feedback;
};

export const bulkUploadFeedbackService = async (workspaceId, fileBuffer) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let failureCount = 0;

        Readable.from(fileBuffer)
            .pipe(csv())
            .on("data", (data) => {
                const content = data.content || data.text;
                if (!content) {
                    failureCount++;
                    return; // Skip invalid row
                }

                results.push({
                    workspaceId,
                    content,
                    channel: data.channel || "MANUAL",
                    customerLabel: data.customerLabel || data.customer_label || "",
                    sentiment: data.sentiment || "NEUTRAL",
                    status: "NEW",
                });
            })
            .on("end", async () => {
                try {
                    let successCount = 0;
                    if (results.length > 0) {
                        // Use insertMany to efficiently save all documents
                        await Feedback.insertMany(results, { ordered: false });
                        successCount = results.length;
                    }
                    resolve({
                        message: "CSV imported successfully",
                        successCount,
                        failureCount,
                    });
                } catch (error) {
                    reject(createError("Database error during bulk insert", 500));
                }
            })
            .on("error", (error) => {
                reject(createError("Error parsing CSV file", 500));
            });
    });
};
