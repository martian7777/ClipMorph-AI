export default function DashboardDrafts() {
  return (
    <div className="p-6 md:p-10 flex flex-col h-full overflow-y-auto w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Drafts</h1>
        <p className="text-sm text-gray-500 mt-1">Pick up where you left off.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2].map((id) => (
           <div key={id} className="bg-white rounded-2xl border border-gray-200 p-4 font-sans hover:shadow-md transition-shadow">
               <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">Unpublished</span>
                  <button className="text-gray-400 hover:text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
               </div>
               <h3 className="font-bold text-gray-800 mb-1">Q2 Marketing Update (Clip {id})</h3>
               <p className="text-xs text-gray-500 mb-4">Last edited 2 days ago</p>
               <button className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">Continue Editing</button>
           </div>
        ))}
      </div>
    </div>
  )
}
