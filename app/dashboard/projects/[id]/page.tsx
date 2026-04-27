'use client';

import { useProjects } from "@/contexts/ProjectContext";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Play, Download, Share2, PenTool, Scissors, Captions, ChevronRight, Wand2, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ProjectDetail() {
  const params = useParams();
  const projectIdStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const projectId = projectIdStr || '';
  
  const { projects, deleteProject, updateClip } = useProjects();
  const router = useRouter();
  const project = projects.find(p => p.id === projectId);
  
  const [activeTab, setActiveTab] = useState<'clips' | 'writer' | 'captions'>('clips');
  const [activeClipId, setActiveClipId] = useState<string | null>(null);
  const [isRenderingClip, setIsRenderingClip] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  
  // Edit State
  const [editingClipId, setEditingClipId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStart, setEditStart] = useState<number>(0);
  const [editEnd, setEditEnd] = useState<number>(0);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeClipId || !project) return;

    const currentClip = project.clips.find(c => c.id === activeClipId);
    if (!currentClip) return;

    const handleTimeUpdate = () => {
      // When we reach the end of the clip, pause the video.
      if (video.currentTime >= currentClip.endTime) {
        video.pause();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [activeClipId, project]);

  const handlePlayClip = (clipId: string) => {
    setActiveClipId(clipId);
    const clip = project?.clips.find(c => c.id === clipId);
    if (videoRef.current && clip) {
      videoRef.current.currentTime = clip.startTime;
      videoRef.current.play();
    }
  };

  const handleDownload = async (e: React.MouseEvent, clip: any) => {
    e.stopPropagation();
    if (!project?.videoUrl) {
      alert("Video file not available for exact download. We need the source file.");
      return;
    }

    setIsRenderingClip(true);
    setRenderProgress(0);

    try {
      // Setup a temporary detached video element to record from
      const tmpVideo = document.createElement('video');
      tmpVideo.src = project.videoUrl;
      tmpVideo.crossOrigin = 'anonymous';
      tmpVideo.muted = true;
      tmpVideo.playbackRate = 1.0; 
      
      await new Promise<void>((resolve) => {
        tmpVideo.onloadedmetadata = () => {
          tmpVideo.currentTime = clip.startTime;
          resolve();
        };
      });

      const targetHeight = tmpVideo.videoHeight || 1080;
      const targetWidth = Math.floor(targetHeight * (9 / 16));
      
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      const stream = (canvas as any).captureStream(30);
      const audioStream = (tmpVideo as any).captureStream ? (tmpVideo as any).captureStream() : (tmpVideo as any).mozCaptureStream ? (tmpVideo as any).mozCaptureStream() : null;
      if (audioStream) {
        const audioTracks = audioStream.getAudioTracks();
        if (audioTracks.length > 0) {
          stream.addTrack(audioTracks[0]);
        }
      }

      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      const chunks: BlobPart[] = [];
      
      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${clip.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(a.href);
      };
      
      let renderInterval: any;
      tmpVideo.onseeked = () => {
        recorder.start();
        tmpVideo.play();
        
        renderInterval = setInterval(() => {
           if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              // Center crop (cover) to 9:16
              const scale = Math.max(canvas.width / tmpVideo.videoWidth, canvas.height / tmpVideo.videoHeight);
              const x = (canvas.width / 2) - ((tmpVideo.videoWidth / 2) * scale);
              const y = (canvas.height / 2) - ((tmpVideo.videoHeight / 2) * scale);
              ctx.drawImage(tmpVideo, x, y, tmpVideo.videoWidth * scale, tmpVideo.videoHeight * scale);

              // Draw title hook
              ctx.font = 'bold 36px sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.lineJoin = 'round';
              
              const titleWords = clip.title.split(' ');
              const maxWidth = canvas.width - 60;
              let lineText = '';
              const lines = [];

              for (let i = 0; i < titleWords.length; i++) {
                const w = ctx.measureText(lineText + titleWords[i] + ' ').width;
                if (w > maxWidth && i > 0) {
                  lines.push(lineText.trim());
                  lineText = titleWords[i] + ' ';
                } else {
                  lineText += titleWords[i] + ' ';
                }
              }
              lines.push(lineText.trim());

              let yOffset = (canvas.height / 2) - ((lines.length - 1) * 24);
              for (const line of lines) {
                 ctx.lineWidth = 8;
                 ctx.strokeStyle = 'black';
                 ctx.strokeText(line, canvas.width / 2, yOffset);
                 
                 ctx.fillStyle = 'white';
                 ctx.fillText(line, canvas.width / 2, yOffset);
                 yOffset += 48;
              }
           }
        }, 1000 / 30);
        
        let dur = clip.endTime - clip.startTime;
        const monitor = setInterval(() => {
          const current = tmpVideo.currentTime;
          if (current >= clip.endTime) {
            clearInterval(monitor);
            clearInterval(renderInterval);
            tmpVideo.pause();
            recorder.stop();
            setIsRenderingClip(false);
          } else {
            setRenderProgress(Math.floor(((current - clip.startTime) / dur) * 100));
          }
        }, 100);
      };
    } catch (err) {
      console.error(err);
      setIsRenderingClip(false);
      alert("Could not process video locally in the browser.");
    }
  };

  const handleEditSave = () => {
    if (editingClipId) {
      updateClip(projectId, editingClipId, {
        title: editTitle,
        startTime: editStart,
        endTime: editEnd,
        duration: `0:${Math.floor(editEnd - editStart).toString().padStart(2, '0')}`
      });
      setEditingClipId(null);
    }
  };

  if (!project) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold mb-4">Project not found</h2>
        <Link href="/dashboard" className="text-purple-600 font-semibold flex items-center gap-2">
           <ArrowLeft className="w-4 h-4" /> Go back to dashboard
        </Link>
      </div>
    );
  }

  const isProcessing = project.status !== 'done';

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
             <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-gray-200"></div>
          <div>
             <h1 className="text-sm font-bold text-gray-900 truncate max-w-[150px] md:max-w-xs">{project.name}</h1>
             <p className="text-xs text-gray-400 capitalize">{project.status === 'done' ? 'Ready' : project.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleDelete} className="hidden md:flex px-4 py-2 border border-red-200 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 items-center gap-2 transition-colors">
             <Trash2 className="w-4 h-4" /> Delete
          </button>
          <button className="hidden md:flex px-4 py-2 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 items-center gap-2 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-700 shadow-sm transition-colors">
            Export All
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Video Preview */}
        <div className="w-full lg:w-5/12 bg-gray-900 flex flex-col justify-center relative border-b lg:border-b-0 lg:border-r border-gray-200 z-10 flex-shrink-0 h-[40vh] lg:h-auto">
          {project.videoUrl ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
              <video 
                ref={videoRef}
                src={project.videoUrl} 
                className="w-full h-full object-cover"
                style={{ aspectRatio: '9/16' }}
                controls
                crossOrigin="anonymous"
                onPlay={() => { if(!activeClipId && project.clips.length > 0) setActiveClipId(project.clips[0].id) }}
              />
              {activeClipId && (
                <div className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 shadow-lg pointer-events-none z-20">
                  <p className="text-white text-xs font-medium">
                     Viewing Clip: <span className="text-purple-400 font-bold">{project.clips.find(c => c.id === activeClipId)?.title}</span>
                  </p>
                </div>
              )}
              {activeClipId && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4 z-10 hidden lg:flex">
                   <div className="text-3xl font-extrabold text-white text-center leading-tight [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000]">
                      {project.clips.find(c => c.id === activeClipId)?.title}
                   </div>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <Play className="w-16 h-16 mb-4 opacity-20" />
              <p>Preview generated for YouTube Links</p>
            </div>
          )}
        </div>

        {/* Right Side: Work Panel */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden h-[60vh] lg:h-auto">
           {/* Navigation Tabs */}
           <div className="flex border-b border-gray-100 overflow-x-auto min-h-[48px] flex-shrink-0 hide-scrollbar">
             <Tab 
               active={activeTab === 'clips'} 
               onClick={() => setActiveTab('clips')} 
               icon={<Scissors className="w-4 h-4" />} 
               label="Viral Clips" 
               badge={isProcessing ? undefined : project.clips.length.toString()} 
             />
             <Tab 
               active={activeTab === 'writer'} 
               onClick={() => setActiveTab('writer')} 
               icon={<PenTool className="w-4 h-4" />} 
               label="AI Writer" 
             />
             <Tab 
               active={activeTab === 'captions'} 
               onClick={() => setActiveTab('captions')} 
               icon={<Captions className="w-4 h-4" />} 
               label="Captions" 
             />
           </div>

            {/* Tab Content Area */}
           <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
              {isRenderingClip && (
                 <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 text-center max-w-sm w-full mx-4">
                       <div className="w-16 h-16 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin mx-auto mb-6" />
                       <h3 className="text-xl font-bold text-gray-900 mb-2">Rendering Clip...</h3>
                       <p className="text-sm text-gray-500 mb-6">Trimming the video locally in your browser so you get just the short clip.</p>
                       <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                         <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100" style={{ width: `${renderProgress}%` }}></div>
                       </div>
                       <p className="text-xs font-bold text-purple-600">{renderProgress}% Complete</p>
                    </div>
                 </div>
              )}

               {editingClipId && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 flex items-center justify-center p-4">
                     <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 max-w-md w-full">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Clip Details</h3>
                        <div className="space-y-4">
                           <div>
                             <label className="block text-xs font-bold text-gray-700 mb-1">Clip Title / Hook</label>
                             <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-500" />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <label className="block text-xs font-bold text-gray-700 mb-1">Start Time (sec)</label>
                               <input type="number" value={editStart} onChange={e => setEditStart(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-500" />
                             </div>
                             <div>
                               <label className="block text-xs font-bold text-gray-700 mb-1">End Time (sec)</label>
                               <input type="number" value={editEnd} onChange={e => setEditEnd(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-500" />
                             </div>
                           </div>
                           <div className="flex gap-3 pt-2">
                              <button onClick={() => setEditingClipId(null)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                              <button onClick={handleEditSave} className="flex-1 px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors">Save Changes</button>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

              {isProcessing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-20 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center max-w-sm w-full mx-4">
                     <div className="w-16 h-16 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin mx-auto mb-6" />
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Video</h3>
                     <p className="text-sm text-gray-500 mb-6">Our AI is watching your content, finding viral hooks, and generating transcription.</p>
                     
                     <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                       <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" style={{ width: `${project.progress}%` }}></div>
                     </div>
                     <p className="text-xs font-bold text-purple-600">{project.progress}% {project.status === 'uploading' ? 'Uploaded' : 'Processed'}</p>
                  </div>
                </div>
              )}

              {activeTab === 'clips' && !isProcessing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.clips.map((clip, idx) => (
                    <div 
                       key={clip.id} 
                       onClick={() => handlePlayClip(clip.id)}
                       className={`group border ${activeClipId === clip.id ? 'border-purple-500 shadow-md ring-2 ring-purple-500/20' : 'border-gray-100'} rounded-2xl overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all bg-white cursor-pointer flex flex-col`}
                    >
                      <div className="aspect-[9/16] bg-gray-900 relative flex items-center justify-center overflow-hidden">
                        <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                           <div className="w-2 h-2 rounded-full bg-green-500"></div>
                           <span className="text-[10px] font-bold text-gray-800">Score {clip.score}</span>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-0.5 rounded text-[10px] font-medium text-white backdrop-blur-sm">
                           {clip.duration}
                        </div>
                        <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${activeClipId === clip.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                             <Play className="w-5 h-5 ml-1" fill="currentColor" />
                           </div>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">{clip.title}</h4>
                        <div className="mt-auto pt-4 flex items-center justify-between">
                           <button
                               onClick={(e) => { 
                                 e.stopPropagation(); 
                                 setEditingClipId(clip.id); 
                                 setEditTitle(clip.title); 
                                 setEditStart(clip.startTime); 
                                 setEditEnd(clip.endTime); 
                               }} 
                               className="text-xs font-bold text-purple-600 flex items-center gap-1 hover:text-purple-700 transition-colors"
                             >
                                Edit Clip <ChevronRight className="w-3 h-3" />
                             </button>
                           <button onClick={(e) => handleDownload(e, clip)} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                              <Download className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'writer' && !isProcessing && project.aiNotes && (
                <div className="max-w-2xl">
                  <div className="bg-purple-50 text-purple-800 p-4 rounded-2xl mb-6 flex items-start gap-3 border border-purple-100">
                    <Wand2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">AI Generated Show Notes</p>
                      <p className="text-xs text-purple-600/80 mt-1">Based on the transcript of your video.</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm font-sans text-gray-700">
                    <h2 className="text-xl font-bold text-gray-900">{project.aiNotes.title}</h2>
                    <p>{project.aiNotes.summary}</p>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mt-6">Key Takeaways</h3>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                       {project.aiNotes.takeaways.map((takeaway, i) => (
                           <li key={i}>{takeaway}</li>
                       ))}
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 mt-6">Timestamps</h3>
                    <ul className="space-y-1 mt-2 font-mono text-xs">
                       {project.aiNotes.timestamps.map((ts, i) => (
                          <li key={i}><span className="font-bold text-purple-600 mr-2">{ts.time}</span> {ts.label}</li>
                       ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'captions' && !isProcessing && (
                 <div className="flex flex-col items-center justify-center h-full text-center py-10">
                   <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mb-4">
                     <Captions className="w-8 h-8" />
                   </div>
                   <h3 className="font-bold text-gray-900 mb-2">Edit Captions</h3>
                   <p className="text-sm text-gray-500 max-w-xs mb-6">Stylize your text, fix typos, and apply dynamic motion templates to your clips.</p>
                   <button className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl shadow-md hover:bg-gray-800 transition-colors">
                     Open Editor
                   </button>
                 </div>
              )}
           </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-200 max-w-sm w-full animate-in fade-in zoom-in duration-200">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4 mx-auto">
                 <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Delete Project?</h3>
              <p className="text-sm text-gray-500 mb-6 text-center">This action cannot be undone. All your generated clips, captions, and AI notes will be permanently removed.</p>
              <div className="flex gap-3">
                 <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                 <button onClick={() => { deleteProject(projectId); router.push('/dashboard/projects'); }} className="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors">Yes, Delete</button>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}

function Tab({ active, onClick, icon, label, badge }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, badge?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 flex items-center gap-2 border-b-2 font-semibold text-sm transition-colors whitespace-nowrap ${active ? 'border-purple-600 text-purple-600 bg-purple-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
    >
      {icon}
      {label}
      {badge && (
        <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-md leading-none ml-1">
          {badge}
        </span>
      )}
    </button>
  );
}
