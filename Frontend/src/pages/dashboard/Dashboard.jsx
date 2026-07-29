import StatCard from "../../components/dashboard/StatCard";
import Navbar from "../../components/common/Navbar";
import FeedbackTable from "../../components/dashboard/FeedbackTable";
import FeedbackChart from "../../components/dashboard/FeedbackChart";
import FeedbackPieChart from "../../components/dashboard/FeedbackPieChart";

function Dashboard() {
    const stats = [
        {
            title: "Total Feedback",
            value: "120",
            icon: "📊",
            growth: "+12%",
        },
        {
            title: "Pending Review",
            value: "35",
            icon: "⏳",
            growth: "+5%",
        },
        {
            title: "Resolved",
            value: "85",
            icon: "✅",
            growth: "+20%",
        },
        {
            title: "AI Score",
            value: "94%",
            icon: "🤖",
            growth: "+8%",
        },
    ];
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f7fc",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                }}
            >
                <Navbar />
                <h1>Welcome Vishal 👋</h1>
                <p
                    style={{
                        color: "#666",
                        marginBottom: "30px",
                    }}
                >
                    AI Intelligence Feedback Platform
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "30px",
                        flexWrap: "wrap",
                    }}
                >
                    {stats.map((item, index) => (
                        <StatCard
                            key={index}
                            title={item.title}
                            value={item.value}
                            icon={item.icon}
                            growth={item.growth}
                        />
                    ))}
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "40px",
                        flexWrap: "wrap",
                        alignItems: "stretch",
                    }}
                >

                    <div
                        style={{
                            flex: 2,
                            minWidth: "600px",
                        }}
                    >
                        <FeedbackChart />
                    </div>

                    <div
                        style={{
                            flex: 1,
                            minWidth: "300px",
                        }}
                    >
                        <FeedbackPieChart />
                    </div>

                </div>

                <FeedbackTable />

            </div>
        </div>
    );
}

export default Dashboard;