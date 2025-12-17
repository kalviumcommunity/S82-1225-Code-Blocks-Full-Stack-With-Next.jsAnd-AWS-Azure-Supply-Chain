export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  console.log("Dashboard data fetched at:", new Date().toISOString());

  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts/1',
    { cache: 'no-store' }
  );
  const data = await res.json();

  return (
    <main>
      <h1>Dashboard (SSR)</h1>

      <p>
        <strong>Fetched at:</strong> {new Date().toLocaleTimeString()}
      </p>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
