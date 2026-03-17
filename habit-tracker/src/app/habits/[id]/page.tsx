"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useHabits } from "@/hooks/useHabits";
import Navbar from "@/components/Navbar";
import CalendarHeatmap from "@/components/CalendarHeatmap";
import toast from "react-hot-toast";
import Link from "next/link";

type HabitDetail = {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  createdAt: string;
  logs: { date: string }[];
  streak: number;
};

export default function HabitDetailPage() {
  const { id } = useParams();
  const { token, user, isLoading: authLoading } = useAuth();
  const { deleteHabit } = useHabits();
  const router = useRouter();
  
  const [habit, setHabit] = useState<HabitDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (!token || !id) return;

    async function loadHabit() {
      try {
        const res = await fetch(`/api/habits/${id}/log`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        
        if (!res.ok) throw new Error(json.error ?? "Failed to load habit");
        
        // Find habit details from the main list (or we could have a specific GET /api/habits/[id] but we have /api/habits)
        const habitsRes = await fetch("/api/habits", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const habitsJson = await habitsRes.json();
        const found = habitsJson.data?.find((h: any) => h.id === id);
        
        if (!found) throw new Error("Habit not found");

        setHabit({
          ...found,
          logs: json.data?.logs ?? [],
          streak: json.data?.streak ?? 0,
        });
      } catch (err: any) {
        toast.error(err.message);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadHabit();
  }, [id, token, user, authLoading, router]);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this habit? All history will be lost.")) return;
    try {
      await deleteHabit(id as string);
      toast.success("Habit deleted");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to delete habit");
    }
  }

  if (loading || authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <span className="spinner" style={{ width: 40, height: 40 }} />
      </div>
    );
  }

  if (!habit) return null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />
      
      <main className="container" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Back Link */}
        <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--brand-500)", fontWeight: 600, marginBottom: "2rem", textDecoration: "none" }}>
          ← Back to Dashboard
        </Link>

        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <div style={{ fontSize: "3rem", background: `${habit.color}22`, padding: "1rem", borderRadius: "16px", border: `2px solid ${habit.color}44` }}>
              {habit.icon}
            </div>
            <div>
              <h1 style={{ fontSize: "2.2rem", color: "var(--text)", marginBottom: "0.5rem" }}>{habit.name}</h1>
              {habit.description && <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>{habit.description}</p>}
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", background: "var(--surface-2)", padding: "0.3rem 0.8rem", borderRadius: "999px" }}>
                  Created {new Date(habit.createdAt).toLocaleDateString()}
                </span>
                <span style={{ fontSize: "0.85rem", color: habit.color, background: `${habit.color}11`, padding: "0.3rem 0.8rem", borderRadius: "999px", fontWeight: 700 }}>
                  🔥 {habit.streak} Day Streak
                </span>
              </div>
            </div>
          </div>
          
          <button className="btn btn-danger" onClick={handleDelete}>Delete Habit</button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
          <CalendarHeatmap logs={habit.logs} color={habit.color} />
          
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Quick Stats</h3>
            <div style={{ display: "grid", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "var(--surface-2)", borderRadius: "10px" }}>
                <span style={{ color: "var(--text-muted)" }}>Total Completions</span>
                <span style={{ fontWeight: 800, color: "var(--text)" }}>{habit.logs.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "var(--surface-2)", borderRadius: "10px" }}>
                <span style={{ color: "var(--text-muted)" }}>Best Streak</span>
                <span style={{ fontWeight: 800, color: "var(--brand-500)" }}>{habit.streak} days</span>
              </div>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.5rem" }}>Log History</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {habit.logs.length === 0 ? (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem" }}>No logs yet. Start today!</p>
            ) : (
              [...habit.logs].reverse().map((log, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", background: "var(--surface-2)", borderRadius: "8px", borderLeft: `4px solid ${habit.color}` }}>
                  <span style={{ fontWeight: 600 }}>{new Date(log.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span style={{ color: "var(--success)" }}>✓ Completed</span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
