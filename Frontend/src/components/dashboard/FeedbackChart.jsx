import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


function FeedbackChart() {
    const data = [
        {
            month: "Jan",
            feedback: 40,
        },
        {
            month: "Feb",
            feedback: 65,
        },
        {
            month: "Mar",
            feedback: 55,
        },
        {
            month: "Apr",
            feedback: 80,
        },
        {
            month: "May",
            feedback: 72,
        },
        {
            month: "Jun",
            feedback: 95,
        },
    ];
    return (
        <div
            style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                marginTop: "40px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
        >
            <h2>Feedback Overview</h2>
            <div
                style={{
                    width: "100%",
                    height: "300px",
                    marginTop: "20px",
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="feedback"
                        stroke="#4F46E5"
                        strokeWidth={3}
                    />
                </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default FeedbackChart;