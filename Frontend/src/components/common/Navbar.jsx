function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <span>🔔</span>
        <span>⚙️</span>

        <button
          style={{
            padding: "8px 15px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;