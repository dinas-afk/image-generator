interface GenerationRequest {
    prompt: string;
    aspect_ratio?: string;
    seed?: number;
    output_format?: 'jpeg' | 'png';
    safety_tolerance?: number;
  }
  
  interface EditingRequest extends GenerationRequest {
    input_image: string; // Base64 encoded image
  }
  
  interface BFLResponse {
    id: string;
    polling_url?: string;
  }
  
  interface GenerationResult {
    id: string;
    status: 'Ready' | 'Pending' | 'Error';
    result?: {
      sample: string;
    };
    error?: string;
  }
  
  class BFLService {
    private readonly apiKey: string;
    private readonly baseUrl: string;
  
    constructor() {
      this.apiKey = process.env.BFL_API_KEY!;
      this.baseUrl = process.env.NEXT_PUBLIC_BFL_API_URL!;
    }
  
    /**
     * Generate image from text prompt using FLUX.1 Kontext
     */
    async generateImage(request: GenerationRequest): Promise<BFLResponse> {
      console.log('Making API request to:', `${this.baseUrl}/v1/flux-kontext-pro`);
      console.log('API Key (first 10 chars):', this.apiKey.substring(0, 10) + '...');
      
      const requestBody = {
        prompt: request.prompt,
        aspect_ratio: request.aspect_ratio || '1:1',
        seed: request.seed,
        output_format: request.output_format || 'jpeg',
        safety_tolerance: request.safety_tolerance || 2,
        prompt_upsampling: true, // Recommended for T2I
      };
      
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${this.baseUrl}/v1/flux-kontext-pro`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'x-key': this.apiKey,
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
  
      return response.json();
    }
  
    /**
     * Edit existing image with text instructions
     */
    async editImage(request: EditingRequest): Promise<BFLResponse> {
      const response = await fetch(`${this.baseUrl}/v1/flux-kontext-pro`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'x-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: request.prompt,
          input_image: request.input_image,
          seed: request.seed,
          output_format: request.output_format || 'jpeg',
          safety_tolerance: request.safety_tolerance || 2,
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || `HTTP ${response.status}`);
      }
  
      return response.json();
    }
  
    /**
     * Poll for generation result using polling URL
     */
    async pollResult(requestId: string, pollingUrl?: string): Promise<GenerationResult> {
      // Use polling URL if provided (required for global endpoint)
      const url = pollingUrl || `${this.baseUrl}/v1/get_result`;
      
      console.log('Polling URL:', url);
      console.log('Request ID:', requestId);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-key': this.apiKey,
        },
      });
  
      console.log('Poll response status:', response.status);
      console.log('Poll response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Poll error response:', errorText);
        throw new Error(`Failed to poll result: ${response.status} - ${errorText}`);
      }
  
      return response.json();
    }
  
    /**
     * Download and store image from BFL delivery URL
     */
    async downloadAndStoreImage(imageUrl: string): Promise<string> {
      // Download the image
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to download image');
      }
  
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      
      // In a real app, you'd upload to your CDN/storage service
      // For demo purposes, we'll return the base64 data URL
      return `data:image/jpeg;base64,${base64}`;
    }
  }
  
  export const bflService = new BFLService();