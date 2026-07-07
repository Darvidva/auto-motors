import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { requireAdminRequest } from '@/lib/auth';
import { enquirySubmissionSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  const authResult = await requireAdminRequest(request);

  if ('error' in authResult) {
    return authResult.error;
  }

  try {
    const prisma = await getPrisma();
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
    const prisma = await getPrisma();
    const body = await request.json();
    const validatedData = enquirySubmissionSchema.parse(body);

    const newEnquiry = await prisma.enquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        message: validatedData.message,
        listingId: validatedData.listingId,
        listingName: validatedData.listingName,
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