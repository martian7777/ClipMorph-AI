export default function DashboardBrandKits() {
  return (
    <div className="p-6 md:p-10 flex flex-col h-full overflow-y-auto w-full">
      <header className="mb-8 flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Brand Kits</h1>
           <p className="text-sm text-gray-500 mt-1">Manage fonts, colors, and logos for your clips.</p>
        </div>
        <button className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-md hover:bg-gray-800 transition-colors">
          New Brand Kit
        </button>
      </header>
      
      <div className="bg-white rounded-3xl border border-gray-100 p-8">
         <h2 className="text-lg font-bold text-gray-800 mb-6">Default Kit (aliza's Space)</h2>
         <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
               <div><span className="text-sm font-semibold text-gray-700 block mb-2">Primary Color</span>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded bg-purple-600 shadow-sm border border-black/5"></div>
                 <span className="text-sm text-gray-500 font-mono">#9333ea</span>
               </div></div>
            </div>
            <div className="space-y-4">
               <div><span className="text-sm font-semibold text-gray-700 block mb-2">Font Family</span>
               <div className="px-4 py-2 border border-gray-200 rounded-lg text-gray-800 font-sans shadow-sm">Inter (Sans-serif)</div></div>
            </div>
            <div className="space-y-4">
               <div><span className="text-sm font-semibold text-gray-700 block mb-2">Watermark / Logo</span>
               <div className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div></div>
            </div>
         </div>
      </div>
    </div>
  )
}
