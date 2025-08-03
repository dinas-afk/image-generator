'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Image, Video, ArrowLeft } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null; // Don't show navigation on landing page
  }

  return (
    <nav className="relative z-10 container mx-auto pt-6 px-4">
      <div className="flex items-center justify-between">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
        
        <div className="flex items-center gap-1 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-1">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              pathname === '/'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          
          <Link
            href="/generate"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              pathname === '/generate'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Image className="w-4 h-4" />
            Generate
          </Link>
          
          <Link
            href="/video"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              pathname === '/video'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Video className="w-4 h-4" />
            Video
          </Link>
        </div>
      </div>
    </nav>
  );
}