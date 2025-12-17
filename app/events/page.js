export const revalidate = 60; // Re-generate every 60 seconds

export default async function Events() {
  console.log("Events page regenerated at:", new Date().toISOString());

  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=3'
  );
  const events = await res.json();

  return (
    <main>
      <h1>Events Page (ISR)</h1>

      <p>
        <strong>Last regenerated at:</strong>{" "}
        {new Date().toLocaleTimeString()}
      </p>

      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </main>
  );
}
