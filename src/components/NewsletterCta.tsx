import React, { useState } from 'react';
import { Mail, CheckCircle, Send } from 'lucide-react';

export const NewsletterCta: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-[#FAF7F2] border-t border-b border-[#B08D57]/25">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] mb-4">
          <Mail className="w-6 h-6" />
        </div>

        <span className="text-xs uppercase tracking-widest text-[#B08D57] font-bold block mb-2">
          Weekly Editorial Dispatch
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1C1C] mb-4">
          The Sunday Letter from Bombay
        </h2>

        <p className="text-sm sm:text-base text-[#5A5751] max-w-xl mx-auto mb-8 leading-relaxed font-sans">
          One curated essay, three street food recommendations, and a forgotten Mumbai heritage corner delivered quietly to your inbox every Sunday morning.
        </p>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-3 p-4 px-6 bg-[#F5F0E8] border border-[#B08D57] text-[#1C1C1C] rounded-lg shadow-sm animate-in fade-in duration-300">
            <CheckCircle className="w-5 h-5 text-[#8B1E2D]" />
            <span className="font-serif font-bold text-sm sm:text-base">
              Thank you for subscribing! Your weekly Bombay dispatch will arrive this Sunday.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 rounded-md bg-white border border-[#B08D57]/40 text-[#1C1C1C] placeholder-[#5A5751]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/30 focus:border-[#8B1E2D]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#8B1E2D] hover:bg-[#731824] text-white font-semibold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#5A5751]/70 mt-4">
          No spam, no promotional blasts. Just thoughtful city storytelling. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
