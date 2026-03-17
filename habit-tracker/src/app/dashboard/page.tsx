"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useHabits } from "@/hooks/useHabits";
import Navbar from "@/components/Navbar";
import HabitCard from "@/components/HabitCard";
import AddHabitModal from "@/components/AddHabitModal";
import EditHabitModal from "@/components/EditHabitModal";
import WeeklyProgress from "@/components/WeeklyProgress";
import MotivationalQuote from "@/components/MotivationalQuote";

type HabitWithMeta = {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  createdAt: string;
  streak: number;
  todayDone: boolean;
  last7Days: { date: string; done: boolean }[];
};

function DashboardContent() {
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { habits: rawHabits, isLoading, createHabit, updateHabit, deleteHabit, toggleLog } = useHabits();
  const [showModal, setShowModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState<HabitWithMeta | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Fetch streaks & today's status for each habit
  const [habitsWithMeta, setHabitsWithMeta] = useState<HabitWithMeta[]>([]);

  useEffect(() => {
    if (!rawHabits.length || !token) {
      setHabitsWithMeta([]);
      return;
    }

    async function loadMeta() {
      const enriched = await Promise.all(
        rawHabits.map(async (h) => {
          try {
            const res = await fetch(`/api/habits/${h.id}/log`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            const logs: { date: string }[] = json.data?.logs ?? [];
            const streak: number = json.data?.streak ?? 0;

            const todayStr = new Date().toDateString();
            const todayDone = logs.some(
              (l: { date: string }) => new Date(l.date).toDateString() === todayStr
            );

            // Last 7 days status
            const last7Days = Array.from({ length: 7 }, (_, i) => {
              const d = new Date();
              d.setDate(d.getDate() - i);
              const exists = logs.some(
                (l: { date: string }) => new Date(l.date).toDateString() === d.toDateString()
              );
              return { date: d.toISOString(), done: exists };
            }).reverse();

            return { ...h, streak, todayDone, last7Days };
          } catch {
            return { ...h, streak: 0, todayDone: false, last7Days: [] };
          }
        })
      );
      setHabitsWithMeta(enriched);
    }

    loadMeta();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHabits, token]);

  async function handleToggle(id: string) {
    const result = await toggleLog(id);
    // Immediately update the UI — don't wait for SWR re-fetch cascade
    setHabitsWithMeta((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        // Adjust streak: +1 if just logged, -1 if just un-logged (min 0)
        const newStreak = result.logged
          ? h.streak + 1
          : Math.max(0, h.streak - 1);
        return { ...h, todayDone: result.logged, streak: newStreak };
      })
    );
  }

  async function handleDelete(id: string) {
    await deleteHabit(id);
  }

  async function handleCreate(data: {
    name: string;
    description?: string;
    color: string;
    icon: string;
  }) {
    await createHabit(data);
  }

  async function handleUpdate(id: string, data: {
    name: string;
    description?: string;
    color: string;
    icon: string;
  }) {
    await updateHabit(id, data);
  }

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="spinner" style={{ width: 36, height: 36, borderWidth: 4, borderTopColor: "var(--brand-500)", borderColor: "var(--border)" }} />
      </div>
    );
  }

  if (!user) return null;

  const todayDoneCount = habitsWithMeta.filter((h) => h.todayDone).length;
  const totalHabits = habitsWithMeta.length;
  const completionPct = totalHabits > 0 ? Math.round((todayDoneCount / totalHabits) * 100) : 0;
  const bestStreak = habitsWithMeta.reduce((max, h) => Math.max(max, h.streak), 0);

  // Aggregate weekly data
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toDateString();
    
    let count = 0;
    habitsWithMeta.forEach(h => {
      if (h.last7Days.some(l => new Date(l.date).toDateString() === dayStr && l.done)) {
        count++;
      }
    });

    return {
      date: d.toISOString(),
      count,
      total: totalHabits
    };
  });

  // Sort habits: incomplete first
  const sortedHabits = [...habitsWithMeta].sort((a, b) => {
    if (a.todayDone && !b.todayDone) return 1;
    if (!a.todayDone && b.todayDone) return -1;
    return 0;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      <main className="container" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.8rem", marginBottom: "0.25rem" }}>
              Good{getGreeting()},{" "}
              <span className="gradient-text">
                {user.email.split("@")[0]}
              </span>{" "}
              👋
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => setShowModal(true)}
          >
            + New Habit
          </button>
        </div>

        <MotivationalQuote />

        {/* Weekly Progress bar */}
        {totalHabits > 0 && <WeeklyProgress data={weeklyData} />}

        {/* Stats Row */}
        {totalHabits > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            <StatCard
              emoji="📋"
              label="Total Habits"
              value={String(totalHabits)}
            />
            <StatCard
              emoji="✅"
              label="Done Today"
              value={`${todayDoneCount} / ${totalHabits}`}
            />
            <StatCard
              emoji="📈"
              label="Completion"
              value={`${completionPct}%`}
              accent={completionPct === 100}
            />
            <StatCard emoji="🔥" label="Best Streak" value={`${bestStreak}d`} />
          </div>
        )}

        {/* Habits Grid */}
        {isLoading ? (
          <div className="empty-state">
            <span className="spinner" style={{ width: 40, height: 40, borderWidth: 4, borderTopColor: "var(--brand-500)", borderColor: "var(--border)" }} />
            <p>Loading your habits…</p>
          </div>
        ) : habitsWithMeta.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🌱</div>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text)" }}>No habits yet!</h2>
            <p style={{ maxWidth: "320px" }}>
              Create your first habit and start building the life you want.
            </p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setShowModal(true)}
              style={{ marginTop: "0.5rem" }}
            >
              Create Your First Habit ✦
            </button>
          </div>
        ) : (
          <div className="habits-grid">
            {sortedHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                {...habit}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={() => setEditingHabit(habit)}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <AddHabitModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}

      {editingHabit && (
        <EditHabitModal
          habit={editingHabit}
          onClose={() => setEditingHabit(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

function StatCard({
  emoji,
  label,
  value,
  accent = false,
}: {
  emoji: string;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className="card"
      style={{
        padding: "1.25rem",
        background: accent
          ? "linear-gradient(135deg, var(--brand-500), var(--accent-500))"
          : "var(--surface)",
      }}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{emoji}</div>
      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: 800,
          color: accent ? "#fff" : "var(--text)",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.78rem",
          color: accent ? "rgba(255,255,255,0.8)" : "var(--text-muted)",
          marginTop: "0.25rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export default function DashboardPage() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
