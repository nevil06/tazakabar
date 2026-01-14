import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/emailService';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, articles } = body;

        if (!email || !articles || !Array.isArray(articles)) {
            return NextResponse.json(
                { error: 'Email and articles array are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const success = await EmailService.sendNewsDigest(email, articles);

        if (success) {
            return NextResponse.json({
                success: true,
                message: 'News digest sent successfully!'
            });
        } else {
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Email API error:', error);
        return NextResponse.json(
            { error: 'Failed to send email', message: error.message },
            { status: 500 }
        );
    }
}
