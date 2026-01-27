export const revalidate = 60;

export default async function EventsPage() {
  console.log("ISR page generated at:", new Date().toISOString());

  let posts = [];
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      posts = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <main>
      <h1>Events (ISR)</h1>
      <p>Revalidates every 60 seconds.</p>
      {posts.length > 0 ? (
        <pre>{JSON.stringify(posts.slice(0, 3), null, 2)}</pre>
      ) : (
        <p>No events available</p>
      )}
    </main>
  );
}
