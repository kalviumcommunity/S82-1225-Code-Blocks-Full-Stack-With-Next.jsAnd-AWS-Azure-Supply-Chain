"use client";

type WeeklyData = {
  date: string;
  count: number;
  total: number;
};

type Props = {
  data: WeeklyData[];
};

export default function WeeklyProgress({ data }: Props) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="card" style={{ padding: "1.5rem", marginBottom: "2.5rem" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--text)" }}>
        Weekly Activity
      </h3>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "100px", gap: "0.5rem" }}>
        {data.map((day, i) => {
          const date = new Date(day.date);
          const dayName = days[date.getDay()];
          const percentage = day.total > 0 ? (day.count / day.total) * 100 : 0;
          
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  background: "var(--surface-2)", 
                  borderRadius: "6px", 
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <div 
                  style={{ 
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: `${percentage}%`,
                    background: percentage === 100 ? "var(--success)" : "var(--brand-500)",
                    transition: "height 0.5s ease-out",
                    borderRadius: "2px"
                  }} 
                />
              </div>
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)" }}>
                {dayName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
