'use client';
import {
  Upload,
  Link as LinkIcon,
  Cloud,
  Wand2,
  Plus,
  Scissors,
  Captions,
  PenTool,
  MoreVertical,
  Play
} from "lucide-react";
import Link from "next/link";
import React from 'react';
import { useProjects, Project } from '@/contexts/ProjectContext';

export default function DashboardHome() {
  const { projects, setActiveUploadModal } = useProjects();

  return (
    <>
      <header className="h-20 flex items-center justify-between px-6 md:px-10 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800">Overview</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={() => setActiveUploadModal(true)} className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-sm shadow-md hover:shadow-purple-200 transition-all">
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">New Project</span>
            <span className="md:hidden">New</span>
          </button>
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Aliza+S&background=random" alt="Avatar" />
          </div>
        </div>
      </header>

      <div className="p-6 md:p-10 flex-1 space-y-8 overflow-y-auto w-full">
        {/* Hero Feature */}
        <div className="relative overflow-hidden rounded-3xl bg-indigo-900 md:h-44 flex flex-col md:flex-row items-center p-8 md:px-10 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-pink-500/20 to-transparent"></div>
          <div className="relative z-10 space-y-3 w-full text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Get clips in 1 click</h2>
            <p className="text-indigo-200 min-w-0 md:max-w-sm text-xs md:text-sm leading-relaxed mx-auto md:mx-0">Paste a YouTube link or upload your video and let our AI transform your long content into viral shorts.</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start">
              <button onClick={() => setActiveUploadModal(true)} className="bg-white text-indigo-900 px-6 py-2 rounded-full font-bold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                <Wand2 className="w-4 h-4" />
                Get Started
              </button>
              <button className="bg-indigo-800/40 text-indigo-100 border border-indigo-700/50 px-6 py-2 rounded-full font-bold text-sm backdrop-blur-sm hover:bg-indigo-800/60 transition-colors">Watch Demo</button>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl hidden md:block"></div>
        </div>

        {/* Core Features Overview */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">AI Superpowers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             <FeatureCard 
                title="Long to Shorts"
                desc="Extract the most engaging moments automatically."
                icon={<Scissors className="w-6 h-6" />}
                colorClass="bg-purple-100 text-purple-600"
                linkText="Create now &rarr;"
                linkClass="text-purple-600"
                onClick={() => setActiveUploadModal(true)}
             />
             <FeatureCard 
                title="AI Captions"
                desc="Subtitle your videos in over 99 languages."
                icon={<Captions className="w-6 h-6" />}
                colorClass="bg-pink-100 text-pink-600"
                linkText="Add captions &rarr;"
                linkClass="text-pink-600"
                onClick={() => setActiveUploadModal(true)}
             />
             <FeatureCard 
                title="AI Writer"
                desc="Generate SEO show notes and blog posts instantly."
                icon={<PenTool className="w-6 h-6" />}
                colorClass="bg-blue-100 text-blue-600"
                linkText="Draft post &rarr;"
                linkClass="text-blue-600"
                onClick={() => setActiveUploadModal(true)}
             />
          </div>
        </div>

        {/* Upload / Input Actions Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ActionCard 
              icon={<Upload className="w-6 h-6 text-purple-600" />}
              title="Upload File"
              desc="Drag & drop, or browse your files"
              onClick={() => setActiveUploadModal(true)}
            />
            <ActionCard 
              icon={<LinkIcon className="w-6 h-6 text-pink-600" />}
              title="Paste Link"
              desc="Import from YouTube or TikTok"
              onClick={() => setActiveUploadModal(true)}
            />
            <ActionCard 
              icon={<Cloud className="w-6 h-6 text-blue-600" />}
              title="Cloud Storage"
              desc="Connect Drive or Dropbox"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Projects</h3>
            <Link href="/dashboard/projects" className="text-sm text-gray-400 hover:text-gray-600 font-medium">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.slice(0, 7).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            <div onClick={() => setActiveUploadModal(true)} className="group cursor-pointer flex flex-col">
              <div className="aspect-video bg-gray-200 rounded-2xl mb-3 overflow-hidden relative border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Plus className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-sm font-bold truncate text-gray-400">Start new project</p>
              <p className="text-xs text-gray-300">&nbsp;</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

function ActionCard({ icon, title, desc, onClick }: { icon: React.ReactNode, title: string, desc: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 bg-white border border-gray-100 rounded-3xl hover:border-purple-200 hover:shadow-md transition-shadow sm:text-left group text-center">
      <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600 group-hover:scale-105 transition-transform group-hover:text-purple-600 group-hover:bg-purple-50">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </button>
  )
}

function FeatureCard({ title, desc, icon, colorClass, linkText, linkClass, onClick }: { title: string, desc: string, icon: React.ReactNode, colorClass: string, linkText: string, linkClass: string, onClick?: () => void }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${colorClass}`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-1 text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{desc}</p>
      <button onClick={onClick} className={`font-bold text-sm flex items-center gap-1 ${linkClass}`}>{linkText}</button>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const isDone = project.status === 'done';
  const isFailed = project.status === 'failed';
  
  return (
    <Link href={`/dashboard/projects/${project.id}`} className="group cursor-pointer block">
      <div className="aspect-video bg-gray-200 rounded-2xl mb-3 overflow-hidden relative">
        {!isDone ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <div className="w-10 h-10 rounded-full border-[3px] border-purple-200 border-t-purple-600 animate-spin mb-3" />
            <span className="text-xs font-bold text-purple-600">{project.progress}%</span>
          </div>
        ) : (
          <img src={project.videoUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Thumbnail" />
        )}
        
        {isDone && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-purple-600 shadow-sm">
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}

        {isDone && (
           <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
             {project.clips.length} Clips
           </div>
        )}
      </div>
      
      <div className="flex justify-between items-start">
        <div className="overflow-hidden pr-2">
          <p className="text-sm font-bold text-gray-800 truncate">
             {project.name}
          </p>
          <p className="text-xs text-gray-400 capitalize">
            {project.status === 'done' ? new Date(project.createdAt).toLocaleDateString() : project.status}
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-0.5" onClick={(e) => e.preventDefault()}>
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </Link>
  )
}
