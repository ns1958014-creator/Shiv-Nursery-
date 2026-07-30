import React, { useState } from 'react';
import { Plant } from '../types';
import { X, Sun, Droplets, TrendingUp, Ruler, Check, MessageSquare, ShoppingBag, Sprout, Code, Copy, Eye } from 'lucide-react';

interface QuickViewModalProps {
  plant: Plant | null;
  onClose: () => void;
  onAddToInquiry: (plant: Plant) => void;
  isInBag: boolean;
  onBuyNow?: (plant: Plant) => void;
  onOpenCodeReader?: (plant: Plant) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  plant,
  onClose,
  onAddToInquiry,
  isInBag,
  onBuyNow,
  onOpenCodeReader,
}) => {
  const [activeImage, setActiveImage] = React.useState<string | null>(null);
  const [isReadingCodeMode, setIsReadingCodeMode] = useState(false);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (plant) {
      setActiveImage(plant.imageUrl);
    }
  }, [plant]);

  if (!plant) return null;

  const currentImg = activeImage || plant.imageUrl;
  const allImages = plant.additionalImages
    ? [plant.imageUrl, ...plant.additionalImages]
    : [plant.imageUrl];

  const whatsappMessage = encodeURIComponent(
    `Hello Shiv Nursery, I would like to inquire about buying: ${plant.name} (₹${plant.price}).`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-emerald-100 shadow-2xl relative overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => setIsReadingCodeMode(!isReadingCodeMode)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-md ${
              isReadingCodeMode
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                : 'bg-white/90 text-emerald-950 hover:bg-white border border-emerald-200'
            }`}
          >
            {isReadingCodeMode ? (
              <>
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>Visual View</span>
              </>
            ) : (
              <>
                <Code className="w-3.5 h-3.5 text-emerald-600" />
                <span>Reading Mode (Code)</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/90 text-emerald-950 hover:bg-white shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* READING CODE MODE VIEW */}
        {isReadingCodeMode ? (
          <div className="p-6 sm:p-8 bg-slate-950 text-emerald-300 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm text-emerald-400 font-sans">Botanical Data Object</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                  {plant.id}.json
                </span>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(plant, null, 2));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 font-sans text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-900 rounded-2xl overflow-x-auto text-emerald-300 max-h-96 leading-relaxed border border-slate-800">
              {JSON.stringify(plant, null, 2)}
            </pre>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 font-sans text-xs text-slate-400">
              <span>Shiv Nursery J&K • Structured Plant Schema</span>
              <button
                onClick={() => setIsReadingCodeMode(false)}
                className="text-emerald-400 font-bold hover:underline"
              >
                Back to Visual Plant Details
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Plant Image & Gallery Thumbnails */}
          <div className="relative h-72 md:h-full min-h-[300px] bg-emerald-950/20 flex flex-col justify-between">
            <div className="relative w-full h-full min-h-[240px] flex-1 overflow-hidden">
              <img
                src={currentImg}
                alt={plant.name}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent pointer-events-none" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-900/90 text-emerald-100 text-xs font-bold border border-emerald-700">
                {plant.category}
              </span>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-xs italic text-emerald-300 font-mono">{plant.botanicalName}</p>
                <h3 className="text-xl font-bold font-serif">{plant.name}</h3>
              </div>
            </div>

            {/* Thumbnail Row if additional images exist */}
            {allImages.length > 1 && (
              <div className="p-3 bg-emerald-950/90 border-t border-emerald-800 flex items-center gap-2 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      currentImg === img
                        ? 'border-emerald-400 scale-105 shadow-md ring-2 ring-emerald-400/50'
                        : 'border-emerald-800/60 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${plant.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
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
            <div className="pt-4 border-t border-emerald-100 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={() => onAddToInquiry(plant)}
                className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isInBag
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-md'
                }`}
              >
                {isInBag ? (
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

              {onBuyNow && (
                <button
                  onClick={() => {
                    if (!isInBag) onAddToInquiry(plant);
                    onClose();
                    onBuyNow(plant);
                  }}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-100" />
                  <span>Buy Now & Pay</span>
                </button>
              )}
            </div>

          </div>
        </div>
        )}

      </div>
    </div>
  );
};
