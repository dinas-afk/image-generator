import { Video, Upload, Wand2, Play, Clock, AlertCircle } from 'lucide-react';
import { Navigation } from '../../../components/Navigation';

export default function VideoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto p-6 space-y-12">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="relative">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-4">
                Video Generation
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 opacity-20 blur-xl"></div>
            </div>
            <p className="text-slate-300 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Transform static images into dynamic videos or create videos directly from text descriptions
            </p>
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono">AI Video Generation • Coming Soon</span>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-gradient-to-r from-orange-900/20 to-pink-900/20 border border-orange-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <AlertCircle className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-300 mb-1">Feature In Development</h3>
                <p className="text-slate-400">Video generation capabilities are currently being implemented</p>
              </div>
            </div>
          </div>

          {/* Preview of Future Features */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Text-to-Video Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 space-y-6 opacity-75">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl">
                  <Wand2 className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Text-to-Video</h3>
                  <p className="text-slate-400 text-sm">Create videos from text descriptions</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
                    Video Prompt
                  </label>
                  <textarea
                    placeholder="A serene mountain landscape with flowing water and gentle wind through the trees..."
                    className="w-full p-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-400 placeholder-slate-500 resize-none opacity-50 cursor-not-allowed"
                    rows={3}
                    disabled
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Duration
                    </label>
                    <select className="w-full p-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-400 opacity-50 cursor-not-allowed" disabled>
                      <option>5 seconds</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Quality
                    </label>
                    <select className="w-full p-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-400 opacity-50 cursor-not-allowed" disabled>
                      <option>HD 1080p</option>
                    </select>
                  </div>
                </div>
                
                <button className="w-full py-4 px-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 rounded-xl font-semibold flex items-center justify-center gap-3 cursor-not-allowed opacity-50">
                  <Play className="w-5 h-5" />
                  Generate Video
                </button>
              </div>
            </div>

            {/* Image-to-Video Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 space-y-6 opacity-75">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl">
                  <Upload className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Image-to-Video</h3>
                  <p className="text-slate-400 text-sm">Animate your images with AI</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
                    Upload Image
                  </label>
                  <div className="w-full h-32 border-2 border-dashed border-slate-600/50 rounded-xl flex items-center justify-center bg-slate-900/30 opacity-50">
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <Upload className="w-6 h-6" />
                      <span className="font-medium text-sm">Upload image to animate</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
                    Animation Style
                  </label>
                  <textarea
                    placeholder="Add gentle camera movement, flowing hair, swaying trees..."
                    className="w-full p-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-400 placeholder-slate-500 resize-none opacity-50 cursor-not-allowed"
                    rows={3}
                    disabled
                  />
                </div>
                
                <button className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl font-semibold flex items-center justify-center gap-3 cursor-not-allowed opacity-50">
                  <Video className="w-5 h-5" />
                  Animate Image
                </button>
              </div>
            </div>
          </div>

          {/* Feature Timeline */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Development Roadmap</h3>
                <p className="text-slate-400">Upcoming video generation features</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="font-semibold text-orange-300">Phase 1: API Integration</div>
                  <div className="text-sm text-slate-400">Setting up video generation API endpoints and service layer</div>
                </div>
                <div className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full">In Progress</div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg opacity-60">
                <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-300">Phase 2: Text-to-Video</div>
                  <div className="text-sm text-slate-400">Generate videos directly from text prompts</div>
                </div>
                <div className="text-xs text-slate-400 bg-slate-600/20 px-2 py-1 rounded-full">Planned</div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg opacity-60">
                <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-300">Phase 3: Image-to-Video</div>
                  <div className="text-sm text-slate-400">Animate existing images with AI-powered motion</div>
                </div>
                <div className="text-xs text-slate-400 bg-slate-600/20 px-2 py-1 rounded-full">Planned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}