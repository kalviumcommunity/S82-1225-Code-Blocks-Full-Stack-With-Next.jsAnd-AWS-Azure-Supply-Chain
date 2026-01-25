export const revalidate = 60;

export default async function EventsPage() {
  console.log("ISR page generated at:", new Date().toISOString());

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <main>
      <h1>Events (ISR)</h1>
      <p>Revalidates every 60 seconds.</p>
      <pre>{JSON.stringify(posts.slice(0, 3), null, 2)}</pre>
    </main>
  );
}
