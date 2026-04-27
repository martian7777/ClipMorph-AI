export default function DashboardPlanner() {
  return (
    <div className="p-6 md:p-10 flex flex-col h-full overflow-y-auto font-sans w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Content Planner</h1>
        <p className="text-sm text-gray-500 mt-1">Schedule your viral shorts for the optimal times.</p>
      </header>
      
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex-1">
         <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800">This Week</h2>
            <div className="flex gap-2">
               <button className="px-3 py-1 bg-gray-100/50 text-gray-500 rounded-lg text-sm font-medium hover:bg-gray-100">&larr;</button>
               <button className="px-3 py-1 bg-gray-100/50 text-gray-500 rounded-lg text-sm font-medium hover:bg-gray-100">Today</button>
               <button className="px-3 py-1 bg-gray-100/50 text-gray-500 rounded-lg text-sm font-medium hover:bg-gray-100">&rarr;</button>
            </div>
         </div>
         <div className="h-64 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-3">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-semibold text-gray-700">Your calendar is empty</h3>
            <p className="text-sm text-gray-500 mt-1">Drop a clip here to schedule it.</p>
         </div>
      </div>
    </div>
  )
}
