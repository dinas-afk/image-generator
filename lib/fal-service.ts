interface VideoGenerationRequest {
  prompt: string;
  image_url: string;
  duration?: '8s' | '16s';
  generate_audio?: boolean;
}

interface FalResponse {
  video: {
    url: string;
    width: number;
    height: number;
    file_name: string;
    file_size: number;
    content_type: string;
  };
  seed: number;
  inference_time: number;
}

interface VideoGenerationResult {
  video_url: string;
  seed: number;
  inference_time: number;
  width: number;
  height: number;
}

class FalService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://fal.run';

  constructor() {
    this.apiKey = process.env.FAL_KEY!;
    if (!this.apiKey) {
      throw new Error('FAL_KEY environment variable is required');
    }
  }

  /**
   * Generate video from image using Veo3 Fast Image-to-Video
   */
  async generateVideo(request: VideoGenerationRequest): Promise<VideoGenerationResult> {
    console.log('Making video generation request to fal.ai');
    console.log('Request:', JSON.stringify(request, null, 2));
    
    const requestBody = {
      prompt: request.prompt,
      image_url: request.image_url,
      duration: request.duration || '8s',
      generate_audio: request.generate_audio ?? true,
    };

    const response = await fetch(`${this.baseUrl}/fal-ai/veo3/fast/image-to-video`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response body:', errorText);
      try {
        const error = JSON.parse(errorText);
        throw new Error(error.detail || error.message || `HTTP ${response.status}`);
      } catch {
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    }

    const result: FalResponse = await response.json();
    console.log('Video generation result:', result);

    return {
      video_url: result.video.url,
      seed: result.seed,
      inference_time: result.inference_time,
      width: result.video.width,
      height: result.video.height,
    };
  }

  /**
   * Upload image to fal.ai and get URL for video generation
   * This is needed because Veo3 requires an accessible image URL
   */
  async uploadImage(file: File): Promise<string> {
    console.log('Uploading image to fal.ai storage');
    
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/storage/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Upload error response:', errorText);
      throw new Error(`Failed to upload image: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Upload result:', result);
    
    return result.file_url || result.url;
  }

  /**
   * Convert base64 image to File object for upload
   */
  base64ToFile(base64: string, filename: string = 'image.jpg'): File {
    // Remove data URL prefix if present
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
    
    // Convert base64 to bytes
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    
    // Create File object
    return new File([byteArray], filename, { type: 'image/jpeg' });
  }

  /**
   * Helper method to generate video from base64 image
   */
  async generateVideoFromBase64(base64Image: string, prompt: string, options?: {
    duration?: '8s' | '16s';
    generate_audio?: boolean;
  }): Promise<VideoGenerationResult> {
    // Convert base64 to File and upload
    const file = this.base64ToFile(base64Image);
    const imageUrl = await this.uploadImage(file);
    
    // Generate video
    return this.generateVideo({
      prompt,
      image_url: imageUrl,
      duration: options?.duration,
      generate_audio: options?.generate_audio,
    });
  }
}

export const falService = new FalService();