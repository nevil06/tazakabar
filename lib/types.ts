export interface NewsArticle {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
}

export interface EmailSubscription {
    email: string;
    categories: string[];
    frequency: 'daily' | 'weekly';
}

export interface EmailRequest {
    to: string;
    subject: string;
    html: string;
}
