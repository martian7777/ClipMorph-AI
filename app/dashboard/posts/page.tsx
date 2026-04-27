export default function DashboardPosts() {
  return (
    <div className="p-6 md:p-10 flex flex-col h-full overflow-y-auto w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <p className="text-sm text-gray-500 mt-1">Manage scheduled and published social posts.</p>
      </header>
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 p-8 flex items-center justify-center flex-col text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </div>
        <h3 className="font-bold text-gray-800 mb-2">No posts yet</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">Connect your social accounts to start sharing clips directly from ClipMorph.</p>
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm shadow-md hover:bg-blue-700 transition-colors">
          Connect Accounts
        </button>
      </div>
    </div>
  )
}
