import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        // Verify webhook secret
        const authHeader = request.headers.get('authorization');
        const secret = process.env.REVALIDATION_SECRET;

        if (!secret || authHeader !== `Bearer ${secret}`) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { locale, entity } = body;

        if (entity === 'footer' || !entity) {
            if (locale) {
                revalidateTag(`footer-${locale}`);
            } else {
                // Revalidate all locales
                const locales = ['tr', 'en'];
                locales.forEach(loc => revalidateTag(`footer-${loc}`));
            }
        }

        return NextResponse.json({
            revalidated: true,
            now: Date.now()
        });
    } catch (error) {
        console.error('Revalidation error:', error);
        return NextResponse.json(
            { message: 'Error revalidating' },
            { status: 500 }
        );
    }
}