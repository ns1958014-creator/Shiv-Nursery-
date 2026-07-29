import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, MessageSquare, Phone, User, Mail, Sparkles, X } from 'lucide-react';
import { CATEGORIES } from '../data/plantsData';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [plantCategory, setPlantCategory] = useState('Fruit Plants');
  const [message, setMessage] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Shiv Nursery!\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nCategory Interest: ${plantCategory}\nMessage: ${message || 'I want to inquire about plant availability and pricing.'}`
    );
    window.open(`https://wa.me/918493029963?text=${text}`, '_blank');
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <section id="inquiry-form" className="py-20 bg-emerald-50/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Send className="w-3.5 h-3.5 text-emerald-600" />
              <span>Plant Inquiry Form</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950">
              Send an <span className="text-emerald-700">Inquiry</span>
            </h2>

            <p className="mt-2 text-sm text-emerald-900/70">
              Fill out the form below and our nursery team will respond promptly with availability, price estimates, and delivery details.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-emerald-950">
                    Thank You, {name}!
                  </h3>
                  <p className="text-sm text-emerald-900/80 max-w-md mx-auto">
                    Your inquiry regarding <strong className="text-emerald-800">{plantCategory}</strong> has been received by Shiv Nursery. We will call you at <strong className="text-emerald-800">{phone}</strong> shortly.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white text-sm font-bold shadow-md hover:bg-emerald-900 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-300" />
                    <span>Send via WhatsApp Immediately</span>
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 text-emerald-900 text-sm font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name Field */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-900 block mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Singh"
                      className="w-full px-4 py-3 rounded-xl bg-emerald-50/50 border border-emerald-200 text-sm text-emerald-950 placeholder-emerald-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-900 block mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 8493029963"
                      className="w-full px-4 py-3 rounded-xl bg-emerald-50/50 border border-emerald-200 text-sm text-emerald-950 placeholder-emerald-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Email Field */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-900 block mb-2 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Email Address (Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vikram@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-emerald-50/50 border border-emerald-200 text-sm text-emerald-950 placeholder-emerald-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Category Field */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-900 block mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Interested Plant Category</span>
                    </label>
                    <select
                      value={plantCategory}
                      onChange={(e) => setPlantCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-emerald-50/50 border border-emerald-200 text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.title}>
                          {cat.title}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Message Field */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-emerald-900 block mb-2">
                    Message / Specific Plant Request
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention specific plants (e.g. Mango Grafted, Rose bushes, Potting soil quantity)..."
                    className="w-full px-4 py-3 rounded-xl bg-emerald-50/50 border border-emerald-200 text-sm text-emerald-950 placeholder-emerald-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white font-bold text-base shadow-xl shadow-emerald-900/20 hover:from-emerald-500 hover:to-green-600 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
