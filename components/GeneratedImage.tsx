// components/GeneratedImage.tsx
import { useState } from 'react';
import { Download, Copy, Sparkles, Clock, Monitor } from 'lucide-react';

interface GeneratedImageProps {
  src: string;
  alt: string;
  prompt: string;
  aspectRatio: string;
  seed?: number;
}

export function GeneratedImage({ src, alt, prompt, aspectRatio, seed }: GeneratedImageProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `flux-neural-art-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative group">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ aspectRatio: aspectRatio.replace(':', '/') }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="p-3 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-600/50 text-cyan-300 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105"
            title="Download Neural Art"
          >
            {isDownloading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-transparent border-t-cyan-400"></div>
            ) : (
              <Download className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Generation Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs text-cyan-300 font-mono">
            <Sparkles className="w-3 h-3" />
            <span>FLUX Generated</span>
          </div>
        </div>
      </div>
      
      {/* Image Details */}
      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
            <h3 className="font-semibold text-slate-200 uppercase tracking-wider text-sm">Neural Creation Details</h3>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
            <p className="text-slate-300 text-sm leading-relaxed font-mono">{prompt}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-700/30">
            <div className="flex items-center gap-2 mb-1">
              <Monitor className="w-3 h-3 text-slate-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Dimensions</span>
            </div>
            <span className="text-sm text-slate-200 font-mono">{aspectRatio}</span>
          </div>
          
          {seed && (
            <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-700/30">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Seed</span>
              </div>
              <span className="text-sm text-slate-200 font-mono">{seed}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={copyPrompt}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 border border-slate-600/50 rounded-xl text-sm transition-all duration-300 text-slate-200 hover:text-white"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Prompt Copied!' : 'Copy Neural Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
}