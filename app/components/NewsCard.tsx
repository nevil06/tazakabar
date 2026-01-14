'use client';

import { NewsArticle } from '@/lib/types';
import Image from 'next/image';
import styles from './NewsCard.module.css';

interface NewsCardProps {
    article: NewsArticle;
    onSendEmail?: (article: NewsArticle) => void;
}

export default function NewsCard({ article, onSendEmail }: NewsCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <article className={`${styles.card} card fade-in`}>
            {article.urlToImage && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={article.urlToImage}
                        alt={article.title}
                        width={400}
                        height={250}
                        className={styles.image}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.source}>{article.source.name}</span>
                    <span className={styles.date}>{formatDate(article.publishedAt)}</span>
                </div>

                <h3 className={styles.title}>{article.title}</h3>

                {article.description && (
                    <p className={styles.description}>{article.description}</p>
                )}

                <div className={styles.actions}>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Read Article
                    </a>

                    {onSendEmail && (
                        <button
                            onClick={() => onSendEmail(article)}
                            className="btn btn-secondary"
                            title="Send this article via email"
                        >
                            📧 Email This
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
