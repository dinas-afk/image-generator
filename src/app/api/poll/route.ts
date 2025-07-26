// app/api/poll/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { bflService } from '../../../../lib/bfl-service';

export async function POST(request: NextRequest) {
  try {
    const { id, polling_url } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      );
    }

    const result = await bflService.pollResult(id, polling_url);

    // If image is ready, download and store it
    if (result.status === 'Ready' && result.result?.sample) {
      try {
        const storedImage = await bflService.downloadAndStoreImage(
          result.result.sample
        );
        result.result.sample = storedImage;
      } catch (downloadError) {
        console.error('Download error:', downloadError);
        // Continue with original URL if download fails
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Polling error:', error);
    return NextResponse.json(
      { error: error.message || 'Polling failed' },
      { status: 500 }
    );
  }
}