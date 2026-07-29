import React from 'react';
import { motion } from 'motion/react';
import { Leaf, ArrowRight, Phone, Sparkles, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { HERO_IMAGE } from '../data/plantsData';

export const HeroSection: React.FC = () => {
  // Leaf floating motion variations
  const floatingLeaves = [
    { left: '10%', delay: 0, duration: 8, size: 'w-6 h-6' },
    { left: '25%', delay: 2, duration: 10, size: 'w-8 h-8' },
    { left: '55%', delay: 1, duration: 9, size: 'w-5 h-5' },
    { left: '75%', delay: 3, duration: 11, size: 'w-7 h-7' },
    { left: '90%', delay: 0.5, duration: 7, size: 'w-6 h-6' },
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-emerald-950 text-white">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Lush Green Shiv Nursery in Manwal Jammu & Kashmir"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/40" />
      </div>

      {/* Floating Leaves Animation Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {floatingLeaves.map((leaf, index) => (
          <motion.div
            key={index}
            className={`absolute ${leaf.size} text-emerald-400/40`}
            style={{ left: leaf.left, top: '-10%' }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 360],
              x: [0, index % 2 === 0 ? 30 : -30, 0],
            }}
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              delay: leaf.delay,
              ease: 'linear',
            }}
          >
            <Leaf className="w-full h-full fill-emerald-400/20" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
        
        {/* Top Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/80 backdrop-blur-md border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-emerald-950/50"
        >
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Manwal, Jammu & Kashmir • Trusted Local Plant Nursery</span>
          <span className="flex h-2 w-2 relative ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight text-white max-w-5xl leading-[1.15]"
        >
          Welcome to <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400 bg-clip-text text-transparent">Shiv Nursery</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-emerald-100/90 max-w-3xl font-light leading-relaxed"
        >
          Fresh Plants <span className="text-emerald-400 font-bold">•</span> Fruit Plants <span className="text-emerald-400 font-bold">•</span> Flower Plants <span className="text-emerald-400 font-bold">•</span> Decorative Plants <span className="text-emerald-400 font-bold">•</span> Quality You Can Trust
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#plants"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 text-white font-semibold text-base shadow-xl shadow-emerald-900/50 hover:from-emerald-400 hover:to-green-500 transform hover:-translate-y-1 transition-all duration-300 group"
          >
            <span>Explore Plants</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-base transform hover:-translate-y-1 transition-all duration-300"
          >
            <Phone className="w-5 h-5 text-emerald-300" />
            <span>Contact Us</span>
          </a>
        </motion.div>

        {/* Trust Highlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl"
        >
          <div className="bg-emerald-900/40 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-4 text-center">
            <Sparkles className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-white">500+</div>
            <div className="text-xs text-emerald-200">Plant Varieties</div>
          </div>

          <div className="bg-emerald-900/40 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-4 text-center">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
            <div className="text-xs text-emerald-200">Healthy & Organic</div>
          </div>

          <div className="bg-emerald-900/40 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-4 text-center">
            <Heart className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-white">10k+</div>
            <div className="text-xs text-emerald-200">Happy Gardeners</div>
          </div>

          <div className="bg-emerald-900/40 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-4 text-center">
            <MapPin className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-white">Manwal</div>
            <div className="text-xs text-emerald-200">Jammu & Kashmir</div>
          </div>
        </motion.div>

      </div>

      {/* Curved Bottom Divider */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-emerald-50 to-transparent pointer-events-none z-20" />
    </section>
  );
};
