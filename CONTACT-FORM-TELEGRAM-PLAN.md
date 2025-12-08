# Contact Form to Telegram Bot Integration - Implementation Plan

## Overview

Connect the portfolio contact form to send instant notifications to your Telegram account when someone submits a message.

---

## Option 1: Serverless Function (Recommended)

### Architecture

```
Contact Form → Serverless Function (Vercel/Netlify) → Telegram Bot API → Your Telegram
```

### Pros
✅ No backend server needed
✅ Free tier available (Vercel/Netlify)
✅ Automatic scaling
✅ Easy deployment
✅ Secure (API keys in environment variables)
✅ Fast response times

### Cons
❌ Requires serverless platform account
❌ Cold start delays (~1-2 seconds first request)

### Implementation Steps

1. **Create Telegram Bot**
   - Talk to @BotFather on Telegram
   - Run `/newbot` command
   - Get Bot Token (e.g., `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)
   - Get your Chat ID (use @userinfobot or @get_id_bot)

2. **Create API Endpoint**
   - Create `/api/contact.ts` (Vercel) or `/netlify/functions/contact.ts` (Netlify)
   - Handle POST requests with form data
   - Validate input (name, email, message)
   - Send formatted message to Telegram Bot API

3. **Set Environment Variables**
   - `TELEGRAM_BOT_TOKEN` - Your bot token
   - `TELEGRAM_CHAT_ID` - Your chat ID

4. **Update Contact Form**
   - Add form submission handler
   - Send data to `/api/contact` endpoint
   - Show success/error messages
   - Add loading state

5. **Deploy**
   - Push to GitHub
   - Connect to Vercel/Netlify
   - Add environment variables in dashboard
   - Test the integration

### Tech Stack
- **Frontend**: React form with fetch API
- **Backend**: Vercel Serverless Function (or Netlify Function)
- **API**: Telegram Bot API (https://api.telegram.org)

### Code Structure
```
/api/
  contact.ts         # Serverless function endpoint

/components/
  Contact.tsx        # Updated with submission logic

/utils/
  telegram.ts        # Telegram API helper functions
```

### Estimated Time
- Setup: 1-2 hours
- Development: 2-3 hours
- Testing: 1 hour
- **Total: 4-6 hours**

### Cost
**$0/month** (Free tier)

---

## Option 2: Third-Party Form Service

### Architecture

```
Contact Form → Form Service (Formspree/Tally/Typeform) → Webhook → Telegram
```

### Services to Consider

**A. Formspree**
- Easy integration
- Built-in spam protection
- Webhook support
- Free tier: 50 submissions/month

**B. Tally.so**
- Beautiful forms
- Free unlimited submissions
- Webhook to Telegram via Zapier/Make

**C. Getform**
- Developer-friendly
- Webhook support
- Free tier: 50 submissions/month

### Pros
✅ No code required (or minimal)
✅ Built-in spam protection
✅ Form analytics included
✅ Quick setup (30 minutes)

### Cons
❌ Monthly submission limits
❌ Less customization
❌ External dependency
❌ May require paid plan for webhooks

### Implementation Steps

1. **Sign up for form service**
2. **Create form and get endpoint**
3. **Set up webhook to Telegram**
   - Use services like Zapier, Make, or n8n
   - Connect form service → Telegram
4. **Update frontend form action**
5. **Test submission**

### Estimated Time
- Setup: 30 minutes - 1 hour
- Testing: 30 minutes
- **Total: 1-1.5 hours**

### Cost
- Free tier: $0/month (limited submissions)
- Paid: $10-20/month (unlimited)

---

## Option 3: Direct Backend Integration

### Architecture

```
Contact Form → Your Backend API → Database → Telegram Bot API
```

### Pros
✅ Full control
✅ Can store messages in database
✅ Advanced features (spam detection, rate limiting)
✅ Can send auto-reply emails

### Cons
❌ Need to manage backend server
❌ More complex setup
❌ Hosting costs
❌ Longer development time

### Implementation Steps

1. **Set up Node.js backend**
   - Express.js or Fastify
   - MongoDB/PostgreSQL for storage

2. **Create API endpoints**
   - `POST /api/contact` - Receive form data
   - Store in database
   - Send to Telegram

3. **Deploy backend**
   - Railway, Render, or DigitalOcean
   - Set environment variables

4. **Update frontend**
   - Connect to backend API

### Estimated Time
- Backend setup: 4-6 hours
- Database setup: 2 hours
- Integration: 2 hours
- **Total: 8-10 hours**

### Cost
**$5-15/month** (Server hosting)

---

## Option 4: Email to Telegram Bridge

### Architecture

```
Contact Form → Email Service (EmailJS/Resend) → Email → Telegram Email Bridge
```

### How It Works
1. Form sends email via EmailJS/Resend
2. Forward email to Telegram bot email address
3. Bot posts to your chat

### Pros
✅ Simple setup
✅ No backend needed
✅ Works with existing email

### Cons
❌ Delayed notifications (email processing time)
❌ Less control over formatting
❌ Email quota limits

### Estimated Time
**2-3 hours**

### Cost
**$0-5/month**

---

## Recommended Solution: Option 1 (Serverless Function)

### Why This Is Best

1. **Cost-Effective**: Free on Vercel/Netlify
2. **Fast**: Instant notifications
3. **Secure**: API keys in environment variables
4. **Scalable**: Handles traffic automatically
5. **Simple**: Clean code, easy to maintain
6. **Professional**: Full control over UX

### Detailed Implementation Plan

#### Phase 1: Telegram Bot Setup (15 minutes)

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Choose bot name: "MK Portfolio Bot"
4. Choose username: "mkqoliyan_portfolio_bot"
5. Save Bot Token: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`
6. Get your Chat ID:
   - Search for `@userinfobot`
   - Send any message
   - Note your Chat ID (e.g., `987654321`)

#### Phase 2: Create Serverless Function (1 hour)

**File: `/api/contact.ts`**

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Send to Telegram
  const telegramMessage = `
🔔 New Contact Form Submission

👤 Name: ${name}
📧 Email: ${email}

💬 Message:
${message}

---
Sent from: mkqoliyan.com
  `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Telegram API error');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
```

#### Phase 3: Update Contact Form (1 hour)

**File: `/components/Contact.tsx`**

```typescript
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    // Form JSX with state handling
  );
};
```

#### Phase 4: Deployment (30 minutes)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add contact form Telegram integration"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to vercel.com
   - Import GitHub repository
   - Add environment variables:
     - `TELEGRAM_BOT_TOKEN`: Your bot token
     - `TELEGRAM_CHAT_ID`: Your chat ID
   - Deploy

3. **Test**
   - Visit your deployed site
   - Fill and submit form
   - Check Telegram for notification

#### Phase 5: Enhancements (Optional)

1. **Rate Limiting**
   - Prevent spam submissions
   - Use Vercel Edge Config or Upstash Redis

2. **Email Validation**
   - Validate email format
   - Check for disposable email domains

3. **Honeypot Field**
   - Add hidden field for bot detection
   - Reject if filled

4. **Auto-Reply**
   - Send confirmation email to user
   - Use Resend or SendGrid

5. **Analytics**
   - Track form submissions
   - Use Google Analytics or Plausible

---

## Security Considerations

### Must-Have

1. **Environment Variables**
   - Never commit bot token to Git
   - Use `.env.local` for local development
   - Use Vercel dashboard for production

2. **Input Validation**
   - Sanitize all inputs
   - Check email format
   - Limit message length (max 1000 chars)

3. **Rate Limiting**
   - Max 5 submissions per IP per hour
   - Prevent spam attacks

### Nice-to-Have

4. **CORS**
   - Only allow requests from your domain

5. **CAPTCHA**
   - Add reCAPTCHA v3 for bot prevention

6. **Honeypot**
   - Hidden field to catch bots

---

## Testing Strategy

### Unit Tests
- Telegram API helper functions
- Form validation logic

### Integration Tests
- Full form submission flow
- API endpoint responses

### Manual Tests
1. Submit valid form → Check Telegram notification
2. Submit invalid form → Check error handling
3. Submit empty form → Check validation
4. Submit rapid forms → Check rate limiting
5. Network error → Check error message

---

## Notification Format Options

### Option A: Simple Text
```
New Contact: John Doe
Email: john@example.com
Message: I'd like to discuss a project...
```

### Option B: Formatted (Recommended)
```
🔔 NEW CONTACT FORM

