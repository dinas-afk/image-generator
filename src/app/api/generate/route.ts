// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { bflService } from '../../../../lib/bfl-service';

export async function POST(request: NextRequest) {
  try {
    const { prompt, aspect_ratio, seed, output_format } = await request.json();


    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Valid prompt is required' },
        { status: 400 }
      );
    }

    // Submit generation request
    const result = await bflService.generateImage({
      prompt,
      aspect_ratio,
      seed,
      output_format,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Generation failed';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}