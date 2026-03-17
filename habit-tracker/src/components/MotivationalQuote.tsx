"use client";

import { useEffect, useState } from "react";

const QUOTES = [
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Small acts, when multiplied by millions of people, can transform the world.", author: "Howard Zinn" },
  { text: "Your net worth to the world is usually determined by what remains after your bad habits are subtracted from your good ones.", author: "Benjamin Franklin" },
  { text: "Continuous improvement is better than delayed perfection.", author: "Mark Twain" },
];

export default function MotivationalQuote() {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(random);
  }, []);

  return (
    <div 
      style={{ 
        padding: "1.5rem", 
        background: "var(--surface)", 
        borderRadius: "var(--radius-lg)", 
        border: "1px solid var(--border)",
        marginBottom: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div 
        style={{ 
          position: "absolute", 
          top: "-10px", 
          right: "10px", 
          fontSize: "4rem", 
          opacity: 0.05, 
          fontFamily: "serif",
          pointerEvents: "none" 
        }}
      >
        "
      </div>
      <p style={{ fontSize: "1.1rem", fontWeight: 500, fontStyle: "italic", color: "var(--text)", lineHeight: 1.5, zIndex: 1 }}>
        "{quote.text}"
      </p>
      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--brand-500)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        — {quote.author}
      </p>
    </div>
  );
}
