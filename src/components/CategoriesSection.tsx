import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data/plantsData';
import { CategoryType } from '../types';
import { ArrowUpRight, Apple, Flower2, Sparkles, Home, Trees, Sun, CloudRain, Wrench } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (categoryTitle: CategoryType) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'fruit-plants':
        return <Apple className="w-6 h-6 text-emerald-600" />;
      case 'flower-plants':
        return <Flower2 className="w-6 h-6 text-pink-600" />;
      case 'decorative-plants':
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'indoor-plants':
        return <Home className="w-6 h-6 text-teal-600" />;
      case 'outdoor-plants':
        return <Trees className="w-6 h-6 text-green-600" />;
      case 'seasonal-plants':
        return <Sun className="w-6 h-6 text-orange-500" />;
      case 'shade-plants':
        return <CloudRain className="w-6 h-6 text-indigo-500" />;
      default:
        return <Wrench className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section id="categories" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Explore By Variety</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-emerald-950">
            Plant <span className="text-emerald-700">Categories</span>
          </h2>
          <p className="mt-4 text-emerald-900/70 text-base sm:text-lg">
            Browse our carefully nurtured collections of fruit saplings, exotic flowers, ornamental foliage, and essential gardening supplies.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => onSelectCategory(category.title)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-emerald-100/80 shadow-md hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-900 text-[11px] font-bold shadow-sm">
                    {category.badge}
                  </span>

                  {/* Icon & Count */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
                      {getCategoryIcon(category.id)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-900/80 backdrop-blur-md text-emerald-100">
                      {category.count}+ Varieties
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold font-serif text-emerald-950 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
                    <span>{category.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-emerald-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="mt-2 text-xs text-emerald-900/70 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="px-5 pb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">
                  View Plants in {category.title} →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
