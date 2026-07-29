import Feedback from "../models/feedback.model.mjs";
import createError from "../utils/createError.mjs";

export const createFeedbackService = async (workspaceId, data) => {
    if (!data.text) {
        throw createError("Feedback text is required", 400);
    }

    // Creating feedback linked specifically to the user's workspace
    const feedback = await Feedback.create({
        workspaceId,
        text: data.text,
        channel: data.channel || "MANUAL",
        sentiment: data.sentiment || "NEUTRAL",
        status: data.status || "NEW",
    });

    return feedback;
};

export const getFeedbacksService = async (workspaceId, query) => {
    const {page = 1, limit = 10, status, channel} = query;

    // MANDATORY TENANT ISOLATION: Every query must filter by workspaceId
    const filter = {workspaceId};

    if (status) filter.status = status;
    if (channel) filter.channel = channel;

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
    const feedback = await Feedback.findOne({_id: feedbackId, workspaceId});
    if (!feedback) {
        throw createError("Feedback not found or access denied", 404);
    }
    return feedback;
};

export const updateFeedbackService = async (workspaceId, feedbackId, updateData) => {
    // Tenant isolation: Ensure update only happens if it belongs to user's workspace
    const feedback = await Feedback.findOneAndUpdate(
        {_id: feedbackId, workspaceId},
        updateData,
        {new: true, runValidators: true}
    );

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
