"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function UsersPage() {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  if (isLoading) {
    return <p className="p-6">Loading users...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">Failed to load users</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <ul className="space-y-2">
        {data.map((user: any) => (
          <li
            key={user.id}
            className="p-2 border rounded flex justify-between"
          >
            <span>{user.email}</span>
            <span className="text-sm text-gray-500">{user.role}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
