import React from "react";
import useSWR from "swr";
import { useAuth } from "@/context/AuthContext";

type Habit = {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  createdAt: string;
  todayDone?: boolean;
  streak?: number;
};

function buildFetcher(token: string | null) {
  return async (url: string) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    return json.data ?? json;
  };
}

const EMPTY_HABITS: Habit[] = [];

export function useHabits() {
  const { token } = useAuth();
  
  const fetcher = React.useMemo(() => buildFetcher(token), [token]);

  const { data, error, isLoading, mutate } = useSWR<Habit[]>(
    token ? "/api/habits" : null,
    fetcher
  );

  async function createHabit(payload: {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
  }) {
    const res = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to create habit");
    mutate();
    return json.data;
  }

  async function deleteHabit(id: string) {
    const res = await fetch(`/api/habits/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete");
    mutate();
  }

  async function toggleLog(
    habitId: string
  ): Promise<{ logged: boolean }> {
    const res = await fetch(`/api/habits/${habitId}/log`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to log");
    mutate();
    return json.data;
  }

  async function updateHabit(id: string, payload: {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
  }) {
    const res = await fetch(`/api/habits/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to update habit");
    mutate();
    return json.data;
  }

  return {
    habits: data ?? EMPTY_HABITS,
    isLoading,
    error,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleLog,
    mutate,
  };
}
