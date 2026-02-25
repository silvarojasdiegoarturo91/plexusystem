import { NextRequest, NextResponse } from 'next/server';
import { logVisit, getVisits, getStats } from '@/lib/visit-tracker';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page } = body;
    
    const headers: Record<string, string | string[] | undefined> = {
      'user-agent': request.headers.get('user-agent') || undefined,
      'x-forwarded-for': request.headers.get('x-forwarded-for') || undefined,
      'referer': request.headers.get('referer') || undefined,
    };
    
    const visit = logVisit(page || '/', headers);
    
    return NextResponse.json({ success: true, visit });
  } catch (error) {
    console.error('Error al registrar visita:', error);
    return NextResponse.json(
      { error: 'Error al registrar visita' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const stats = getStats();
  const visits = getVisits();
  
  return NextResponse.json({
    stats,
    recentVisits: visits.visits.slice(-20).reverse()
  });
}
