'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ProjectStatus = 'uploading' | 'processing' | 'done' | 'failed';

export interface Clip {
  id: string;
  title: string;
  duration: string;
  score: number;
  thumbnail: string;
  startTime: number;
  endTime: number;
  videoUrl?: string;
  transcript?: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  createdAt: number;
  videoUrl?: string;
  clips: Clip[];
  aiNotes?: { title: string; summary: string; takeaways: string[]; timestamps: { time: string; label: string }[] };
}

interface ProjectContextType {
  projects: Project[];
  startProject: (name: string, file?: File | null, link?: string) => string;
  deleteProject: (id: string) => void;
  updateClip: (projectId: string, clipId: string, updates: Partial<Clip>) => void;
  activeUploadModal: boolean;
  setActiveUploadModal: (open: boolean) => void;
}

export const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([
    {
       id: 'demo-1',
       name: 'Podcast Episode 42: AI Future',
       status: 'done',
       progress: 100,
       createdAt: Date.now() - 86400000,
       clips: [
         { id: 'c1', title: 'Why AI is moving so fast', duration: '0:45', score: 98, thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80', startTime: 0, endTime: 45 },
         { id: 'c2', title: 'Will AI replace developers?', duration: '1:12', score: 85, thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80', startTime: 60, endTime: 132 },
         { id: 'c3', title: 'How to adapt for tomorrow', duration: '0:38', score: 92, thumbnail: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=400&q=80', startTime: 150, endTime: 188 }
       ],
       aiNotes: {
         title: "10 Things AI Will Change in the Next Decade",
         summary: "In this episode, we unpack the massive shifts that artificial intelligence will cause across creative industries. If you think the current wave of generative tools is crazy, wait until you hear about autonomous agents.",
         takeaways: [
           "The Death of the Blank Page: Why no one will start from scratch anymore.",
           "Hyper-personalization: Content that adapts real-time to the viewer's mood.",
           "Skill Shifts: Moving from 'creators' to 'curators' and 'editors'."
         ],
         timestamps: [
           { time: "00:00", label: "Intro" },
           { time: "01:45", label: "The Blank Page Problem" },
           { time: "06:20", label: "AI as a Co-pilot" },
           { time: "14:10", label: "Q&A from Audience" }
         ]
       }
    }
  ]);
  
  const [activeUploadModal, setActiveUploadModal] = useState(false);

  const startProject = (name: string, file?: File | null, link?: string) => {
    const newId = Math.random().toString(36).substring(7);
    const videoUrl = file ? URL.createObjectURL(file) : undefined;
    
    const newProject: Project = {
      id: newId,
      name,
      status: 'uploading',
      progress: 0,
      createdAt: Date.now(),
      videoUrl,
      clips: []
    };
    
    setProjects(prev => [newProject, ...prev]);
    
    if (file) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        processProject(newId, video.duration, videoUrl);
      };
      video.src = window.URL.createObjectURL(file);
    } else {
      // Simulate random long duration for YouTube links (e.g. 15 minutes)
      processProject(newId, 900, videoUrl);
    }
    
    return newId;
  };
  
  const processProject = (id: string, durationInSeconds: number, videoUrl?: string) => {
    // Stage 1: Uploading
    let uploadProgress = 0;
    const uploadInterval = setInterval(() => {
      uploadProgress += Math.floor(Math.random() * 15) + 5;
      if (uploadProgress >= 100) {
        uploadProgress = 100;
        clearInterval(uploadInterval);
        setProjects(prev => prev.map(p => p.id === id ? { ...p, status: 'processing', progress: 0 } : p));
        startProcessing(id, durationInSeconds, videoUrl);
      } else {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, progress: uploadProgress } : p));
      }
    }, 400);
  };
  
  const startProcessing = (id: string, durationInSeconds: number, videoUrl?: string) => {
     let procProgress = 0;
     const processInterval = setInterval(async () => {
       procProgress += Math.floor(Math.random() * 10) + 2;
       
       setProjects(prev => prev.map(p => p.id === id ? { ...p, progress: Math.min(99, procProgress) } : p));

       if (procProgress >= 100) {
         clearInterval(processInterval);
         
         // Generate shorts under 1 minute based on total video duration
         // roughly 1 clip every 1-2 minutes, max 15 clips, min 3 clips
         const calculatedNumClips = Math.floor(durationInSeconds / 90);
         const numClips = Math.max(3, Math.min(15, calculatedNumClips));

         const clipsData: Clip[] = [];
         for (let i = 0; i < numClips; i++) {
            const durSecs = Math.floor(Math.random() * 45) + 15; // 15 to 59 seconds
            const prefixes = ['The Truth About', 'Why You Need', 'Stop Doing', 'The Secret To', 'How I Built', 'Nobody Knows'];
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            
            const startTime = Math.floor(Math.random() * Math.max(0, durationInSeconds - durSecs));
            const endTime = startTime + durSecs;

            let thumbnail = 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=400&q=80';
            
            if (videoUrl) {
               try {
                  thumbnail = await new Promise((resolve) => {
                    const video = document.createElement('video');
                    video.src = videoUrl;
                    video.crossOrigin = 'anonymous';
                    video.currentTime = startTime + (durSecs / 2); // capture middle of clip
                    video.addEventListener('seeked', () => {
                      try {
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth || 640;
                        canvas.height = video.videoHeight || 360;
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                          resolve(canvas.toDataURL('image/jpeg', 0.6));
                        } else resolve(thumbnail);
                      } catch(e) { resolve(thumbnail); }
                    }, { once: true });
                    video.addEventListener('error', () => resolve(thumbnail), { once: true });
                  });
               } catch (e) {
                 console.error(e);
               }
            }

            clipsData.push({
              id: `clip_${Math.random()}`,
              title: `${prefix} ${Math.floor(Math.random() * 100)}...`,
              duration: `0:${durSecs.toString().padStart(2, '0')}`,
              score: Math.floor(Math.random() * 15) + 85,
              thumbnail,
              startTime,
              endTime
            });
         }

         setProjects(prev => prev.map(p => {
           if (p.id !== id) return p;

           // Sort clips by score
           clipsData.sort((a, b) => b.score - a.score);

           const aiNotes = {
             title: `Analyzed insights from: ${p.name}`,
             summary: `In this video, we extract the core messages and highlight the key moments. The content revolves around essential strategies and reveals unexpected truths that keep the audience engaged.`,
             takeaways: [
                `Always focus on the initial hook to capture attention within the first 3 seconds.`,
                `Consistent pacing is crucial for maintaining viewer retention.`,
                `High emotion points correlate with the most viral clip potential.`
             ],
             timestamps: clipsData.slice(0, 4).map(c => ({
                time: `${Math.floor(c.startTime/60).toString().padStart(2, '0')}:${(Math.floor(c.startTime)%60).toString().padStart(2, '0')}`,
                label: c.title
             }))
           };

           return { 
             ...p, 
             status: 'done',
             progress: 100,
             clips: clipsData,
             aiNotes
           };
         }));
       }
     }, 600);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateClip = (projectId: string, clipId: string, updates: Partial<Clip>) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        clips: p.clips.map(c => c.id === clipId ? { ...c, ...updates } : c)
      };
    }));
  };

  return (
    <ProjectContext.Provider value={{ projects, startProject, deleteProject, updateClip, activeUploadModal, setActiveUploadModal }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be inside ProjectProvider");
  return ctx;
}
