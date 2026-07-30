import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plant, CategoryType } from '../types';
import { FEATURED_PLANTS } from '../data/plantsData';
import { Search, Sun, Droplets, ShoppingBag, Eye, MessageSquare, Check, Sparkles, Filter } from 'lucide-react';

interface FeaturedPlantsSectionProps {
  selectedCategoryFilter: string;
  onSelectCategoryFilter: (category: string) => void;
  onQuickView: (plant: Plant) => void;
  onAddToInquiry: (plant: Plant) => void;
  isInBag: (plantId: string) => boolean;
}

export const FeaturedPlantsSection: React.FC<FeaturedPlantsSectionProps> = ({
  selectedCategoryFilter,
  onSelectCategoryFilter,
  onQuickView,
  onAddToInquiry,
  isInBag,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');

  const categories: (CategoryType | 'All')[] = [
    'All',
    'Fruit Plants',
    'Flower Plants',
    'Decorative Plants',
    'Indoor Plants',
    'Outdoor Plants',
    'Shade Plants',
    'Garden Accessories',
  ];

  // Filter logic
  const filteredPlants = FEATURED_PLANTS.filter((plant) => {
    const matchesCategory =
      selectedCategoryFilter === 'All' || plant.category === selectedCategoryFilter;
    const matchesSearch =
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort logic
  const sortedPlants = [...filteredPlants].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  return (
    <section id="plants" className="py-20 bg-emerald-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Nursery Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-emerald-950">
            Featured <span className="text-emerald-700">Plants & Trees</span>
          </h2>
          <p className="mt-3 text-emerald-900/70 text-base sm:text-lg">
            Directly from our nursery in Manwal, Jammu & Kashmir. High-yielding fruit saplings, flowering shrubs, and air-purifying indoor plants.
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Mango, Rose, Areca Palm..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-50/60 text-emerald-950 text-sm placeholder-emerald-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-emerald-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-600 hover:text-emerald-900"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold shrink-0">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span>Sort By:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-950 text-xs font-semibold border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="featured">Popularity & Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Plant Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-105'
                    : 'bg-white text-emerald-900/80 hover:bg-emerald-100/60 border border-emerald-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Plants Grid */}
        {sortedPlants.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-emerald-100 p-8">
            <p className="text-lg font-semibold text-emerald-900">No plants match your search or category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategoryFilter('All');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {sortedPlants.map((plant) => {
                const added = isInBag(plant.id);
                const whatsappMessage = encodeURIComponent(
                  `Hello Shiv Nursery, I am interested in purchasing: ${plant.name} (₹${plant.price}). Please share availability and details.`
                );

                return (
                  <motion.div
                    key={plant.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Header with Badges */}
                      <div className="relative h-64 overflow-hidden bg-emerald-900/10">
                        <img
                          src={plant.imageUrl}
                          alt={plant.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Top Category Badge */}
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-200 text-[11px] font-bold border border-emerald-700/50">
                          {plant.category}
                        </span>

                        {plant.isPopular && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-md uppercase tracking-wider">
                            Popular
                          </span>
                        )}

                        {/* Quick View Button */}
                        <button
                          onClick={() => onQuickView(plant)}
                          className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-md text-emerald-900 hover:bg-white transition-colors shadow-md text-xs font-semibold flex items-center gap-1.5"
                          title="Quick View Plant Details"
                        >
                          <Eye className="w-4 h-4 text-emerald-700" />
                          <span>Care Info</span>
                        </button>
                      </div>

                      {/* Plant Information */}
                      <div className="p-6">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-2xl font-bold font-serif text-emerald-950">
                            ₹{plant.price}
                          </span>
                          {plant.originalPrice && (
                            <span className="text-xs text-emerald-900/50 line-through">
                              ₹{plant.originalPrice}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-emerald-950 mt-1 font-serif group-hover:text-emerald-700 transition-colors">
                          {plant.name}
                        </h3>

                        <p className="text-xs italic text-emerald-700/80 font-mono mt-0.5">
                          {plant.botanicalName}
                        </p>

                        <p className="text-xs text-emerald-900/70 mt-3 line-clamp-2 leading-relaxed">
                          {plant.description}
                        </p>

                        {/* Care Quick Indicators */}
                        <div className="mt-4 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900/80">
                          <div className="flex items-center gap-1.5" title={`Sunlight: ${plant.sunlight}`}>
                            <Sun className="w-4 h-4 text-amber-500" />
                            <span className="font-medium">{plant.sunlight}</span>
                          </div>
                          <div className="flex items-center gap-1.5" title={`Water: ${plant.waterNeeded}`}>
                            <Droplets className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{plant.waterNeeded} Water</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="px-6 pb-6 pt-2 flex items-center gap-2">
                      <button
                        onClick={() => onAddToInquiry(plant)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          added
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-md shadow-emerald-900/20'
                        }`}
                      >
                        {added ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-700" />
                            <span>In Cart</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/918493029963?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-colors flex items-center gap-1"
                        title="Contact on WhatsApp to Buy"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span className="hidden sm:inline">Buy</span>
                      </a>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
