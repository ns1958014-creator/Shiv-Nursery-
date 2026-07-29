import React from 'react';
import { Leaf, Phone, MapPin, Mail, MessageSquare, ArrowUp } from 'lucide-react';
import { CATEGORIES } from '../data/plantsData';

interface FooterProps {
  onSelectCategory: (categoryTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 pt-16 pb-8 border-t border-emerald-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-emerald-950 shadow-md">
                <Leaf className="w-5 h-5 fill-emerald-950/20" />
              </div>
              <div>
                <span className="text-2xl font-bold font-serif text-white tracking-wide block">
                  Shiv Nursery
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold block -mt-1">
                  Manwal • Jammu & Kashmir
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              Shiv Nursery is dedicated to providing healthy, high-quality plants for homes, gardens, farms, and landscaping projects across Jammu & Kashmir.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="tel:+918493029963"
                className="p-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 transition-colors border border-emerald-800"
                title="Call Shiv Nursery"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918493029963?text=Hello%20Shiv%20Nursery"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 transition-colors border border-emerald-800"
                title="WhatsApp Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold font-serif text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Home', href: '#hero' },
                { name: 'About Us', href: '#about' },
                { name: 'Categories', href: '#categories' },
                { name: 'Explore Plants', href: '#plants' },
                { name: 'Why Choose Us', href: '#why-us' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Customer Reviews', href: '#reviews' },
                { name: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-emerald-200/80 hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Plant Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-serif text-white uppercase tracking-wider">
              Plant Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.title);
                      const el = document.getElementById('plants');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-emerald-200/80 hover:text-emerald-400 transition-colors text-left"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-serif text-white uppercase tracking-wider">
              Contact Information
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 text-emerald-200/90">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Shiv Nursery, Manwal, Jammu & Kashmir, India</span>
              </div>

              <div className="flex items-center gap-2.5 text-emerald-200/90">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+918493029963" className="hover:underline font-semibold text-emerald-300">
                  +91 8493029963
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-emerald-200/90">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +91 8493029963</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p>© 2026 Shiv Nursery. All Rights Reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold transition-colors border border-emerald-800"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
