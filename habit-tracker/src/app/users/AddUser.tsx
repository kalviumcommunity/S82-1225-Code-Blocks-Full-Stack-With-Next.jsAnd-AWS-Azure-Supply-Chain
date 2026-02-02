"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";

export default function AddUser() {
  const { data } = useSWR("/api/users", fetcher);
  const [email, setEmail] = useState("");

  const addUser = async () => {
    if (!email) return;

    // 🔹 Optimistic Update
    mutate(
      "/api/users",
      [
        ...data,
        {
          id: Date.now(),
          email,
          role: "USER",
        },
      ],
      false
    );

    // 🔹 Actual API Call
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "password123" }),
    });

    // 🔹 Revalidate
    mutate("/api/users");
    setEmail("");
  };

  return (
    <div className="mt-6">
      <input
        className="border px-2 py-1 mr-2"
        placeholder="User email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={addUser}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Add User
      </button>
    </div>
  );
}
