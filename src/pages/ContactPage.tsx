import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Mail, MapPin, MessageSquare, Sparkles } from 'lucide-react';
import { updatePageSEO, SITE_PAGES_SEO } from '../utils/seo';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(SITE_PAGES_SEO.contact);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <div className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[#B08D57] font-bold block mb-2">
          Letters to the Editor
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1C1C1C] mb-4">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-[#5A5751] font-sans leading-relaxed">
          Have an untold street story, a heritage discovery, or feedback on our Mumbai chronicles? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left: Contact Info & Editorial Guidelines */}
        <div className="md:col-span-5 space-y-8">
          <div className="bg-white p-7 rounded-xl border border-[#B08D57]/25 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#1C1C1C]">
              Editorial Desk
            </h3>

            <div className="flex items-start gap-3.5 text-sm text-[#5A5751]">
              <MapPin className="w-5 h-5 text-[#8B1E2D] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block text-xs uppercase tracking-wider">
                  Field Bureau
                </strong>
                <span>South Bombay & Bandra West, Mumbai, Maharashtra 400001</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-sm text-[#5A5751]">
              <Mail className="w-5 h-5 text-[#8B1E2D] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block text-xs uppercase tracking-wider">
                  Direct Inquiries
                </strong>
                <a
                  href="mailto:contact@bitsofbombae.com"
                  className="text-[#8B1E2D] hover:underline font-medium"
                >
                  contact@bitsofbombae.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-sm text-[#5A5751]">
              <MessageSquare className="w-5 h-5 text-[#8B1E2D] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block text-xs uppercase tracking-wider">
                  Instagram Channel
                </strong>
                <a
                  href="https://www.instagram.com/bitsofbombae?stkn=MTIybXJqOTlpZDB5eQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B08D57] hover:text-[#8B1E2D] underline font-medium"
                >
                  @bitsofbombae
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#FAF7F2] rounded-xl border border-[#B08D57]/30">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B08D57] mb-2">
              <Sparkles className="w-4 h-4 text-[#8B1E2D]" />
              <span>Story & Café Pitch Policy</span>
            </div>
            <p className="text-xs text-[#5A5751] leading-relaxed">
              We prioritize authentic eyewitness storytelling, honest café reviews, and genuine Bombay gems over sponsored promotion. Pitch your cafe discoveries directly through this form or DM us on Instagram @bitsofbombae.
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="md:col-span-7">
          <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#B08D57]/30 shadow-md">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1C1C1C]">
                  Thank you for reaching out to Bits of Bombay!
                </h3>
                <p className="text-sm text-[#5A5751] max-w-md mx-auto leading-relaxed">
                  Your message has been received by our editorial team. We read every dispatch and typically respond within 24–48 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 bg-[#8B1E2D] hover:bg-[#731824] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C] mb-1.5"
                  >
                    Your Name <span className="text-[#8B1E2D]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kabir Merchant"
                    className="w-full px-4 py-3 rounded-md bg-[#FAF7F2] border border-[#B08D57]/30 text-sm text-[#1C1C1C] placeholder-[#5A5751]/50 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/30 focus:border-[#8B1E2D]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C] mb-1.5"
                  >
                    Email Address <span className="text-[#8B1E2D]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. kabir@example.com"
                    className="w-full px-4 py-3 rounded-md bg-[#FAF7F2] border border-[#B08D57]/30 text-sm text-[#1C1C1C] placeholder-[#5A5751]/50 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/30 focus:border-[#8B1E2D]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C] mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Story tip / Heritage query / College project"
                    className="w-full px-4 py-3 rounded-md bg-[#FAF7F2] border border-[#B08D57]/30 text-sm text-[#1C1C1C] placeholder-[#5A5751]/50 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/30 focus:border-[#8B1E2D]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C] mb-1.5"
                  >
                    Your Message <span className="text-[#8B1E2D]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your thoughts, tips, or questions with Bits of Bombay..."
                    className="w-full px-4 py-3 rounded-md bg-[#FAF7F2] border border-[#B08D57]/30 text-sm text-[#1C1C1C] placeholder-[#5A5751]/50 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/30 focus:border-[#8B1E2D]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#8B1E2D] hover:bg-[#731824] text-white font-semibold text-xs uppercase tracking-widest rounded-md transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
