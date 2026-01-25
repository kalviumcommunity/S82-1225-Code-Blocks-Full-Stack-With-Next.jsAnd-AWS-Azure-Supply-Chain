export const revalidate = false;

export default function AboutPage() {
  console.log("SSG page generated at build time:", new Date().toISOString());

  return (
    <main>
      <h1>About Habit Tracker</h1>
      <p>This page is statically generated at build time.</p>
    </main>
  );
}
