import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { requireAdminRequest } from '@/lib/auth';
import { enquiryStatusSchema } from '@/lib/validations';

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
    const { status } = enquiryStatusSchema.parse(body);

    const updatedEnquiry = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedEnquiry);
  } catch (error: any) {
    console.error('Failed to update enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to update enquiry', details: error.message },
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

    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    if (!['Followed Up', 'Resolved'].includes(enquiry.status)) {
      return NextResponse.json(
        { error: 'Only followed up or resolved enquiries can be deleted' },
        { status: 400 }
      );
    }

    await prisma.enquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete enquiry:', error);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}