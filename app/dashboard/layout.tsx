'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  FolderOpen,
  Download,
  FileEdit,
  Palette,
  LayoutDashboard,
  CalendarDays,
  LineChart,
  Video,
  Zap,
  Menu,
  X
} from "lucide-react";
import { ProjectProvider } from "@/contexts/ProjectContext";
import UploadModal from "@/components/UploadModal";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ProjectProvider>
      <div className="flex w-full h-screen bg-slate-50 font-sans overflow-hidden text-gray-800">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 fixed top-0 w-full z-50">
          <Link href="/dashboard" className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
             </div>
             <span className="text-white font-bold text-sm">valiza's Space</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 p-2">
             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Left Sidebar */}
        <aside className={`w-64 bg-slate-900 text-gray-300 flex flex-col justify-between border-r border-slate-800 flex-shrink-0 absolute md:relative z-40 transform transition-transform duration-300 h-full ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} pt-16 md:pt-0`}>
          <div className="py-6 max-h-full overflow-y-auto w-full">
            {/* Branding - Desktop only */}
            <Link href="/" className="hidden md:flex items-center gap-3 px-6 mb-10 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm leading-tight">valiza's Space</span>
                <span className="text-xs text-gray-500">Personal Workspace</span>
              </div>
            </Link>

            {/* Nav Sections */}
            <nav className="space-y-6 w-full px-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 px-2 mt-4 md:mt-0">Overview</div>
                <SidebarItem href="/dashboard" icon={<Home className="w-4 h-4" />} label="Home" onClick={() => setMobileMenuOpen(false)} />
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 px-2">Create</div>
                <ul className="space-y-1">
                  <SidebarItem href="/dashboard/projects" icon={<FolderOpen className="w-4 h-4" />} label="All projects" onClick={() => setMobileMenuOpen(false)} />
                  <SidebarItem href="/dashboard/downloads" icon={<Download className="w-4 h-4" />} label="Downloads" onClick={() => setMobileMenuOpen(false)} />
                  <SidebarItem href="/dashboard/drafts" icon={<FileEdit className="w-4 h-4" />} label="Drafts" badge="2" onClick={() => setMobileMenuOpen(false)} />
                  <SidebarItem href="/dashboard/brand-kits" icon={<Palette className="w-4 h-4" />} label="Brand kits" onClick={() => setMobileMenuOpen(false)} />
                </ul>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 px-2">Social Media</div>
                <ul className="space-y-1">
                  <SidebarItem href="/dashboard/posts" icon={<LayoutDashboard className="w-4 h-4" />} label="Posts" onClick={() => setMobileMenuOpen(false)} />
                  <SidebarItem href="/dashboard/planner" icon={<CalendarDays className="w-4 h-4" />} label="Planner" onClick={() => setMobileMenuOpen(false)} />
                  <SidebarItem href="/dashboard/analytics" icon={<LineChart className="w-4 h-4" />} label="AI Analytics" onClick={() => setMobileMenuOpen(false)} />
                </ul>
              </div>
            </nav>
          </div>

          {/* Sidebar Bottom */}
          <div className="p-6">
            <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
              <div className="flex justify-between text-xs mb-2 font-medium">
                <span>Credits Used</span>
                <span className="text-white">120 / 500 mins</span>
              </div>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[24%]" />
              </div>
            </div>
            <Link href="/dashboard/pricing" className="w-full py-3 flex justify-center items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-900/20 uppercase tracking-wider">
              <Zap className="w-4 h-4" fill="currentColor" />
              Upgrade Plan
            </Link>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full bg-slate-50 relative isolate pt-16 md:pt-0 overflow-hidden">
           {children}
        </main>
      </div>
      
      <UploadModal />
    </ProjectProvider>
  );
}

function SidebarItem({ href, icon, label, badge, onClick }: { href: string, icon: React.ReactNode, label: string, badge?: string, onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <li>
      <Link 
        href={href} 
        onClick={onClick}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm ${isActive ? 'bg-slate-800 text-white font-medium' : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        {badge && (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-pink-500/20 text-pink-400 rounded-full">
            {badge}
          </span>
        )}
      </Link>
    </li>
  );
}
