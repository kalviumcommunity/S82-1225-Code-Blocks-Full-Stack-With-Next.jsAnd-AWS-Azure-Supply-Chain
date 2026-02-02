"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main
      style={{
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "red", marginBottom: "8px" }}>
        Something went wrong
      </h2>

      <p style={{ marginBottom: "16px" }}>
        {error.message}
      </p>

      <button
        onClick={reset}
        style={{
          padding: "8px 16px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </main>
  );
}
