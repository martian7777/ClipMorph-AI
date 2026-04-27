export default function DashboardAnalytics() {
  return (
    <div className="p-6 md:p-10 flex flex-col h-full overflow-y-auto font-sans w-full">
       <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Insights powered by advanced machine learning models.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Total Views</h3>
            <div className="text-3xl font-extrabold text-gray-900">--</div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Avg Engagement</h3>
            <div className="text-3xl font-extrabold text-gray-900">--</div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Top Platform</h3>
            <div className="text-3xl font-extrabold text-gray-900">Not enough data</div>
         </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-500 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        </div>
        <h3 className="font-bold text-gray-800 mb-2">Awaiting Data Processing</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">Connect your social accounts and publish some clips so our AI can start tracking performance metrics.</p>
      </div>

    </div>
  )
}
