"use client";

type Props = {
  logs: { date: string }[];
  color: string;
};

export default function CalendarHeatmap({ logs, color }: Props) {
  // Get last 30 days
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const dayStr = d.toDateString();
    const done = logs.some((l) => new Date(l.date).toDateString() === dayStr);
    return { date: d, done };
  });

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Last 30 Days</h3>
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(30px, 1fr))", 
          gap: "0.5rem" 
        }}
      >
        {days.map((day, i) => (
          <div
            key={i}
            title={day.date.toLocaleDateString()}
            style={{
              width: "100%",
              aspectRatio: "1/1",
              background: day.done ? color : "var(--surface-2)",
              borderRadius: "4px",
              opacity: day.done ? 1 : 0.4,
              transition: "transform 0.2s",
              border: i === 29 ? `2px solid ${color}` : "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
