'use client';
import { useProjects } from '@/contexts/ProjectContext';
import Link from 'next/link';
import { MoreVertical, Play, Plus } from 'lucide-react';

export default function DashboardProjects() {
  const { projects, setActiveUploadModal } = useProjects();

  return (
    <div className="p-6 md:p-10 flex flex-col h-full overflow-y-auto w-full">
      <header className="mb-8 flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">All Projects</h1>
           <p className="text-sm text-gray-500 mt-1">Manage and organize your video projects.</p>
        </div>
        <button onClick={() => setActiveUploadModal(true)} className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full font-bold text-sm shadow-md hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </header>
      
      {projects.length === 0 ? (
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 p-8 flex items-center justify-center flex-col text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-4 transform -rotate-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">No projects yet</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm">You haven't created any projects yet. Upload a video or paste a link to get started.</p>
          <button onClick={() => setActiveUploadModal(true)} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-sm shadow-md hover:opacity-90 transition-opacity">
            Start First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {projects.map((project) => (
             <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  const isDone = project.status === 'done';
  
  return (
    <Link href={`/dashboard/projects/${project.id}`} className="group cursor-pointer block bg-white border border-gray-100 rounded-3xl p-3 shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
      <div className="aspect-[4/3] bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
        {!isDone ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <div className="w-8 h-8 rounded-full border-[3px] border-purple-200 border-t-purple-600 animate-spin mb-2" />
            <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">{project.progress}%</span>
          </div>
        ) : project.videoUrl ? (
          <video src={project.videoUrl} preload="metadata" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Thumbnail" />
        )}
        
        {isDone && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-purple-600 shadow-sm scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-start px-1">
        <div className="overflow-hidden pr-2">
          <p className="text-sm font-bold text-gray-800 truncate">
             {project.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${isDone ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <p className="text-[11px] font-medium text-gray-400 capitalize">
              {project.status === 'done' ? new Date(project.createdAt).toLocaleDateString() : project.status}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-800 transition-colors flex-shrink-0 p-1 rounded-lg hover:bg-gray-100" onClick={(e) => e.preventDefault()}>
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </Link>
  )
}
