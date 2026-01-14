'use client';

import { useState } from 'react';
import { NewsArticle } from '@/lib/types';
import NewsFeed from './components/NewsFeed';
import SubscriptionForm from './components/SubscriptionForm';
import styles from './page.module.css';

export default function Home() {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

    const showMessage = (message: string, type: 'success' | 'error' = 'success') => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
    };

    const handleSendEmail = async (article: NewsArticle) => {
        const email = prompt('Enter your email address to receive this article:');

        if (!email) return;

        try {
            const response = await fetch('/api/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    articles: [article],
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('📧 Article sent to your email!', 'success');
            } else {
                showMessage(data.error || 'Failed to send email', 'error');
            }
        } catch (error) {
            showMessage('Failed to send email. Please try again.', 'error');
        }
    };

    const handleSubscribe = async (email: string, categories: string[]) => {
        try {
            // Fetch news for selected categories
            const response = await fetch(`/api/news?category=${categories[0]}&pageSize=5`);
            const data = await response.json();

            if (data.articles && data.articles.length > 0) {
                // Send welcome email with latest news
                const emailResponse = await fetch('/api/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        articles: data.articles,
                    }),
                });

                if (emailResponse.ok) {
                    showMessage('🎉 Subscribed! Check your email for the latest news.', 'success');
                } else {
                    showMessage('Subscription saved, but failed to send welcome email.', 'error');
                }
            }
        } catch (error) {
            showMessage('Failed to subscribe. Please try again.', 'error');
        }
    };

    return (
        <div className={styles.page}>
            {/* Notification */}
            {showNotification && (
                <div className={`${styles.notification} ${styles[notificationType]} fade-in`}>
                    {notificationMessage}
                </div>
            )}

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>
                            TazaKaber
                        </h1>
                        <p className={styles.subtitle}>
                            Fresh News Delivered to Your Inbox
                        </p>
                        <p className={styles.description}>
                            Stay informed with the latest breaking news from around the world.
                            Subscribe to get daily news digests in your favorite categories.
                        </p>
                    </div>
                </div>
            </section>

            {/* Subscription Section */}
            <section className={styles.subscription}>
                <div className="container">
                    <div className={styles.subscriptionWrapper}>
                        <h2 className="text-center mb-2">📬 Subscribe to News Digest</h2>
                        <p className="text-center mb-3" style={{ color: 'var(--text-secondary)' }}>
                            Get curated news articles delivered straight to your email
                        </p>
                        <SubscriptionForm onSubscribe={handleSubscribe} />
                    </div>
                </div>
            </section>

            {/* News Feed Section */}
            <section className={styles.newsFeed}>
                <div className="container">
                    <h2 className="text-center mb-3">🌍 Latest News</h2>
                    <NewsFeed onSendEmail={handleSendEmail} />
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className="container">
                    <div className={styles.footerContent}>
                        <p>© 2026 TazaKaber - Fresh News Delivered</p>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                            Powered by NewsAPI
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
