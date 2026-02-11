import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting (resets on function cold start)
const submissionTracker: { [key: string]: number[] } = {};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000; // 1 hour ago

  if (submissionTracker[ip]) {
    submissionTracker[ip] = submissionTracker[ip].filter(
      (timestamp) => timestamp > hourAgo
    );
  } else {
    submissionTracker[ip] = [];
  }

  if (submissionTracker[ip].length >= 2) {
    return true;
  }

  submissionTracker[ip].push(now);
  return false;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000);
}

const WEBHOOK_URL = 'https://n8n.nuway.ir/webhook/gholianir-telegram';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    );
  }

  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 }
    );
  }

  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedMessage = sanitizeInput(message);

  try {
    const params = new URLSearchParams({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
    });

    const response = await fetch(`${WEBHOOK_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.status}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Error sending to webhook:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
