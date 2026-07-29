import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FEATURED_PLANTS } from '../data/plantsData';
import { Plant } from '../types';
import { Compass, Sun, Home, Trees, RefreshCw, ArrowRight } from 'lucide-react';

interface PlantCareFinderProps {
  onSelectPlant: (plant: Plant) => void;
}

export const PlantCareFinder: React.FC<PlantCareFinderProps> = ({ onSelectPlant }) => {
  const [spaceType, setSpaceType] = useState<'indoor' | 'outdoor' | 'balcony' | 'any'>('any');
  const [sunlightType, setSunlightType] = useState<'full' | 'indirect' | 'low' | 'any'>('any');
  const [purpose, setPurpose] = useState<'fruit' | 'flower' | 'air' | 'any'>('any');

  const matches = FEATURED_PLANTS.filter((plant) => {
    // Space check
    if (spaceType === 'indoor' && plant.category !== 'Indoor Plants' && plant.category !== 'Shade Plants') return false;
    if (spaceType === 'outdoor' && plant.category !== 'Outdoor Plants' && plant.category !== 'Fruit Plants' && plant.category !== 'Flower Plants') return false;

    // Sunlight check
    if (sunlightType === 'full' && plant.sunlight !== 'Full Sun') return false;
    if (sunlightType === 'indirect' && plant.sunlight !== 'Indirect Bright') return false;
    if (sunlightType === 'low' && plant.sunlight !== 'Low Light') return false;

    // Purpose check
    if (purpose === 'fruit' && plant.category !== 'Fruit Plants') return false;
    if (purpose === 'flower' && plant.category !== 'Flower Plants') return false;
    if (purpose === 'air' && plant.category !== 'Indoor Plants' && plant.category !== 'Decorative Plants') return false;

    return true;
  });

  const recommended = matches.length > 0 ? matches.slice(0, 3) : FEATURED_PLANTS.slice(0, 3);

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-900 via-emerald-950 to-green-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Quiz Inputs Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Plant Recommendation Tool</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Find the <span className="text-emerald-400">Perfect Plant</span> for Your Space
            </h2>

            <p className="text-emerald-100/80 text-sm leading-relaxed">
              Not sure which plant will thrive in your home or garden in Jammu? Answer 3 quick questions to get instant personalized recommendations from Shiv Nursery.
            </p>

            {/* Question 1: Space */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
                1. Where do you plan to keep the plant?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'any', label: 'Any Space' },
                  { id: 'indoor', label: 'Indoor Room' },
                  { id: 'outdoor', label: 'Garden / Yard' },
                  { id: 'balcony', label: 'Balcony' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSpaceType(item.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all border ${
                      spaceType === item.id
                        ? 'bg-emerald-500 text-emerald-950 font-bold border-emerald-400 shadow-lg'
                        : 'bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/60 border-emerald-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Sunlight */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
                2. How much direct sunlight does the spot get?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'any', label: 'Does Not Matter' },
                  { id: 'full', label: 'Full Sun (6+ hrs)' },
                  { id: 'indirect', label: 'Bright Indirect' },
                  { id: 'low', label: 'Low / Shade' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSunlightType(item.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all border ${
                      sunlightType === item.id
                        ? 'bg-emerald-500 text-emerald-950 font-bold border-emerald-400 shadow-lg'
                        : 'bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/60 border-emerald-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Purpose */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
                3. What is your primary goal?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'any', label: 'All Goals' },
                  { id: 'fruit', label: 'Fresh Fruits' },
                  { id: 'flower', label: 'Colorful Flowers' },
                  { id: 'air', label: 'Air Purification' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPurpose(item.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all border ${
                      purpose === item.id
                        ? 'bg-emerald-500 text-emerald-950 font-bold border-emerald-400 shadow-lg'
                        : 'bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/60 border-emerald-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSpaceType('any');
                setSunlightType('any');
                setPurpose('any');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white transition-colors pt-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Quiz Criteria</span>
            </button>
          </div>

          {/* Results Recommendations Column */}
          <div className="lg:col-span-6 bg-emerald-900/40 backdrop-blur-md p-6 rounded-3xl border border-emerald-700/50">
            <h3 className="text-lg font-bold text-white font-serif mb-4 flex items-center justify-between">
              <span>Matching Plants ({recommended.length})</span>
              <span className="text-xs font-mono text-emerald-300 font-normal">Top Recommendation</span>
            </h3>

            <div className="space-y-4">
              {recommended.map((plant) => (
                <motion.div
                  key={plant.id}
                  layout
                  className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 flex items-center gap-4 hover:border-emerald-500 transition-all group cursor-pointer"
                  onClick={() => onSelectPlant(plant)}
                >
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-800 text-emerald-200">
                        {plant.category}
                      </span>
                      <span className="text-xs text-emerald-400 font-mono font-bold">₹{plant.price}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate mt-1">
                      {plant.name}
                    </h4>
                    <p className="text-xs text-emerald-200/70 truncate mt-0.5">
                      {plant.bestFor}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-800/80 group-hover:bg-emerald-500 group-hover:text-emerald-950 text-emerald-200 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
