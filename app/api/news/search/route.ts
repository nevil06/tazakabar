import { NextRequest, NextResponse } from 'next/server';
import { NewsService } from '@/lib/newsService';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q');
        const pageSize = parseInt(searchParams.get('pageSize') || '20');
        const sortBy = (searchParams.get('sortBy') || 'publishedAt') as 'relevancy' | 'popularity' | 'publishedAt';

        if (!query) {
            return NextResponse.json(
                { error: 'Query parameter is required' },
                { status: 400 }
            );
        }

        const data = await NewsService.searchNews(query, pageSize, sortBy);

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Search API error:', error);
        return NextResponse.json(
            { error: 'Failed to search news', message: error.message },
            { status: 500 }
        );
    }
}
