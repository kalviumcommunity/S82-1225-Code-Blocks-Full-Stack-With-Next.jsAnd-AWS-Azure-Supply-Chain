export default function EnvCheck() {
  return (
    <main>
      <h1>Environment Check</h1>

      <p>
        <strong>Environment:</strong> {process.env.ENV_NAME}
      </p>

      <p>
        <strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL}
      </p>
    </main>
  );
}
