import { NextRequest, NextResponse } from 'next/server';

// Mark this route as dynamic to prevent build-time evaluation
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Storage not configured. Add SUPABASE_SERVICE_ROLE_KEY to environment.' }, { status: 500 });
    }

    // Dynamic import to avoid build-time errors
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, serviceKey);

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 5MB' }, { status: 400 });
    }

    let ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    let filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    let filepath = `listings/${filename}`;
    let contentType = file.type;

    const arrayBuffer = await file.arrayBuffer();
    let buffer: Buffer = Buffer.from(arrayBuffer);

    try {
      const sharp = (await import('sharp')).default;
      buffer = await sharp(buffer as any)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
      
      ext = 'webp';
      filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      filepath = `listings/${filename}`;
      contentType = 'image/webp';
    } catch (sharpError) {
      console.warn('Image compression skipped or failed:', sharpError);
      // fallback to original buffer if sharp is missing or fails
    }

    const { data, error } = await supabase.storage
      .from('listing-images')
      .upload(filepath, buffer, {
        contentType: contentType,
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }

    const { data: publicUrl } = supabase.storage
      .from('listing-images')
      .getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrl.publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
