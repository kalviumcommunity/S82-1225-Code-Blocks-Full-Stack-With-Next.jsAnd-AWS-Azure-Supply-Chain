import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "HabitFlow — Build habits that stick",
  description:
    "Track your daily habits, build streaks, and unlock your best self with HabitFlow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "'Inter', system-ui, sans-serif",
              borderRadius: "10px",
              background: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            },
          }}
        />
      </body>
    </html>
  );
}
