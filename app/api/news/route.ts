import { NextRequest, NextResponse } from 'next/server';
import { NewsService } from '@/lib/newsService';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category') || undefined;
        const country = searchParams.get('country') || 'us';
        const pageSize = parseInt(searchParams.get('pageSize') || '20');

        const data = await NewsService.getTopHeadlines(category, country, pageSize);

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('News API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch news', message: error.message },
            { status: 500 }
        );
    }
}
