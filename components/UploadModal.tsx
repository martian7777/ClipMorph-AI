'use client';
import { useState, useRef } from 'react';
import { X, UploadCloud, Link as LinkIcon } from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import { useRouter } from 'next/navigation';

export default function UploadModal() {
  const { activeUploadModal, setActiveUploadModal, startProject } = useProjects();
  const [tab, setTab] = useState<'file' | 'link'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [projectName, setProjectName] = useState('');
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!activeUploadModal) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      if (!projectName) setProjectName(e.dataTransfer.files[0].name.split('.')[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      if (!projectName) setProjectName(e.target.files[0].name.split('.')[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'file' && !file) return;
    if (tab === 'link' && !link) return;
    
    const finalName = projectName || (tab === 'link' ? 'Imported from Link' : 'New Project');
    const projectId = startProject(finalName, tab === 'file' ? file : null, tab === 'link' ? link : undefined);
    
    setActiveUploadModal(false);
    // Reset state
    setFile(null);
    setLink('');
    setProjectName('');
    
    router.push(`/dashboard/projects/${projectId}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">New Project</h2>
          <button onClick={() => setActiveUploadModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex gap-4 mb-6">
            <button 
              type="button" 
              onClick={() => setTab('file')}
              className={`flex-1 py-2 font-semibold text-sm rounded-xl transition-colors ${tab === 'file' ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
            >
              Upload File
            </button>
            <button 
              type="button" 
              onClick={() => setTab('link')}
              className={`flex-1 py-2 font-semibold text-sm rounded-xl transition-colors ${tab === 'link' ? 'bg-pink-100 text-pink-700' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
            >
              Paste Link
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name</label>
              <input 
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                type="text" 
                placeholder="My Awesome Video" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-sans"
              />
            </div>

            {tab === 'file' ? (
              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${file ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="video/mp4,video/x-m4v,video/*,audio/*" />
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                   <UploadCloud className={`w-6 h-6 ${file ? 'text-purple-600' : 'text-gray-400'}`} />
                </div>
                {file ? (
                  <div>
                    <p className="font-bold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-gray-700">Click or drag file to this area to upload</p>
                    <p className="text-sm text-gray-500 mt-1">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Video Link</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <LinkIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    type="url" 
                    placeholder="https://youtube.com/watch?v=..." 
                    className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-sans"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-end pt-4">
               <button 
                 type="submit" 
                 disabled={(tab === 'file' && !file) || (tab === 'link' && !link)}
                 className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Start Processing
               </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
