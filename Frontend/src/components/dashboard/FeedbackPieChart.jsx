import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const data = [
    { name: "Pending", value: 35 },
    { name: "Reviewed", value: 85 },
    { name: "Approved", value: 120 },
];

const COLORS = [
    "#F59E0B",
    "#3B82F6",
    "#10B981",
];

function FeedbackPieChart() {

    return (
        <div
            style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                marginTop: "40px",
            }}
        >
            <h2>Feedback Status</h2>
            <div
                style={{
                    width: "100%",
                    height: "340px",
                    marginTop: "20px",
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart
                        margin={{
                            top: 10,
                            right: 10,
                            bottom: 10,
                            left: 10,
                        }}
                    >
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            isAnimationActive={true}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}
export default FeedbackPieChart;