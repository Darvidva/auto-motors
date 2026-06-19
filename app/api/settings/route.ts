import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPrisma } from '@/lib/prisma';
import { settingsSchema } from '@/lib/validations';

export async function GET() {
  try {
    const prisma = await getPrisma();
    const settings = await prisma.businessSettings.findFirst();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch business settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const prisma = await getPrisma();
    const body = await request.json();
    
    // Validate request body
    const validatedData = settingsSchema.parse(body);

    const existingSettings = await prisma.businessSettings.findFirst();

    let settings;
    if (existingSettings) {
      settings = await prisma.businessSettings.update({
        where: { id: existingSettings.id },
        data: {
          name: validatedData.name,
          tagline: validatedData.tagline,
          phone: validatedData.phone,
          whatsapp: validatedData.whatsapp,
          email: validatedData.email,
          address: validatedData.address,
          heroImages: validatedData.heroImages,
          teamMembers: validatedData.teamMembers,
        },
      });
    } else {
      settings = await prisma.businessSettings.create({
        data: {
          name: validatedData.name,
          tagline: validatedData.tagline,
          phone: validatedData.phone,
          whatsapp: validatedData.whatsapp,
          email: validatedData.email,
          address: validatedData.address,
          businessHours: [],
          socialMedia: [],
          heroImages: validatedData.heroImages,
          teamMembers: validatedData.teamMembers,
        },
      });
    }

    // Revalidate the entire site so hero images and settings update immediately
    revalidatePath('/', 'layout');

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error('Failed to update settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings', details: error.message },
      { status: 400 }
    );
  }
}