👤 Name: John Doe
📧 Email: john@example.com

💬 Message:
I'd like to discuss a project with you regarding...

⏰ Submitted: Dec 8, 2025 at 2:30 PM
🌐 From: mkqoliyan.com
```

### Option C: Rich with Actions
```
🔔 New Contact Form Submission

👤 John Doe
📧 john@example.com

💬 "I'd like to discuss a project..."

[Reply via Email] [View All Submissions]
```

---

## Alternative: Use n8n Workflow

If you're already using n8n (mentioned in your skills):

```
Contact Form → Webhook → n8n Workflow → Telegram
                             ↓
                         Save to DB (optional)
                             ↓
                         Send Email (optional)
```

### Pros
✅ Visual workflow builder
✅ Easy to modify
✅ Can add multiple actions
✅ No code changes needed

### Cons
❌ Need n8n instance running
❌ Additional infrastructure

---

## Final Recommendation

**Go with Option 1: Serverless Function on Vercel**

### Why?
1. ✅ **Free** - No hosting costs
2. ✅ **Fast** - Instant notifications (< 1 second)
3. ✅ **Simple** - Clean code, easy to maintain
4. ✅ **Scalable** - Handles any traffic
5. ✅ **Secure** - Environment variables, input validation
6. ✅ **Professional** - Full control over UX and formatting

### Next Steps if Approved

1. ✅ Create Telegram bot (15 min)
2. ✅ Create `/api/contact.ts` endpoint (1 hour)
3. ✅ Update `Contact.tsx` component (1 hour)
4. ✅ Add environment variables (5 min)
5. ✅ Deploy to Vercel (30 min)
6. ✅ Test thoroughly (30 min)

**Total Time: ~4 hours**
**Cost: $0/month**

---

## Questions to Consider

Before implementation, please decide:

1. **Notification Format**: Which format do you prefer (A, B, or C)?
2. **Rate Limiting**: How many submissions per hour/day should be allowed?
3. **Auto-Reply**: Do you want to send confirmation emails to users?
4. **Storage**: Do you want to store submissions in a database for backup?
5. **Validation**: Any specific validation rules for messages?

---

**Ready to implement?** Let me know if this plan works for you or if you'd like any modifications!
