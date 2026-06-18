import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { listingSchema } from '@/lib/validations';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const prisma = await getPrisma();
    const { id } = await params;
    const body = await request.json();
    
    // Partial validation since it's a PATCH
    const validatedData = listingSchema.partial().parse(body);

    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        name: validatedData.name,
        category: validatedData.category as any,
        brand: validatedData.brand,
        model: validatedData.model,
        year: validatedData.year,
        price: validatedData.price,
        mileage: validatedData.mileage,
        hoursUsed: validatedData.hoursUsed,
        transmission: validatedData.transmission,
        fuelType: validatedData.fuelType,
        driveSystem: validatedData.driveSystem,
        condition: validatedData.condition,
        color: validatedData.color,
        interiorColor: validatedData.interiorColor,
        bodyType: validatedData.bodyType,
        engineCapacity: validatedData.engineCapacity,
        vin: validatedData.vin,
        serviceHistory: validatedData.serviceHistory,
        numberOfKeys: validatedData.numberOfKeys,
        description: validatedData.description,
        features: validatedData.features,
        images: validatedData.images,
        featured: validatedData.featured,
        published: validatedData.published,
      },
    });

    return NextResponse.json(updatedListing);
  } catch (error: any) {
    console.error('Failed to update listing:', error);
    return NextResponse.json(
      { error: 'Failed to update listing', details: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const prisma = await getPrisma();
    const { id } = await params;
    await prisma.listing.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete listing:', error);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}
