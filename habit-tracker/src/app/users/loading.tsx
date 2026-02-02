export default function Loading() {
  return (
    <main style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "16px" }}>Loading users...</h2>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            height: "16px",
            backgroundColor: "#e5e7eb",
            borderRadius: "4px",
            marginBottom: "12px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
