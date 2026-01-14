'use client';

import { useState } from 'react';
import styles from './SubscriptionForm.module.css';

interface SubscriptionFormProps {
    onSubscribe: (email: string, categories: string[]) => void;
}

const CATEGORIES = [
    { id: 'general', label: 'General' },
    { id: 'business', label: 'Business' },
    { id: 'technology', label: 'Technology' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'sports', label: 'Sports' },
    { id: 'science', label: 'Science' },
    { id: 'health', label: 'Health' },
];

export default function SubscriptionForm({ onSubscribe }: SubscriptionFormProps) {
    const [email, setEmail] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['general']);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCategoryToggle = (categoryId: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || selectedCategories.length === 0) {
            alert('Please enter your email and select at least one category');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubscribe(email, selectedCategories);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                    📧 Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>
                    📰 Select News Categories
                </label>
                <div className={styles.categories}>
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => handleCategoryToggle(category.id)}
                            className={`${styles.categoryBtn} ${selectedCategories.includes(category.id) ? styles.active : ''
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary ${styles.submitBtn}`}
            >
                {isSubmitting ? (
                    <>
                        <span className="spinner"></span>
                        Subscribing...
                    </>
                ) : (
                    '🚀 Subscribe to News'
                )}
            </button>
        </form>
    );
}
