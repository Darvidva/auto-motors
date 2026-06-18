import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { listingSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const prisma = await getPrisma();
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';

    const listings = await prisma.listing.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const prisma = await getPrisma();
    const body = await request.json();
    
    // Validate request body
    const validatedData = listingSchema.parse(body);

    const newListing = await prisma.listing.create({
      data: {
        slug: body.slug,
        name: validatedData.name,
        category: validatedData.category as any,
        brand: validatedData.brand,
        model: validatedData.model,
        year: validatedData.year,
        price: validatedData.price,
        mileage: validatedData.mileage ?? null,
        hoursUsed: validatedData.hoursUsed ?? null,
        transmission: validatedData.transmission,
        fuelType: validatedData.fuelType,
        driveSystem: validatedData.driveSystem,
        condition: validatedData.condition,
        color: validatedData.color || '',
        interiorColor: validatedData.interiorColor || null,
        bodyType: validatedData.bodyType || null,
        engineCapacity: validatedData.engineCapacity || null,
        vin: validatedData.vin || null,
        serviceHistory: validatedData.serviceHistory || null,
        numberOfKeys: validatedData.numberOfKeys ?? null,
        description: validatedData.description,
        features: validatedData.features || [],
        images: validatedData.images || [],
        featured: validatedData.featured,
        published: validatedData.published,
      },
    });

    return NextResponse.json(newListing, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing', details: error.message },
      { status: 400 }
    );
  }
}
