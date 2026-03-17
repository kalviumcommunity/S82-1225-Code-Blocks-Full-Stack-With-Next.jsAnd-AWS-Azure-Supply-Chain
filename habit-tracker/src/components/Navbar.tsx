"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const router = useRouter();

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="navbar-logo">
          <span className="gradient-text">HabitFlow</span>
          <span style={{ marginLeft: "0.25rem" }}>✦</span>
        </Link>

        {/* Nav links */}
        <div className="navbar-links">
          <button
            className="btn btn-ghost btn-sm"
            onClick={toggleTheme}
            style={{ fontSize: "1.2rem", padding: "0.25rem 0.5rem" }}
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {dark ? "☀️" : "🌙"}
          </button>
          {user ? (
            <>
              <Link href="/dashboard">
                <button className="btn btn-ghost btn-sm">Dashboard</button>
              </Link>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="btn btn-ghost btn-sm">Sign In</button>
              </Link>
              <Link href="/register">
                <button className="btn btn-primary btn-sm">Get Started</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
