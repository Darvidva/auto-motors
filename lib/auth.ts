import { jwtVerify, type JWTPayload } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export interface AuthPayload extends JWTPayload {
    sub: string;
    email: string;
    role: string;
}

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET is not configured');
    }

    return new TextEncoder().encode(secret);
}

export async function verifyAuthToken(token: string): Promise<AuthPayload> {
    const { payload } = await jwtVerify(token, getJwtSecret());

    if (
        typeof payload.sub !== 'string' ||
        typeof payload.email !== 'string' ||
        typeof payload.role !== 'string'
    ) {
        throw new Error('Invalid auth token payload');
    }

    return payload as AuthPayload;
}

export async function requireAdminRequest(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
        return {
            error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        };
    }

    try {
        const auth = await verifyAuthToken(token);

        if (auth.role !== 'admin') {
            return {
                error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
            };
        }

        return { auth };
    } catch (error) {
        return {
            error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        };
    }
}

export { getJwtSecret };