'use client';

import { useState } from 'react';
import { useImageGeneration } from '../hooks/useImageGeneration';
import { AspectRatioSelector } from './AspectRatioSelector';
import { GeneratedImage } from './GeneratedImage';
import { LoadingSpinner } from './LoadingSpinner';
import { Wand2, Download, RefreshCw } from 'lucide-react';

const EXAMPLE_PROMPTS = [
  "A serene mountain landscape at sunset with vibrant colors",
  "A futuristic cityscape with flying cars and neon lights",
  "A cute robot reading a book in a cozy library",
  "Abstract art with flowing colors and geometric shapes",
];

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [seed, setSeed] = useState<number | undefined>();
  const { isGenerating, progress, result, error, generateImage, reset } = useImageGeneration();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    await generateImage({
      prompt: prompt.trim(),
      aspectRatio,
      seed,
      outputFormat: 'jpeg',
    });
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const generateRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <div className="text-center space-y-6 mb-12">
        <div className="relative">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            FLUX AI Studio
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-20 blur-xl"></div>
        </div>
        <p className="text-slate-300 text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Harness the power of Black Forest Labs' FLUX.1 Kontext to create stunning, 
          photorealistic images from your imagination
        </p>
        <div className="flex items-center justify-center space-x-2 text-slate-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-mono">FLUX.1 Kontext Pro • Online</span>
        </div>
      </div>

      {/* Generation Form */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 space-y-8 shadow-2xl">
        {/* Prompt Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
              Neural Prompt Interface
            </span>
          </label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your vision... A serene mountain landscape at sunset with vibrant colors"
              className="w-full p-6 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 resize-none text-slate-100 placeholder-slate-400 backdrop-blur-sm"
              rows={4}
              disabled={isGenerating}
            />
            <div className="absolute bottom-4 right-4 text-xs text-slate-500 font-mono">
              {prompt.length}/1000
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
              Quick Start Templates
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="group p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-cyan-400/50 rounded-xl transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGenerating}
              >
                <div className="text-sm text-slate-300 group-hover:text-cyan-300 transition-colors duration-300">
                  {example.slice(0, 50)}...
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AspectRatioSelector
            value={aspectRatio}
            onChange={setAspectRatio}
            disabled={isGenerating}
          />
          
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-pink-400 to-orange-400 rounded-full"></div>
                Seed Control
              </span>
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={seed || ''}
                onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="Random generation"
                className="flex-1 p-3 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 text-slate-100 placeholder-slate-400"
                disabled={isGenerating}
              />
              <button
                onClick={generateRandomSeed}
                className="px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 border border-slate-600/50 rounded-xl transition-all duration-300 text-slate-300 hover:text-white"
                disabled={isGenerating}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="relative">
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="group w-full py-6 px-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-2xl hover:shadow-cyan-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            {isGenerating ? (
              <>
                <div className="relative">
                  <LoadingSpinner />
                </div>
                <span className="font-mono text-sm">
                  {progress || 'Neural networks processing...'}
                </span>
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Generate Neural Art</span>
                <div className="w-2 h-2 bg-white rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            <p className="text-red-300 font-semibold uppercase tracking-wider text-sm">Neural Network Error</p>
          </div>
          <p className="text-red-200 mb-4 font-mono text-sm">{error}</p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-lg transition-all duration-300 text-red-300 hover:text-red-200 text-sm font-medium"
          >
            Reinitialize System
          </button>
        </div>
      )}

      {result && (
        <GeneratedImage
          src={result}
          alt={prompt}
          prompt={prompt}
          aspectRatio={aspectRatio}
          seed={seed}
        />
      )}
    </div>
  );
}