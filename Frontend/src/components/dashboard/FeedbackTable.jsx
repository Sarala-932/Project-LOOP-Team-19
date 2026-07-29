import { useState } from "react";
function FeedbackTable() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const feedback = [
        {
            name: "John",
            status: "Pending",
            color: "orange",
        },
        {
            name: "Rahul",
            status: "Reviewed",
            color: "blue",
        },
        {
            name: "Priya",
            status: "Approved",
            color: "green",
        },
    ];
    const filteredFeedback = feedback.filter((item) => {
        const matchName = item.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchStatus =
            status === "All" || item.status === status;

        return matchName && matchStatus;
    });

    return (
        <div
            style={{
                marginTop: "40px",
            }}
        >
            <h2>Recent Feedback</h2>
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "16px",
                        outline: "none",
                        boxSizing: "border-box"
                    }}
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Approved">Approved</option>
                </select>
            </div>

            <table
                style={{
                    flex: 1,
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr
                        style={{
                            background: "#f4f7fc",
                        }}
                    >
                        <th
                            style={{
                                padding: "15px",
                                textAlign: "left",
                            }}
                        >
                            Name
                        </th>

                        <th
                            style={{
                                padding: "15px",
                                textAlign: "left",
                            }}
                        >
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredFeedback.length > 0 ? (
                        filteredFeedback.map((item) => (
                            <tr key={item.name}>
                                <td style={{ padding: "15px" }}>
                                    {item.name}
                                </td>

                                <td
                                    style={{
                                        padding: "15px",
                                        color: item.color,
                                    }}
                                >
                                    {item.status}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="2"
                                style={{
                                    padding: "30px",
                                    textAlign: "center",
                                    color: "#777",
                                    fontWeight: "bold",
                                }}
                            >
                                No Feedback Found 😔
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default FeedbackTable;