import { getDashboardStatsService } from "../services/analytics.service.mjs";

export const getDashboardStats = async (req, res) => {
    try {
        const workspaceId = req.user.workspaceId;
        const stats = await getDashboardStatsService(workspaceId);
        
        res.status(200).json(stats);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};
