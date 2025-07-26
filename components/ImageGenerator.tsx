'use client';

import { useState, useEffect } from 'react';
import { useImageGeneration } from '../hooks/useImageGeneration';
import { AspectRatioSelector } from './AspectRatioSelector';
import { GeneratedImage } from './GeneratedImage';
import { LoadingSpinner } from './LoadingSpinner';
import { Wand2, Download, RefreshCw, HelpCircle, Upload, Edit, Image, History } from 'lucide-react';

const EXAMPLE_PROMPTS = [
  "A serene mountain landscape at sunset with vibrant colors",
  "A futuristic cityscape with flying cars and neon lights",
  "A cute robot reading a book in a cozy library",
  "Abstract art with flowing colors and geometric shapes",
];

const EXAMPLE_EDIT_PROMPTS = [
  "Change the sky to purple with stars",
  "Add a rainbow in the background",
  "Make the colors more vibrant and saturated",
  "Add snow falling in the scene",
];

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [seed, setSeed] = useState<number | undefined>();
  const [mode, setMode] = useState<'generate' | 'edit'>('generate');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editHistory, setEditHistory] = useState<Array<{prompt: string, result: string}>>([]);
  const [currentEditImage, setCurrentEditImage] = useState<string | null>(null);
  const [lastEditPrompt, setLastEditPrompt] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const { isGenerating, progress, result, error, generateImage, editImage, reset } = useImageGeneration();

  // Track edit results and update history
  useEffect(() => {
    if (result && !isGenerating && mode === 'edit' && lastEditPrompt) {
      // Convert result URL to base64 for next edit
      const convertToBase64 = async () => {
        try {
          const response = await fetch(result);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            setCurrentEditImage(base64);
            setEditHistory(prev => [...prev, { prompt: lastEditPrompt, result }]);
            setLastEditPrompt('');
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error('Failed to convert result to base64:', error);
        }
      };
      convertToBase64();
    }
  }, [result, isGenerating, mode, lastEditPrompt]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    if (mode === 'edit') {
      // For edit mode, we need either an uploaded image or a previous edit result
      const imageToEdit = currentEditImage || uploadedImage;
      if (!imageToEdit) return;

      // Track the current prompt for edit history
      setLastEditPrompt(prompt.trim());

      // Handle image editing using the hook
      await editImage({
        prompt: prompt.trim(),
        inputImage: imageToEdit,
        seed,
        outputFormat: 'jpeg',
      });
      
      // Clear prompt after edit to prepare for next edit
      setPrompt('');
    } else {
      // Handle regular generation
      await generateImage({
        prompt: prompt.trim(),
        aspectRatio,
        seed,
        outputFormat: 'jpeg',
      });
    }
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const generateRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000));
  };

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Convert to base64 without the data URL prefix for API
      const base64 = result.split(',')[1];
      setUploadedImage(base64);
      // Reset edit history when new image is uploaded
      setEditHistory([]);
      setCurrentEditImage(null);
      setLastEditPrompt('');
      reset();
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processImageFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        processImageFile(file);
      }
    }
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
          Harness the power of Black Forest Labs' FLUX.1 Kontext to create and edit stunning 
          images from your imagination
        </p>
        <div className="flex items-center justify-center space-x-2 text-slate-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-mono">FLUX.1 Kontext Pro • Online</span>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-2 flex">
          <button
            onClick={() => {
              setMode('generate');
              setUploadedImage(null);
              setEditHistory([]);
              setCurrentEditImage(null);
              setLastEditPrompt('');
              reset();
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
              mode === 'generate'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            Generate
          </button>
          <button
            onClick={() => {
              setMode('edit');
              setEditHistory([]);
              setCurrentEditImage(null);
              setLastEditPrompt('');
              reset();
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
              mode === 'edit'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Generation Form */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 space-y-8 shadow-2xl">
        {/* Image Upload Section (Edit Mode Only) */}
        {mode === 'edit' && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
                Upload Image to Edit
              </span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isGenerating}
              />
              <label
                htmlFor="image-upload"
                className={`relative w-full h-32 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isDragOver
                    ? 'border-cyan-400 bg-cyan-400/10 scale-[1.02]'
                    : uploadedImage
                    ? 'border-cyan-400/50 bg-slate-700/30'
                    : 'border-slate-600/50 bg-slate-900/30 hover:border-cyan-400/50 hover:bg-slate-800/30'
                } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isDragOver ? (
                  <div className="flex flex-col items-center gap-2 text-cyan-300">
                    <Upload className="w-8 h-8 animate-bounce" />
                    <span className="font-medium">Drop image here</span>
                  </div>
                ) : uploadedImage ? (
                  <div className="flex items-center gap-3 text-cyan-300">
                    <Image className="w-6 h-6" />
                    <span className="font-medium">Image uploaded - click to change</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Upload className="w-6 h-6" />
                    <span className="font-medium">Click to upload or drag & drop image</span>
                    <span className="text-xs opacity-75">Supports JPG, PNG, GIF</span>
                  </div>
                )}
              </label>
              {uploadedImage && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit History (Edit Mode Only) */}
        {mode === 'edit' && editHistory.length > 0 && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full"></div>
                Edit History
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                  {editHistory.length} edit{editHistory.length !== 1 ? 's' : ''} applied
                </span>
              </span>
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {editHistory.map((edit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-slate-700/30 border border-slate-600/30 rounded-lg"
                >
                  <div className="flex items-center justify-center w-6 h-6 bg-green-500/20 text-green-300 rounded-full text-xs font-mono">
                    {index + 1}
                  </div>
                  <div className="flex-1 text-sm text-slate-300">
                    {edit.prompt}
                  </div>
                  <History className="w-4 h-4 text-slate-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prompt Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
              {mode === 'edit' ? 'Edit Instructions' : 'Neural Prompt Interface'}
            </span>
          </label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'edit'
                  ? editHistory.length > 0
                    ? "Continue editing... She is now taking a selfie, add sunglasses"
                    : "Describe how you want to edit the image... Remove the object from her face"
                  : "Describe your vision... A serene mountain landscape at sunset with vibrant colors"
              }
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
              {mode === 'edit' ? 'Example Edits' : 'Quick Start Templates'}
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(mode === 'edit' ? EXAMPLE_EDIT_PROMPTS : EXAMPLE_PROMPTS).map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="group p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-cyan-400/50 rounded-xl transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGenerating}
              >
                <div className="text-sm text-slate-300 group-hover:text-cyan-300 transition-colors duration-300">
                  {example.slice(0, 50)}{example.length > 50 ? '...' : ''}
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
                <div className="group relative">
                  <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-300 cursor-help" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-slate-600 rounded-lg text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    Controls the randomness of image generation. Use the same seed with the same prompt to reproduce identical results. Leave empty for random generation.
                  </div>
                </div>
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
            disabled={!prompt.trim() || isGenerating || (mode === 'edit' && !uploadedImage && !currentEditImage)}
            className="group w-full py-6 px-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-2xl hover:shadow-cyan-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            {isGenerating ? (
              <>
                <div className="relative">
                  <LoadingSpinner />
                </div>
                <span className="font-mono text-sm">
                  {progress || `Neural networks ${mode === 'edit' ? 'editing' : 'processing'}...`}
                </span>
              </>
            ) : (
              <>
                {mode === 'edit' ? (
                  <Edit className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                )}
                <span>{mode === 'edit' ? 'Edit Image' : 'Generate Neural Art'}</span>
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