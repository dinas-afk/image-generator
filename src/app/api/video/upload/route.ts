import { NextRequest, NextResponse } from 'next/server';
import { falService } from '../../../../../lib/fal-service';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    console.log('Uploading image to fal.ai storage');
    
    // Upload image and get URL
    const imageUrl = await falService.uploadImage(file);

    console.log('Image uploaded successfully:', imageUrl);

    return NextResponse.json({ image_url: imageUrl });
  } catch (error) {
    console.error('Image upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Image upload failed';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}