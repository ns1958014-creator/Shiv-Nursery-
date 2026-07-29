import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, MapPin, Clock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const phone = '+91 8493029963';
  const rawPhone = '918493029963';
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
    'Hello Shiv Nursery, I would like to inquire about plant availability, pricing, and visiting your nursery in Manwal, J&K.'
  )}`;

  return (
    <section id="contact" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Column */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-700/50 mb-4">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Get In Touch</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                Connect With <span className="text-emerald-400">Shiv Nursery</span>
              </h2>

              <p className="mt-4 text-emerald-200/80 text-base leading-relaxed">
                Have questions about fruit plant varieties, soil mix, bulk nursery orders, or visiting our site in Manwal? We are just a phone call or WhatsApp message away!
              </p>
            </div>

            {/* Quick Contact Info Cards */}
            <div className="space-y-4">
              
              {/* Address */}
              <div className="p-5 rounded-2xl bg-emerald-900/40 border border-emerald-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-700/60 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-600/40">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Nursery Address</div>
                  <div className="text-lg font-bold text-white mt-0.5">Shiv Nursery</div>
                  <div className="text-sm text-emerald-200/80">Manwal, Jammu & Kashmir, India</div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-5 rounded-2xl bg-emerald-900/40 border border-emerald-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-700/60 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-600/40">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Direct Phone Call</div>
                  <a href={`tel:+${rawPhone}`} className="text-xl font-bold text-emerald-300 hover:underline block mt-0.5">
                    {phone}
                  </a>
                  <div className="text-xs text-emerald-200/70">Click to dial immediately</div>
                </div>
              </div>

              {/* Hours */}
              <div className="p-5 rounded-2xl bg-emerald-900/40 border border-emerald-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-700/60 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-600/40">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Nursery Timings</div>
                  <div className="text-sm font-bold text-white mt-0.5">Monday – Sunday: 8:00 AM – 7:00 PM</div>
                  <div className="text-xs text-emerald-200/70">Open all days for visitors & pickup</div>
                </div>
              </div>

            </div>

            {/* Clickable Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={`tel:+${rawPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-emerald-950 font-bold text-base shadow-xl shadow-emerald-900/50 hover:from-emerald-400 hover:to-green-500 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5 fill-emerald-950" />
                <span>Call Now: 8493029963</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600 text-white font-bold text-base shadow-lg transition-all"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Quick Call Out Box */}
          <div className="lg:col-span-6 bg-gradient-to-tr from-emerald-900 via-emerald-800 to-green-900 p-8 sm:p-10 rounded-3xl border border-emerald-600/50 shadow-2xl relative">
            <ShieldCheck className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Planning a Garden or Orchard?
            </h3>
            <p className="mt-3 text-emerald-100 text-sm sm:text-base leading-relaxed">
              We provide tailored sapling quotes for commercial fruit orchards, farmhouse landscaping, residential lawn setup, and bulk plant orders.
            </p>

            <div className="mt-8 pt-6 border-t border-emerald-700/60 space-y-4">
              <div className="flex items-center gap-3 text-sm text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Free consultation on soil preparation & plant selection</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Direct nursery pickup & local J&K transport options</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Special discounts on bulk fruit sapling purchases</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-300 hover:text-white font-bold text-sm"
              >
                <span>Request Bulk Quote on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
