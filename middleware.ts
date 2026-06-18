import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define which routes to protect
export const config = {
  matcher: ['/admin/:path*'],
};

export async function middleware(request: NextRequest) {
  // If we are at the login page, let it pass (wait, we moved login to /login)
  // But if login was at /admin/login, we would check for it here.
  // Since we are moving login to /login, any hit to /admin/* is protected.
  
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    // Redirect to login if no token is present
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-do-not-use');
    // Verify the JWT
    await jwtVerify(token, secret);
    
    // Valid token, let the request proceed
    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
