export const revalidate = false;

export default function About() {
  return (
    <main>
      <h1>About Page (Static Rendering)</h1>

      <p>
        This page is statically generated at build time.
        It does not fetch data on each request.
      </p>

      <p>
        Built at: {new Date().toLocaleString()}
      </p>
    </main>
  );
}
