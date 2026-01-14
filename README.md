# TazaKaber - Fresh News Delivered 📰

A modern news web application that fetches real-time news and delivers it to users via email. Built with Next.js 14, featuring a stunning UI with the Coolors palette.

![TazaKaber](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)

## 🎨 Features

- **Real-time News**: Fetch latest news from 80,000+ sources via NewsAPI
- **Email Delivery**: Send news digests directly to user emails
- **Category Filtering**: Browse news by category (Business, Tech, Sports, etc.)
- **Beautiful UI**: Modern design with glassmorphism and smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Color Palette**: Custom design using [Coolors palette](https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- NewsAPI key (get free at [newsapi.org](https://newsapi.org))
- Email account for sending (Gmail recommended)

### Installation

1. **Clone the repository**
   ```bash
   cd tazakaber
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local`:
   ```bash
   copy .env.local.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   ```env
   NEWSAPI_KEY=your_newsapi_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

   **Getting Gmail App Password:**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Go to App Passwords
   - Generate new app password for "Mail"
   - Use this password in `EMAIL_PASS`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add environment variables**
   
   In Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Redeploy

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

## 🎨 Color Palette

The app uses a vibrant color scheme from Coolors:

- **Sky Blue** (`#8ECAE6`) - Headers, accents
- **Ocean Blue** (`#219EBC`) - Buttons, links
- **Navy** (`#023047`) - Backgrounds, text
- **Amber** (`#FFB703`) - Highlights, warnings
- **Orange** (`#FB8500`) - CTAs, alerts

## 📁 Project Structure

```
tazakaber/
├── app/
│   ├── api/
│   │   ├── news/
│   │   │   ├── route.ts          # News API endpoint
│   │   │   └── search/route.ts   # Search endpoint
│   │   └── email/
│   │       └── send/route.ts     # Email sending endpoint
│   ├── components/
│   │   ├── NewsCard.tsx          # News article card
│   │   ├── NewsFeed.tsx          # News feed with filters
│   │   └── SubscriptionForm.tsx  # Email subscription form
│   ├── globals.css               # Design system
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── lib/
│   ├── newsService.ts            # NewsAPI integration
│   ├── emailService.ts           # Email service
│   └── types.ts                  # TypeScript types
├── .env.local.example            # Environment template
├── next.config.js                # Next.js config
├── package.json                  # Dependencies
└── vercel.json                   # Vercel config
```

## 🔧 Configuration

### NewsAPI

- Free tier: 100 requests/day
- Sign up at [newsapi.org](https://newsapi.org)
- Add key to `NEWSAPI_KEY` in `.env.local`

### Email Service

The app uses Nodemailer with Gmail SMTP:
- Requires Gmail account with 2FA enabled
- Use App Password (not regular password)
- Configure in `.env.local`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## 🌟 Features in Detail

### News Fetching
- Real-time news from NewsAPI
- Category filtering (7 categories)
- Caching to respect API limits
- Error handling and retry logic

### Email Delivery
- Beautiful HTML email templates
- Responsive email design
- Individual article sending
- Bulk news digest

### UI/UX
- Glassmorphism design
- Smooth animations
- Hover effects
- Loading states
- Error notifications
- Mobile-responsive

## 🔒 Security Notes

- Never commit `.env.local` to Git
- Use environment variables for all secrets
- Validate email addresses before sending
- Implement rate limiting for production

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ using Next.js 14 and the Coolors palette
