import React from 'react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_ITEMS } from '../data/plantsData';
import { Sprout, Tag, Grid, UserCheck, ShieldCheck, HeartHandshake, Sparkles, Award } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return <Sprout className="w-7 h-7 text-emerald-600" />;
      case 'Tag':
        return <Tag className="w-7 h-7 text-emerald-600" />;
      case 'Grid':
        return <Grid className="w-7 h-7 text-emerald-600" />;
      case 'UserCheck':
        return <UserCheck className="w-7 h-7 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-emerald-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-7 h-7 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-emerald-600" />;
      case 'Award':
      default:
        return <Award className="w-7 h-7 text-emerald-600" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Our Commitment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-emerald-950">
            Why Choose <span className="text-emerald-700">Shiv Nursery</span>
          </h2>
          <p className="mt-4 text-emerald-900/70 text-base sm:text-lg">
            We take pride in nurturing healthier, stronger plants that flourish in Jammu & Kashmir's climate with unmatched value and care.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100/80 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-200/60 shadow-md flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <div className="group-hover:text-white transition-colors">
                  {getIcon(item.iconName)}
                </div>
              </div>

              <h3 className="text-lg font-bold font-serif text-emerald-950 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                <span className="text-emerald-600">✔</span>
                <span>{item.title}</span>
              </h3>

              <p className="mt-2 text-xs text-emerald-900/70 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
