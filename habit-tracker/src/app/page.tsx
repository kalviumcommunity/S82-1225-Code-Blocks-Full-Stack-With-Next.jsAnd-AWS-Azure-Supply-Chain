export default function HomePage() {
  const env = process.env.NEXT_PUBLIC_APP_ENV;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <main>
      <h1>Habit Tracker</h1>
      <p>Current Environment: {env}</p>
      <p>API URL: {apiUrl}</p>
    </main>
  );
}
