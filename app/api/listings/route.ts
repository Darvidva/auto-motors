import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPrisma } from '@/lib/prisma';
import { requireAdminRequest } from '@/lib/auth';
import { listingSchema } from '@/lib/validations';

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function ensureUniqueSlug(baseSlug: string) {
  const prisma = await getPrisma();
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.listing.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
}

export async function GET(request: NextRequest) {
  try {
    const prisma = await getPrisma();
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';

    const listings = await prisma.listing.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    const serializedListings = listings.map((listing) => ({
      ...listing,
      price: Number(listing.price),
    }));

    return NextResponse.json(serializedListings);
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdminRequest(request);

  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    const prisma = await getPrisma();
    const body = await request.json();
    const validatedData = listingSchema.parse(body);
    const slug = await ensureUniqueSlug(generateSlug(validatedData.name));

    const newListing = await prisma.listing.create({
      data: {
        slug,
        name: validatedData.name,
        category: validatedData.category,
        brand: validatedData.brand,
        model: validatedData.model,
        year: validatedData.year,
        price: BigInt(validatedData.price),
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
        features: validatedData.features,
        images: validatedData.images,
        featured: validatedData.featured,
        published: validatedData.published,
      },
    });

    revalidatePath('/', 'layout');
    return NextResponse.json({ ...newListing, price: Number(newListing.price) }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing', details: error.message },
      { status: 400 }
    );
  }
}