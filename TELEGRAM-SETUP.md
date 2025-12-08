# Telegram Bot Setup Guide

Complete setup instructions for connecting your contact form to Telegram.

---

## Step 1: Create Telegram Bot (5 minutes)

### 1.1 Open Telegram and Find BotFather

1. Open Telegram app (mobile or desktop)
2. Search for `@BotFather` in the search bar
3. Start a conversation with BotFather

### 1.2 Create New Bot

Send the following command:
```
/newbot
```

BotFather will ask for:

**Bot Name:**
```
MK Portfolio Bot
```
(You can choose any name you like)

**Bot Username:**
```
mkqoliyan_portfolio_bot
```
(Must end with 'bot', must be unique)

### 1.3 Save Your Bot Token

BotFather will respond with a message containing your **Bot Token**.

Example:
```
Done! Congratulations on your new bot.
You will find it at t.me/mkqoliyan_portfolio_bot

Use this token to access the HTTP API:
123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

**⚠️ IMPORTANT:** Copy and save this token securely. You'll need it later.

---

## Step 2: Get Your Chat ID (3 minutes)

### Option A: Using @userinfobot (Recommended)

1. Search for `@userinfobot` in Telegram
2. Start the bot
3. Send any message to the bot
4. It will reply with your user information
5. Copy your **ID** (it's a number like `987654321`)

### Option B: Using @get_id_bot

1. Search for `@get_id_bot` in Telegram
2. Start the bot
3. It will automatically send your Chat ID

### Option C: Manual Method

1. Send a message to your new bot (the one you just created)
2. Visit this URL in your browser (replace `YOUR_BOT_TOKEN`):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. Look for `"chat":{"id":987654321}` in the JSON response
4. Copy the ID number

**Save this Chat ID** - you'll need it for environment variables.

---

## Step 3: Set Up Environment Variables

### For Local Development

1. Create `.env.local` file in your project root:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   TELEGRAM_CHAT_ID=987654321
   ```

3. Replace with your actual values from Steps 1 and 2

**⚠️ NEVER commit `.env.local` to Git!** It's already in `.gitignore`.

### For Vercel Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add two variables:

   **Variable 1:**
   - **Name:** `TELEGRAM_BOT_TOKEN`
   - **Value:** Your bot token from Step 1
   - **Environment:** Production, Preview, Development

   **Variable 2:**
   - **Name:** `TELEGRAM_CHAT_ID`
   - **Value:** Your chat ID from Step 2
   - **Environment:** Production, Preview, Development

5. Click **Save**
6. Redeploy your project for changes to take effect

---

## Step 4: Test Locally (5 minutes)

### 4.1 Start Development Server

```bash
npm run dev
```

### 4.2 Test the Form

1. Open http://localhost:3000 in your browser
2. Scroll to the contact form
3. Fill in:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Message:** This is a test message
4. Click **Send**

### 4.3 Check Telegram

Within 1-2 seconds, you should receive a message in Telegram:

```
New Contact: Test User
Email: test@example.com
Message: This is a test message
```

**✓ Success!** If you received the message, everything is working.

**✗ Not Working?** See Troubleshooting section below.

---

## Step 5: Deploy to Vercel (10 minutes)

### 5.1 Push to GitHub

```bash
git add .
git commit -m "Add Telegram contact form integration"
git push origin main
```

### 5.2 Deploy to Vercel

**Option A: Auto-Deploy (If already connected)**
- Vercel will auto-deploy when you push to GitHub
- Check the deployment status in Vercel dashboard

**Option B: Manual Deploy**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variables (from Step 3)
6. Click **Deploy**

### 5.3 Test Production

1. Visit your deployed site (e.g., `your-site.vercel.app`)
2. Fill and submit the contact form
3. Check Telegram for notification

**✓ Working!** You're all set!

---

## Troubleshooting

### Issue: "Server configuration error"

**Cause:** Environment variables not set

**Fix:**
1. Check `.env.local` exists and has correct values
2. For Vercel: Check environment variables in dashboard
3. Restart dev server: `npm run dev`

### Issue: "Failed to send message"

