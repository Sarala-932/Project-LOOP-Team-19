function StatCard({ title, value, icon, growth }) {
    return (
        <div
            style={{
                width: "180px",
                padding: "20px",
                borderRadius: "10px",
                background: "#f8fafc",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0,0,0,0.15)";
            }}

            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.08)";
            }}
        >
            <div
                style={{
                    fontSize: "28px",
                    marginBottom: "10px",
                }}
            >
                {icon}
            </div>
            <h3>{title}</h3>

            <h1>{value}</h1>
            <p
                style={{
                    color: "green",
                    marginTop: "10px",
                    fontWeight: "bold",
                }}
            >
                {growth} this week
            </p>
        </div>
    );
}

export default StatCard;