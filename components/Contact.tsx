import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Check if response has content before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Contact form only works when deployed to Vercel. Please deploy to test.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');

      // Reset to idle after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-16 border-t border-gray-100 scroll-mt-28">
      <h3 className="text-3xl font-black mb-6">Let's Work Together</h3>
      <p className="text-gray-600 mb-10 text-lg">
        Have a project in mind? Drop me a message and I'll get back to you within 24 hours.
      </p>

      <form className="max-w-xl space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-gray-500 text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full border border-gray-300 p-4 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-500 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full border border-gray-300 p-4 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-500 text-sm font-medium mb-2">Message</label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full border border-gray-300 p-4 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          ></textarea>
        </div>

        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-sm">
            ✓ Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-sm">
            ✗ {errorMessage || 'Failed to send message. Please try again.'}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-black text-white font-bold py-4 uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Send'}
        </button>
      </form>
    </section>
  );
};

export default Contact;