**Cause 1:** Invalid Bot Token
- Double-check token from BotFather
- Make sure no extra spaces

**Cause 2:** Invalid Chat ID
- Verify your chat ID is correct
- Must be a number (not username)

**Cause 3:** Bot not started
- Send `/start` to your bot in Telegram
- Then try the form again

### Issue: "Too many submissions"

**Cause:** Rate limit reached (2 per hour)

**Fix:**
- Wait 1 hour
- Or restart dev server to reset counter
- In production: Wait for rate limit to expire

### Issue: Message not formatted correctly

**Check:**
1. Look at the message in Telegram
2. Verify all fields are present
3. If broken, check Contact.tsx form field IDs match API

### Issue: CORS errors in browser console

**Cause:** API endpoint CORS settings

**Fix:**
- CORS is already configured in `/api/contact.ts`
- If still issues, check browser console for details

---

## Message Format

Your Telegram notifications will look like this:

```
New Contact: John Doe
Email: john@example.com
Message: Hi, I'd like to discuss a web development project...
```

Simple and clean - exactly what you requested!

---

## Rate Limiting

**Current Settings:**
- **Limit:** 2 submissions per hour per IP address
- **Purpose:** Prevent spam and abuse

**How it works:**
- Tracks IP addresses in memory
- Resets on server restart (serverless cold start)
- Returns error after 2 submissions

**To modify:**
Edit `/api/contact.ts` line 22:
```typescript
if (submissionTracker[ip].length >= 2) {  // Change this number
```

---

## Security Features

✅ **Input Validation**
- All fields required
- Email format validation
- 1000 character limit per field

✅ **Input Sanitization**
- Trims whitespace
- Prevents injection attacks

✅ **Rate Limiting**
- 2 submissions per hour per IP
- Prevents spam

✅ **CORS Protection**
- Restricts API access

✅ **Environment Variables**
- Secrets never in code
- Secure storage in Vercel

---

## Testing Checklist

Before going live, test:

- [ ] Submit valid form → Check Telegram ✓
- [ ] Submit empty form → See validation error ✓
- [ ] Submit invalid email → See error ✓
- [ ] Submit 3 times in 1 hour → Rate limit works ✓
- [ ] Check success message appears ✓
- [ ] Check form clears after success ✓
- [ ] Test on mobile device ✓
- [ ] Test on production URL ✓

---

## Maintenance

### Updating Bot Token

If you need to change your bot token:

1. Create new bot with BotFather (or regenerate token)
2. Update `.env.local` for local dev
3. Update Vercel environment variables
4. Redeploy

### Monitoring

Check Telegram regularly for messages.

You can also:
- Check Vercel function logs for errors
- Monitor form submissions
- Track any API errors

---

## Advanced: Custom Message Format

If you want to change the message format later, edit `/api/contact.ts`:

```typescript
const telegramMessage = `New Contact: ${sanitizedName}
Email: ${sanitizedEmail}
Message: ${sanitizedMessage}`;
```

You can customize to:

```typescript
const telegramMessage = `
🔔 NEW MESSAGE

👤 ${sanitizedName}
📧 ${sanitizedEmail}

💬 Message:
${sanitizedMessage}

---
From: mkqoliyan.com
`;
```

---

## Support

**Issues?**
1. Check this guide first
2. Review Troubleshooting section
3. Check Vercel function logs
4. Verify environment variables

**Still stuck?**
- Check browser console for errors
- Check Vercel deployment logs
- Test bot manually: send message to your bot in Telegram

---

## Quick Reference

**Bot Token:** Store in `TELEGRAM_BOT_TOKEN`
**Chat ID:** Store in `TELEGRAM_CHAT_ID`
**Rate Limit:** 2 per hour
**Message Format:** Simple text
**Platform:** Vercel Serverless Functions

**Files:**
- `/api/contact.ts` - API endpoint
- `/components/Contact.tsx` - Form component
- `.env.local` - Local environment variables
- `.env.example` - Template

---

**🎉 Congratulations!** Your contact form is now connected to Telegram!

Every submission will instantly notify you on Telegram with the visitor's name, email, and message.
