import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MapPin, Phone, Award, Sprout, Sun } from 'lucide-react';
import { NURSERY_OVERVIEW_IMAGE } from '../data/plantsData';

export const AboutSection: React.FC = () => {
  const features = [
    'Healthy, pest-free nursery stock grown in nutrient-dense soil',
    'Grafted fruit plants for fast fruiting (Mango, Guava, Lemon, Apple)',
    'Aromatic flowering plants, indoor greens, and shade foliage',
    'Affordable nursery-direct prices with zero middleman charges',
    'Personalized horticultural guidance for soil and pot selection',
    'Serving homeowners, farmers, and commercial landscapers across J&K',
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-emerald-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image & Badges Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10 border-4 border-white">
              <img
                src={NURSERY_OVERVIEW_IMAGE}
                alt="Shiv Nursery grounds in Manwal, Jammu & Kashmir"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-100 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">Quality Guarantee</p>
                    <p className="text-sm font-bold text-emerald-950">100% Organically Nursed Saplings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Badge */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-900 text-emerald-100 text-xs font-semibold shadow-xl border border-emerald-700">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>Manwal's Premier Plant Nursery</span>
            </div>
          </motion.div>

          {/* Text Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <Sun className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cultivating Nature Since Day One</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-emerald-950 leading-tight">
              About <span className="text-emerald-700">Shiv Nursery</span>
            </h2>

            <p className="text-base sm:text-lg text-emerald-900/80 font-normal leading-relaxed">
              Shiv Nursery is dedicated to providing healthy, high-quality plants for homes, gardens, farms, and landscaping projects. We offer a wide variety of fruit plants, flowering plants, ornamental plants, indoor plants, and outdoor plants at affordable prices with excellent customer service.
            </p>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-emerald-900 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Address & Quick CTA */}
            <div className="pt-6 border-t border-emerald-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-emerald-600 font-semibold uppercase">Location</div>
                  <div className="text-sm font-bold text-emerald-950">Manwal, Jammu & Kashmir</div>
                </div>
              </div>

              <a
                href="tel:+918493029963"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white text-sm font-semibold hover:bg-emerald-900 transition-colors shadow-md shadow-emerald-900/20"
              >
                <Phone className="w-4 h-4" />
                <span>+91 8493029963</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
