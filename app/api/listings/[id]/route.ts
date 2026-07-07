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

async function ensureUniqueSlug(baseSlug: string, currentId: string) {
  const prisma = await getPrisma();
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.listing.findUnique({ where: { slug } });

    if (!existing || existing.id === currentId) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminRequest(request);

  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    const prisma = await getPrisma();
    const { id } = await params;
    const body = await request.json();
    const validatedData = listingSchema.partial().parse(body);

    const updateData: Record<string, unknown> = {
      ...validatedData,
      price: validatedData.price === undefined ? undefined : BigInt(validatedData.price),
    };

    if (validatedData.name) {
      updateData.slug = await ensureUniqueSlug(generateSlug(validatedData.name), id);
    }

    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        ...updateData,
        color: validatedData.color ?? undefined,
        interiorColor: validatedData.interiorColor ?? undefined,
        bodyType: validatedData.bodyType ?? undefined,
        engineCapacity: validatedData.engineCapacity ?? undefined,
        vin: validatedData.vin ?? undefined,
        serviceHistory: validatedData.serviceHistory ?? undefined,
      },
    });

    revalidatePath('/', 'layout');
    return NextResponse.json({ ...updatedListing, price: Number(updatedListing.price) });
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
  const authResult = await requireAdminRequest(request);

  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    const prisma = await getPrisma();
    const { id } = await params;

    await prisma.listing.delete({
      where: { id },
    });

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete listing:', error);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}