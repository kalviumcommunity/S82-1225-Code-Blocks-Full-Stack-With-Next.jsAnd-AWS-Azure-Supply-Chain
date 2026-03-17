"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const FEATURES = [
  {
    icon: "🔥",
    title: "Build Streaks",
    desc: "Track consecutive days and watch your streaks grow with motivating visual feedback.",
  },
  {
    icon: "📊",
    title: "Visualize Progress",
    desc: "See your habit history at a glance — color-coded cards show your daily completion status.",
  },
  {
    icon: "🎯",
    title: "Stay Focused",
    desc: "Add up to unlimited habits with custom icons and colors to keep each habit unique.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    desc: "JWT-secured accounts mean your data is always private and belongs only to you.",
  },
];

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="gradient-hero" style={{ minHeight: "100vh" }}>
        <Navbar />

        {/* Hero */}
        <section className="section-pad">
          <div className="container" style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
            <div className="anim-fade-up">
              <span
                className="badge badge-brand"
                style={{ marginBottom: "1.5rem", display: "inline-flex" }}
              >
                ✦ New Year, New You — Start Today
              </span>
            </div>

            <h1
              className="anim-fade-up anim-delay-1"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "1.25rem" }}
            >
              Turn actions into{" "}
              <span className="gradient-text">habits</span>
              {" "}that last
            </h1>

            <p
              className="anim-fade-up anim-delay-2"
              style={{
                fontSize: "1.15rem",
                color: "var(--text-muted)",
                marginBottom: "2.5rem",
                lineHeight: 1.7,
              }}
            >
              HabitFlow helps you build daily routines with beautiful tracking,
              streak counters, and real motivation — all in one place.
            </p>

            <div
              className="anim-fade-up anim-delay-3"
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <Link href="/register">
                <button className="btn btn-primary btn-lg">
                  Start for Free ✦
                </button>
              </Link>
              <Link href="/login">
                <button className="btn btn-secondary btn-lg">Sign In</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="section-pad" style={{ paddingTop: "2rem" }}>
          <div className="container">
            <h2
              style={{
                textAlign: "center",
                fontSize: "1.8rem",
                marginBottom: "0.75rem",
              }}
            >
              Everything you need to{" "}
              <span className="gradient-text">stay consistent</span>
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                marginBottom: "3rem",
              }}
            >
              Simple, powerful, and designed to keep you motivated every single day.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {FEATURES.map((f, i) => (
                <div key={f.title} className={`card anim-fade-up anim-delay-${i + 1}`} style={{ padding: "1.75rem" }}>
                  <div
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                      width: "60px",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--brand-50)",
                      borderRadius: "14px",
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section-pad" style={{ paddingTop: "1rem" }}>
          <div className="container">
            <div
              style={{
                background: "linear-gradient(135deg, var(--brand-600), var(--accent-600))",
                borderRadius: "var(--radius-xl)",
                padding: "3rem 2rem",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <h2 style={{ fontSize: "2rem", marginBottom: "0.75rem", color: "#fff" }}>
                Ready to build better habits?
              </h2>
              <p style={{ opacity: 0.85, marginBottom: "2rem", fontSize: "1.05rem" }}>
                Join thousands of people who use HabitFlow to stay consistent.
              </p>
              <Link href="/register">
                <button
                  className="btn btn-lg"
                  style={{
                    background: "#fff",
                    color: "var(--brand-600)",
                    fontWeight: 800,
                  }}
                >
                  Create Free Account ✦
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "2rem 1.5rem",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.88rem",
          }}
        >
          <p>© 2026 HabitFlow. Built with Next.js &amp; ❤️</p>
        </footer>
      </div>
    </AuthProvider>
  );
}
