import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations';

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error('Failed to fetch enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = contactSchema.parse(body);

    const newEnquiry = await prisma.enquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        message: validatedData.message,
        listingId: body.listingId || null,
        listingName: body.listingName || null,
        status: 'Unread',
      },
    });

    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error: any) {
    console.error('Failed to submit enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry', details: error.message },
      { status: 400 }
    );
  }
}
