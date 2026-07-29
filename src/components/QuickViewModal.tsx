import React from 'react';
import { Plant } from '../types';
import { X, Sun, Droplets, TrendingUp, Ruler, Check, MessageSquare, ShoppingBag, Sprout } from 'lucide-react';

interface QuickViewModalProps {
  plant: Plant | null;
  onClose: () => void;
  onAddToInquiry: (plant: Plant) => void;
  isInBag: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  plant,
  onClose,
  onAddToInquiry,
  isInBag,
}) => {
  if (!plant) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Shiv Nursery, I would like to inquire about buying: ${plant.name} (₹${plant.price}).`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-emerald-100 shadow-2xl relative overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 text-emerald-950 hover:bg-white shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Plant Image */}
          <div className="relative h-64 md:h-full min-h-[280px] bg-emerald-950/20">
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-900/90 text-emerald-100 text-xs font-bold border border-emerald-700">
              {plant.category}
            </span>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs italic text-emerald-300 font-mono">{plant.botanicalName}</p>
              <h3 className="text-xl font-bold font-serif">{plant.name}</h3>
            </div>
          </div>

          {/* Details & Care Instructions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-serif font-bold text-emerald-950">₹{plant.price}</span>
                {plant.originalPrice && (
                  <span className="text-sm text-emerald-900/50 line-through">₹{plant.originalPrice}</span>
                )}
              </div>

              <p className="text-xs text-emerald-900/80 mt-3 leading-relaxed">
                {plant.description}
              </p>

              {/* Care Metrics */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-emerald-100 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50">
                  <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <div className="text-[10px] text-emerald-700 font-bold uppercase">Sunlight</div>
                    <div className="font-semibold text-emerald-950">{plant.sunlight}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50">
                  <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
                  <div>
                    <div className="text-[10px] text-emerald-700 font-bold uppercase">Water</div>
                    <div className="font-semibold text-emerald-950">{plant.waterNeeded}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50">
                  <TrendingUp className="w-4 h-4 text-green-600 shrink-0" />
                  <div>
                    <div className="text-[10px] text-emerald-700 font-bold uppercase">Growth</div>
                    <div className="font-semibold text-emerald-950">{plant.growthRate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50">
                  <Ruler className="w-4 h-4 text-indigo-500 shrink-0" />
                  <div>
                    <div className="text-[10px] text-emerald-700 font-bold uppercase">Height</div>
                    <div className="font-semibold text-emerald-950">{plant.height}</div>
                  </div>
                </div>
              </div>

              {/* Care Tips */}
              <div className="mt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nursery Care Tips</span>
                </div>
                <ul className="space-y-1.5 text-xs text-emerald-900/80">
                  {plant.careTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-emerald-100 flex items-center gap-3">
              <button
                onClick={() => onAddToInquiry(plant)}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isInBag
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-md'
                }`}
              >
                {isInBag ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>In Inquiry Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Inquiry</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/918493029963?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Buy</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
