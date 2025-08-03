import Link from 'next/link';
import { Wand2, Video, ArrowRight, Sparkles, Image, Play } from 'lucide-react';

export default function LandingPage() {
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
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto py-16 px-4">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20">
          <div className="relative">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              AI Creative Studio
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-20 blur-xl"></div>
          </div>
          <p className="text-slate-300 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Transform your imagination into reality with cutting-edge AI technology. 
            Create stunning images and dynamic videos from simple text prompts.
          </p>
          <div className="flex items-center justify-center space-x-2 text-slate-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono">Powered by FLUX.1 & Advanced AI Models</span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Image Generation Card */}
          <Link 
            href="/generate"
            className="group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl">
                  <Image className="w-8 h-8 text-cyan-400" />
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                  Image Generation
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Create breathtaking images from text descriptions using FLUX.1 Kontext Pro. 
                  Generate and edit with precision control over every detail.
                </p>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-400">Text-to-Image</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-slate-400">Image Editing</span>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  Available Now
                </div>
              </div>
            </div>
          </Link>

          {/* Video Generation Card */}
          <Link 
            href="/video"
            className="group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl">
                  <Video className="w-8 h-8 text-purple-400" />
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                  Video Generation
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Transform images into dynamic videos or create videos directly from text prompts. 
                  Bring your static creations to life with AI-powered motion.
                </p>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-400">Image-to-Video</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-slate-400">Text-to-Video</span>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600/20 border border-slate-600/30 rounded-full text-slate-400 text-sm font-medium">
                  <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                  Coming Soon
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Powered by Advanced AI
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              State-of-the-art models delivering professional-quality results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">High Quality</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Professional-grade results with incredible detail and artistic fidelity
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto">
                <Wand2 className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Easy to Use</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Simple text prompts transform into stunning visual content instantly
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto">
                <Video className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Versatile</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                From static images to dynamic videos, create any visual content you need
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}