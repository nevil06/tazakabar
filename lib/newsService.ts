import { NewsResponse } from './types';

const NEWSAPI_KEY = process.env.NEWSAPI_KEY;
const NEWSAPI_BASE_URL = 'https://newsapi.org/v2';

export class NewsService {
    private static cache: Map<string, { data: NewsResponse; timestamp: number }> = new Map();
    private static CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    static async getTopHeadlines(
        category?: string,
        country: string = 'us',
        pageSize: number = 20
    ): Promise<NewsResponse> {
        const cacheKey = `headlines-${category || 'general'}-${country}`;
        const cached = this.cache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.data;
        }

        const params = new URLSearchParams({
            apiKey: NEWSAPI_KEY || '',
            country,
            pageSize: pageSize.toString(),
        });

        if (category) {
            params.append('category', category);
        }

        const response = await fetch(`${NEWSAPI_BASE_URL}/top-headlines?${params}`);

        if (!response.ok) {
            throw new Error(`NewsAPI error: ${response.statusText}`);
        }

        const data: NewsResponse = await response.json();

        this.cache.set(cacheKey, { data, timestamp: Date.now() });

        return data;
    }

    static async searchNews(
        query: string,
        pageSize: number = 20,
        sortBy: 'relevancy' | 'popularity' | 'publishedAt' = 'publishedAt'
    ): Promise<NewsResponse> {
        const cacheKey = `search-${query}-${sortBy}`;
        const cached = this.cache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.data;
        }

        const params = new URLSearchParams({
            apiKey: NEWSAPI_KEY || '',
            q: query,
            pageSize: pageSize.toString(),
            sortBy,
        });

        const response = await fetch(`${NEWSAPI_BASE_URL}/everything?${params}`);

        if (!response.ok) {
            throw new Error(`NewsAPI error: ${response.statusText}`);
        }

        const data: NewsResponse = await response.json();

        this.cache.set(cacheKey, { data, timestamp: Date.now() });

        return data;
    }

    static formatArticleForEmail(article: any): string {
        return `
      <div style="margin-bottom: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
        ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">` : ''}
        <h2 style="color: #023047; margin-bottom: 10px;">${article.title}</h2>
        <p style="color: #219EBC; font-size: 14px; margin-bottom: 10px;">
          ${article.source.name} • ${new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <p style="color: #333; line-height: 1.6;">${article.description || ''}</p>
        <a href="${article.url}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #FB8500; color: white; text-decoration: none; border-radius: 5px;">
          Read More
        </a>
      </div>
    `;
    }
}
