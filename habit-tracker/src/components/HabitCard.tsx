"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

type HabitCardProps = {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  streak: number;
  todayDone: boolean;
  last7Days?: { date: string; done: boolean }[];
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit?: (id: string) => void;
};

export default function HabitCard({
  id,
  name,
  description,
  color,
  icon,
  streak,
  todayDone,
  last7Days = [],
  onToggle,
  onDelete,
  onEdit,
}: HabitCardProps) {
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleToggle() {
    setToggling(true);
    try {
      await onToggle(id);
      toast.success(todayDone ? "Unmarked for today" : "Habit completed! 🎉");
    } catch {
      toast.error("Failed to update habit");
    } finally {
      setToggling(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeleting(true);
    try {
      await onDelete(id);
      toast.success("Habit deleted");
    } catch {
      toast.error("Failed to delete habit");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div
      className={`habit-card ${todayDone ? "completed" : ""}`}
      style={{ 
        ["--card-color" as string]: color, 
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s"
      }}
    >
      <Link href={`/habits/${id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                fontSize: "1.75rem",
                lineHeight: "1",
                background: `${color}22`,
                padding: "0.4rem",
                borderRadius: "10px",
              }}
            >
              {icon}
            </span>
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "0.15rem",
                }}
              >
                {name}
              </h3>
              {description && (
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.4,
                  }}
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.5rem" }} onClick={(e) => e.stopPropagation()}>
            <button
              className="btn btn-icon"
              onClick={() => onEdit?.(id)}
              title="Edit habit"
              style={{ flexShrink: 0, background: "var(--surface-2)" }}
            >
              ✏️
            </button>
            <button
              className="btn btn-icon btn-danger"
              onClick={handleDelete}
              disabled={deleting}
              title="Delete habit"
              style={{ flexShrink: 0 }}
            >
              {deleting ? (
                <span className="spinner" style={{ borderTopColor: "var(--danger)" }} />
              ) : (
                "🗑️"
              )}
            </button>
          </div>
        </div>

        {/* 7-day strip */}
        {last7Days && last7Days.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
              padding: "0.5rem",
              background: "var(--surface-2)",
              borderRadius: "8px",
            }}
          >
            {last7Days.map((d, i) => (
              <div
                key={i}
                title={new Date(d.date).toLocaleDateString()}
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: d.done ? color : "var(--border)",
                  opacity: d.done ? 1 : 0.4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.6rem",
                  color: "#fff",
                }}
              >
                {d.done ? "✓" : ""}
              </div>
            ))}
          </div>
        )}

        {/* Streak */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          <span
            style={{
              background: streak > 0 ? `${color}22` : "var(--surface-2)",
              color: streak > 0 ? color : "var(--text-muted)",
              padding: "0.2rem 0.7rem",
              borderRadius: "999px",
              fontSize: "0.78rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            🔥 {streak}d streak
          </span>

          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "0.78rem",
              fontWeight: 600,
            }}
          >
            Best: {streak}d
          </span>

          {todayDone && (
            <span
              style={{
                padding: "0.2rem 0.7rem",
                borderRadius: "999px",
                fontSize: "0.78rem",
                fontWeight: 700,
                background: "rgba(16,185,129,0.15)",
                color: "var(--success)",
              }}
            >
              ✓ Done today
            </span>
          )}
        </div>
      </Link>

      {/* Toggle Button */}
      <div onClick={(e) => e.stopPropagation()}>
        <button
          className="btn btn-lg"
          onClick={handleToggle}
          disabled={toggling}
          style={{
            width: "100%",
            background: todayDone
              ? "rgba(16,185,129,0.12)"
              : `linear-gradient(135deg, ${color}, ${color}dd)`,
            color: todayDone ? "var(--success)" : "#fff",
            border: todayDone ? "1.5px solid var(--success)" : "none",
            fontWeight: 700,
          }}
        >
          {toggling ? (
            <span
              className="spinner"
              style={{
                borderTopColor: todayDone ? "var(--success)" : "#fff",
              }}
            />
          ) : todayDone ? (
            "✓ Mark as not done"
          ) : (
            "Mark as Done ✦"
          )}
        </button>
      </div>
    </div>
  );
}
