"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "var(--brand-color)",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
