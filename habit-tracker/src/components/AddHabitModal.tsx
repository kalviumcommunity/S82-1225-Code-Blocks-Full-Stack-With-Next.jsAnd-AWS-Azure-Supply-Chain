"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const COLORS = [
  "#6366f1", "#ec4899", "#10b981", "#f59e0b",
  "#ef4444", "#3b82f6", "#8b5cf6", "#14b8a6",
];

const ICONS = ["✨", "💪", "📚", "🏃", "🧘", "💧", "🍎", "😴", "🎯", "🎨"];

type Props = {
  onClose: () => void;
  onCreate: (data: {
    name: string;
    description?: string;
    color: string;
    icon: string;
  }) => Promise<void>;
};

export default function AddHabitModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [icon, setIcon] = useState(ICONS[0]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter a habit name");
    setLoading(true);
    try {
      await onCreate({ name: name.trim(), description: description.trim() || undefined, color, icon });
      toast.success("Habit created! 🎉");
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to create habit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.3rem" }}>Create New Habit</h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose} style={{ fontSize: "1.2rem" }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Icon Picker */}
          <div className="form-group">
            <label className="form-label">Icon</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {ICONS.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  style={{
                    fontSize: "1.5rem",
                    padding: "0.4rem",
                    borderRadius: "8px",
                    border: `2px solid ${icon === ic ? color : "transparent"}`,
                    background: icon === ic ? `${color}22` : "var(--surface-2)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className="form-group">
            <label className="form-label">Color</label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: c,
                    border: color === c ? `3px solid var(--text)` : "3px solid transparent",
                    cursor: "pointer",
                    boxShadow: color === c ? `0 0 0 2px ${c}55` : "none",
                    transition: "all 0.15s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="habit-name">Habit Name *</label>
            <input
              id="habit-name"
              className="form-input"
              placeholder="e.g. Morning Run"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="habit-desc">Description</label>
            <textarea
              id="habit-desc"
              className="form-input"
              placeholder="What does this habit involve? (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Preview */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              background: `${color}11`,
              border: `1.5px solid ${color}44`,
              borderRadius: "var(--radius-md)",
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>{icon}</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: "0.95rem" }}>{name || "Your habit name"}</p>
              {description && (
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{description}</p>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner" /> : "Create Habit ✦"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
