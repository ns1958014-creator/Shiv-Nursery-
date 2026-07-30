import React, { useState, useEffect } from 'react';
import { Leaf, Phone, MessageSquare, ShoppingBag, Menu, X, MapPin, Instagram, PackageCheck, Code, BookOpen } from 'lucide-react';
import { InquiryItem } from '../types';

interface NavbarProps {
  inquiryItems: InquiryItem[];
  onOpenInquiryDrawer: () => void;
  onNavigateCategory: (catTitle: string) => void;
  onOpenOrderHistory?: () => void;
  orderCount?: number;
  onOpenReadingMode?: () => void;
  isReadingModeActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  inquiryItems,
  onOpenInquiryDrawer,
  onNavigateCategory,
  onOpenOrderHistory,
  orderCount = 0,
  onOpenReadingMode,
  isReadingModeActive = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalInquiryCount = inquiryItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Categories', href: '#categories' },
    { name: 'Explore Plants', href: '#plants' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Manwal, Jammu & Kashmir, India • Fresh Healthy Nursery Stock</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+918493029963"
              className="flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 8493029963</span>
            </a>
            <span className="hidden sm:inline text-emerald-700">|</span>
            <a
              href="https://wa.me/918493029963?text=Hello%20Shiv%20Nursery%2C%20I%20want%20to%20inquire%20about%20plants."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <span className="hidden md:inline text-emerald-700">|</span>
            <a
              href="https://www.instagram.com/shiv_nursery60?igsh=ZHQzNTVoNGhyaG9x"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-pink-300 hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@shiv_nursery60</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md py-3 border-b border-emerald-100/50'
            : 'bg-white/95 py-4 border-b border-emerald-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-300">
              <Leaf className="w-5 h-5 text-emerald-50 fill-emerald-100/30" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-700 bg-clip-text text-transparent font-serif tracking-wide block">
                Shiv Nursery
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-semibold block -mt-1">
                Manwal • J&K
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-emerald-900/80 hover:text-emerald-600 transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Reading Mode / Show Code Button */}
            {onOpenReadingMode && (
              <button
                onClick={onOpenReadingMode}
                className={`relative p-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
                  isReadingModeActive
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700 shadow-inner'
                    : 'bg-slate-900 text-emerald-400 border-slate-800 hover:bg-slate-800'
                }`}
                title="Toggle Reading Mode / Show Source Code"
              >
                <Code className="w-4 h-4 text-emerald-400" />
                <span className="hidden lg:inline">Reading Mode</span>
              </button>
            )}

            {/* Track Orders Button */}
            {onOpenOrderHistory && (
              <button
                onClick={onOpenOrderHistory}
                className="relative p-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors border border-emerald-200/60 flex items-center gap-1.5"
                title="Track Orders & Invoices"
              >
                <PackageCheck className="w-4 h-4 text-emerald-700" />
                <span className="hidden xl:inline text-xs font-semibold text-emerald-900">
                  Track Orders
                </span>
                {orderCount > 0 && (
                  <span className="bg-emerald-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {orderCount}
                  </span>
                )}
              </button>
            )}

            {/* Shopping Cart / Inquiry Bag Button */}
            <button
              onClick={onOpenInquiryDrawer}
              className="relative p-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-sm flex items-center gap-2"
              title="View Shopping Cart & Plant Inquiry Bag"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-200" />
              <span className="hidden md:inline text-xs font-semibold">
                Cart
              </span>
              {totalInquiryCount > 0 && (
                <span className="bg-emerald-400 text-emerald-950 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalInquiryCount}
                </span>
              )}
            </button>

            {/* Quick Call CTA */}
            <a
              href="tel:+918493029963"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-medium shadow-md shadow-emerald-600/20 hover:from-emerald-700 hover:to-green-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-emerald-900 hover:bg-emerald-50 transition-colors border border-emerald-100"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-emerald-100 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-950 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-transparent hover:border-emerald-100"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-emerald-100 flex flex-col gap-2">
              {onOpenOrderHistory && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenOrderHistory();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 text-white text-sm font-medium shadow-sm"
                >
                  <PackageCheck className="w-4 h-4 text-emerald-300" />
                  <span>Track Orders & Invoices ({orderCount})</span>
                </button>
              )}
              <a
                href="tel:+918493029963"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 8493029963</span>
              </a>
              <a
                href="https://wa.me/918493029963?text=Hello%20Shiv%20Nursery%2C%20I%20want%20to%20inquire%20about%20plants."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-medium border border-emerald-200"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/shiv_nursery60?igsh=ZHQzNTVoNGhyaG9x"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-medium shadow-sm"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram: @shiv_nursery60</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
