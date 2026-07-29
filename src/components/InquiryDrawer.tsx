import React from 'react';
import { InquiryItem } from '../types';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  onUpdateQuantity: (plantId: string, delta: number) => void;
  onRemoveItem: (plantId: string) => void;
  onClearAll: () => void;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const totalPrice = items.reduce((acc, item) => acc + item.plant.price * item.quantity, 0);

  const handleSendWhatsAppInquiry = () => {
    if (items.length === 0) return;

    const listText = items
      .map((item) => `• ${item.plant.name} (Qty: ${item.quantity}) - ₹${item.plant.price * item.quantity}`)
      .join('\n');

    const text = encodeURIComponent(
      `Hello Shiv Nursery! I want to inquire about purchasing the following plants:\n\n${listText}\n\nTotal Estimated: ₹${totalPrice}\n\nPlease confirm availability and delivery to my location.`
    );

    window.open(`https://wa.me/918493029963?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-lg font-bold font-serif">Plant Inquiry Bag</h3>
              <p className="text-xs text-emerald-300">{items.length} plant types selected</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-emerald-900/60 space-y-3">
              <ShoppingBag className="w-12 h-12 text-emerald-300 mx-auto" />
              <p className="text-base font-semibold text-emerald-950">Your inquiry bag is empty.</p>
              <p className="text-xs text-emerald-800/70 max-w-xs mx-auto">
                Explore our catalog and click "Add to Inquiry" on Mango, Rose, Areca Palm, or Lemon plants to request quotes.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.plant.id}
                className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-4"
              >
                <img
                  src={item.plant.imageUrl}
                  alt={item.plant.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-emerald-950 truncate">{item.plant.name}</h4>
                  <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                    ₹{item.plant.price} each
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.plant.id, -1)}
                      className="p-1 rounded bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-emerald-950 px-2">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.plant.id, 1)}
                      className="p-1 rounded bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.plant.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Remove from inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-emerald-100 space-y-4">
            <div className="flex items-center justify-between text-emerald-950">
              <span className="text-sm font-semibold">Estimated Total Value:</span>
              <span className="text-xl font-serif font-bold text-emerald-800">₹{totalPrice}</span>
            </div>

            <button
              onClick={handleSendWhatsAppInquiry}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Send Bag Inquiry on WhatsApp</span>
            </button>

            <button
              onClick={onClearAll}
              className="w-full text-center text-xs text-emerald-700 hover:text-emerald-950 transition-colors"
            >
              Clear Inquiry Bag
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
