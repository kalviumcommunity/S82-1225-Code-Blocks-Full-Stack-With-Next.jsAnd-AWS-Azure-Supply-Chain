export default function HomePage() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Habit Tracker";
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "API not configured";

  return (
    <main
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "1.5rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
        }}
      >
        {appName}
      </h1>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          lineHeight: 1.6,
        }}
      >
        <p>
          <strong>Environment:</strong> Local Development
        </p>

        <p>
          <strong>API Base URL:</strong> {apiBaseUrl}
        </p>

        <p>
          <strong>Status:</strong> Team workflow enabled
        </p>
      </section>
    </main>
  );
}
