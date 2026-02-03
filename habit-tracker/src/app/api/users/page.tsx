"use client";

import { useEffect, useState } from "react";

type Role = "ADMIN" | "EDITOR" | "USER";

export default function UsersPage() {
  const [role, setRole] = useState<Role>("USER");

  // Simulated role (normally from auth context)
  useEffect(() => {
    setRole("ADMIN");
  }, []);

  return (
    <main>
      <h1>Users</h1>

      <button>View</button>

      {(role === "ADMIN" || role === "EDITOR") && (
        <button>Edit</button>
      )}

      {role === "ADMIN" && (
        <button style={{ color: "red" }}>Delete</button>
      )}
    </main>
  );
}
