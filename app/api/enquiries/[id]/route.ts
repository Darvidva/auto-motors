import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Allow updating status
    const updatedEnquiry = await prisma.enquiry.update({
      where: { id },
      data: {
        status: body.status,
      },
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
  try {
    const { id } = await params;
    await prisma.enquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete enquiry:', error);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
