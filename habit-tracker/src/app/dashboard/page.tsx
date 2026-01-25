export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  console.log("SSR page rendered at:", new Date().toISOString());

  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1",
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <main>
      <h1>Dashboard (SSR)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
