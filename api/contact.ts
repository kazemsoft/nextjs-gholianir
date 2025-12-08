import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory rate limiting (resets on function cold start)
const submissionTracker: { [key: string]: number[] } = {};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000; // 1 hour ago

  // Clean up old submissions
  if (submissionTracker[ip]) {
    submissionTracker[ip] = submissionTracker[ip].filter(
      (timestamp) => timestamp > hourAgo
    );
  } else {
    submissionTracker[ip] = [];
  }

  // Check if rate limit exceeded (2 submissions per hour)
  if (submissionTracker[ip].length >= 2) {
    return true;
  }

  // Add current submission
  submissionTracker[ip].push(now);
  return false;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000); // Limit to 1000 characters
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get IP address for rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
              (req.headers['x-real-ip'] as string) ||
              'unknown';

  // Check rate limit
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many submissions. Please try again later.'
    });
  }

  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Sanitize inputs
  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedMessage = sanitizeInput(message);

  // Check environment variables
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.error('Missing Telegram environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Simple text format for Telegram
  const telegramMessage = `New Contact: ${sanitizedName}
Email: ${sanitizedEmail}
Message: ${sanitizedMessage}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      throw new Error('Telegram API error');
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return res.status(500).json({
      error: 'Failed to send message. Please try again.'
    });
  }
}
