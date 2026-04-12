export default function DemoExpiredPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm text-center shadow-sm">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Demo already used</h1>
        <p className="text-gray-500 text-sm mb-6">
          You've already tried your free demo. Sign up for free to upload unlimited PDFs and ask unlimited questions.
        </p>
        <a
          href="/register"
          className="block bg-blue-600 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors mb-3"
        >
          Create free account →
        </a>
        <a href="/" className="text-xs text-gray-400 hover:underline">
          Back to home
        </a>
      </div>
    </div>
  );
}