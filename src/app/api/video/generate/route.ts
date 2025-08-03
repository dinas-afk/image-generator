import { NextRequest, NextResponse } from 'next/server';
import { falService } from '../../../../../lib/fal-service';

export async function POST(request: NextRequest) {
  try {
    const { prompt, image_data, duration, generate_audio } = await request.json();

    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Valid prompt is required' },
        { status: 400 }
      );
    }

    if (!image_data || typeof image_data !== 'string') {
      return NextResponse.json(
        { error: 'Valid image data is required' },
        { status: 400 }
      );
    }

    console.log('Starting video generation with fal.ai');
    
    // Generate video using fal.ai service
    const result = await falService.generateVideoFromBase64(image_data, prompt, {
      duration: duration || '8s',
      generate_audio: generate_audio ?? true,
    });

    console.log('Video generation completed successfully');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Video generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Video generation failed';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}