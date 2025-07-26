// app/api/edit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { bflService } from '../../../../lib/bfl-service';

export async function POST(request: NextRequest) {
  try {
    const { prompt, input_image, seed, output_format } = await request.json();

    if (!prompt || !input_image) {
      return NextResponse.json(
        { error: 'Prompt and input image are required' },
        { status: 400 }
      );
    }

    const result = await bflService.editImage({
      prompt,
      input_image,
      seed,
      output_format,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Edit error:', error);
    return NextResponse.json(
      { error: error.message || 'Edit failed' },
      { status: 500 }
    );
  }
}