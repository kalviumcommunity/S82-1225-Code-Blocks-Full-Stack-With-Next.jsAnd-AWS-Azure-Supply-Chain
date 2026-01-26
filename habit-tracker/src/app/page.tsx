export default function HomePage() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Habit Tracker";
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "API not configured";

  return (
    <main>
      <h1>{appName}</h1>
      <p>Environment: Local Development</p>
      <p>API Base URL: {apiBaseUrl}</p>
      <p>Team Workflow enabled</p>
    </main>
  );
}
