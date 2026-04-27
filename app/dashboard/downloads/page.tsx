export default function DashboardDownloads() {
  return (
    <div className="p-6 md:p-10 flex flex-col h-full overflow-y-auto w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Downloads</h1>
        <p className="text-sm text-gray-500 mt-1">Access your generated short clips and assets.</p>
      </header>
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 p-8 flex items-center justify-center flex-col text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        </div>
        <h3 className="font-bold text-gray-800 mb-2">Nothing to download yet</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">Process a video first to get your clips here.</p>
      </div>
    </div>
  )
}
