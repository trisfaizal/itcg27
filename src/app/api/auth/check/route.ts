import { NextResponse } from 'next/server';
import { isUserAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authenticated = isUserAuthenticated();
  return NextResponse.json({ authenticated });
}
