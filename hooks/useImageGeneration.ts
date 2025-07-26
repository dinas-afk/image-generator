import { useState, useCallback } from 'react';

interface GenerationOptions {
  prompt: string;
  aspectRatio?: string;
  seed?: number;
  outputFormat?: 'jpeg' | 'png';
}

interface GenerationState {
  isGenerating: boolean;
  progress: string;
  result: string | null;
  error: string | null;
}

export function useImageGeneration() {
  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    progress: '',
    result: null,
    error: null,
  });

  const generateImage = useCallback(async (options: GenerationOptions) => {
    setState({
      isGenerating: true,
      progress: 'Submitting request...',
      result: null,
      error: null,
    });

    try {
      // Submit generation request
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Generation failed');
      }

      const { id, polling_url } = await response.json();

      // Poll for results
      setState(prev => ({ ...prev, progress: 'Generating image...' }));
      
      const result = await pollForResult(id, polling_url);
      
      setState({
        isGenerating: false,
        progress: '',
        result: result.result.sample,
        error: null,
      });
    } catch (error) {
      setState({
        isGenerating: false,
        progress: '',
        result: null,
        error: error.message,
      });
    }
  }, []);

  const pollForResult = async (id: string, pollingUrl?: string) => {
    const maxAttempts = 60; // 5 minutes maximum
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await fetch('/api/poll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, polling_url: pollingUrl }),
      });

      if (!response.ok) {
        throw new Error('Polling failed');
      }

      const result = await response.json();

      if (result.status === 'Ready') {
        return result;
      }

      if (result.status === 'Error') {
        throw new Error(result.error || 'Generation failed');
      }

      // Wait 5 seconds before next poll
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }

    throw new Error('Generation timeout');
  };

  const reset = useCallback(() => {
    setState({
      isGenerating: false,
      progress: '',
      result: null,
      error: null,
    });
  }, []);

  return {
    ...state,
    generateImage,
    reset,
  };
}