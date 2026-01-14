import nodemailer from 'nodemailer';
import { EmailRequest } from './types';

export class EmailService {
    private static transporter: nodemailer.Transporter | null = null;

    private static getTransporter() {
        if (!this.transporter) {
            this.transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.EMAIL_PORT || '587'),
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
        }
        return this.transporter;
    }

    static async sendEmail({ to, subject, html }: EmailRequest): Promise<boolean> {
        try {
            const transporter = this.getTransporter();

            const info = await transporter.sendMail({
                from: `"TazaKaber News" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                html,
            });

            console.log('Email sent:', info.messageId);
            return true;
        } catch (error) {
            console.error('Email error:', error);
            return false;
        }
    }

    static async sendNewsDigest(email: string, articles: any[]): Promise<boolean> {
        const articlesHtml = articles.map(article => {
            return `
        <div style="margin-bottom: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" style="width: 100%; max-width: 600px; border-radius: 8px; margin-bottom: 15px;">` : ''}
          <h2 style="color: #023047; margin-bottom: 10px;">${article.title}</h2>
          <p style="color: #219EBC; font-size: 14px; margin-bottom: 10px;">
            ${article.source.name} • ${new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p style="color: #333; line-height: 1.6;">${article.description || ''}</p>
          <a href="${article.url}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: linear-gradient(135deg, #FFB703 0%, #FB8500 100%); color: #023047; text-decoration: none; border-radius: 5px; font-weight: 600;">
            Read Full Article
          </a>
        </div>
      `;
        }).join('');

        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #023047 0%, #219EBC 100%); font-family: 'Inter', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);">
              <h1 style="color: #023047; text-align: center; margin-bottom: 10px; font-size: 32px;">
                TazaKaber
              </h1>
              <p style="color: #8ECAE6; text-align: center; margin-bottom: 30px; font-size: 16px;">
                Your Daily News Digest
              </p>
              <div style="height: 3px; background: linear-gradient(90deg, #8ECAE6, #219EBC, #FFB703, #FB8500); margin-bottom: 30px; border-radius: 2px;"></div>
              
              ${articlesHtml}
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #8ECAE6; text-align: center;">
                <p style="color: #666; font-size: 14px;">
                  You're receiving this because you subscribed to TazaKaber news updates.
                </p>
                <p style="color: #666; font-size: 14px; margin-top: 10px;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="color: #219EBC; text-decoration: none;">Visit TazaKaber</a>
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

        return this.sendEmail({
            to: email,
            subject: `📰 Your Daily News Digest - ${new Date().toLocaleDateString()}`,
            html,
        });
    }
}
