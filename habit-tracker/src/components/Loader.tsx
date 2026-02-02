export default function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-2 text-blue-600"
    >
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      <span>Processing...</span>
    </div>
  );
}
