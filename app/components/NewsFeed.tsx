'use client';

import { useState, useEffect } from 'react';
import { NewsArticle } from '@/lib/types';
import NewsCard from './NewsCard';
import styles from './NewsFeed.module.css';

interface NewsFeedProps {
    onSendEmail?: (article: NewsArticle) => void;
}

const CATEGORIES = ['general', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

export default function NewsFeed({ onSendEmail }: NewsFeedProps) {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('general');

    useEffect(() => {
        fetchNews(selectedCategory);
    }, [selectedCategory]);

    const fetchNews = async (category: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/news?category=${category}&pageSize=12`);

            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }

            const data = await response.json();
            setArticles(data.articles || []);
        } catch (err: any) {
            setError(err.message || 'Failed to load news');
            console.error('News fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.feed}>
            <div className={styles.filters}>
                <h2 className={styles.filterTitle}>Browse by Category</h2>
                <div className={styles.categoryButtons}>
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {loading && (
                <div className={styles.loadingContainer}>
                    <div className="spinner"></div>
                    <p className={styles.loadingText}>Loading fresh news...</p>
                </div>
            )}

            {error && (
                <div className={styles.error}>
                    <p>⚠️ {error}</p>
                    <button onClick={() => fetchNews(selectedCategory)} className="btn btn-secondary">
                        Try Again
                    </button>
                </div>
            )}

            {!loading && !error && articles.length === 0 && (
                <div className={styles.empty}>
                    <p>No articles found for this category.</p>
                </div>
            )}

            {!loading && !error && articles.length > 0 && (
                <div className="grid grid-2">
                    {articles.map((article, index) => (
                        <NewsCard
                            key={`${article.url}-${index}`}
                            article={article}
                            onSendEmail={onSendEmail}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
