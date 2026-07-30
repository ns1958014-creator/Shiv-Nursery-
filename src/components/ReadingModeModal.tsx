import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Code,
  Copy,
  Check,
  FileCode,
  Terminal,
  BookOpen,
  Sparkles,
  Braces,
  Cpu,
  Layers,
} from 'lucide-react';
import { Plant, Order } from '../types';

interface ReadingModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlant?: Plant | null;
  recentOrder?: Order | null;
}

export const ReadingModeModal: React.FC<ReadingModeModalProps> = ({
  isOpen,
  onClose,
  selectedPlant,
  recentOrder,
}) => {
  const [activeTab, setActiveTab] = useState<'plant' | 'types' | 'order' | 'api'>('plant');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const plantCode = selectedPlant
    ? JSON.stringify(selectedPlant, null, 2)
    : JSON.stringify(
        {
          id: 'plant-101',
          name: 'Alphonso Mango Tree (Hapus Sapling)',
          botanicalName: 'Mangifera indica "Alphonso"',
          category: 'Fruit Trees',
          price: 499,
          sunlight: 'Full Sun (6-8 hours daily)',
          waterNeeded: 'Moderate watering',
          growthRate: 'Fast Growth Rate',
          height: '15-20 feet mature height',
          careTips: [
            'Plant in well-drained loamy soil with rich organic compost.',
            'Water deeply twice weekly during summer growth months.',
            'Prune lateral branches yearly after monsoon to encourage canopy density.',
          ],
        },
        null,
        2
      );

  const typesCode = `export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  category: string;
  price: number;
  originalPrice?: number;
  sunlight: string;
  waterNeeded: string;
  growthRate: string;
  height: string;
  description: string;
  careTips: string[];
  imageUrl: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: Array<{ plantId: string; plantName: string; price: number; quantity: number }>;
  shippingAddress: { fullName: string; phone: string; address: string; city: string };
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  totalAmount: number;
  status: 'confirmed' | 'packing' | 'dispatched' | 'delivered';
}`;

  const orderCode = recentOrder
    ? JSON.stringify(recentOrder, null, 2)
    : JSON.stringify(
        {
          orderId: 'SN-2026-8812',
          nurseryLocation: 'Shiv Nursery, Manwal, J&K',
          status: 'confirmed',
          paymentMethod: 'upi',
          transactionRef: 'UPI-8493029963-SUCCESS',
          totalAmount: 998,
          currency: 'INR',
          items: [
            { plant: 'Alphonso Mango Sapling', qty: 1, price: 499 },
            { plant: 'Kashmiri Red Rose Bush', qty: 1, price: 299 },
          ],
        },
        null,
        2
      );

  const apiCode = `// Shiv Nursery API Endpoint Logic
export async function processPlantCheckout(req: Request) {
  const { cartItems, shippingDetails, paymentMethod } = await req.json();
  
  // Calculate total with J&K nursery discount
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 999 ? 0 : 99;
  const grandTotal = subtotal + deliveryFee;

  return Response.json({
    success: true,
    orderId: \`SN-\${Date.now()}\`,
    amountPaid: grandTotal,
    dispatchStatus: 'Queued for Manwal Nursery Dispatch',
  });
}`;

  const currentCode =
    activeTab === 'plant'
      ? plantCode
      : activeTab === 'types'
      ? typesCode
      : activeTab === 'order'
      ? orderCode
      : apiCode;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-slate-950 p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-mono text-emerald-400">Reading Mode</h3>
                <span className="text-[10px] font-sans font-bold bg-emerald-900/80 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700 uppercase tracking-widest">
                  Source Code Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Viewing botanical JSON schema, TypeScript interfaces, and order backend code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code Tabs */}
        <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-2 flex items-center justify-between overflow-x-auto shrink-0 text-xs font-mono">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('plant')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'plant'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Braces className="w-3.5 h-3.5" />
              <span>Plant_Object.json</span>
            </button>

            <button
              onClick={() => setActiveTab('types')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'types'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>types.ts</span>
            </button>

            <button
              onClick={() => setActiveTab('order')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'order'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Order_Invoice.json</span>
            </button>

            <button
              onClick={() => setActiveTab('api')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'api'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Checkout_API.ts</span>
            </button>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-sans font-bold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Content Container */}
        <div className="flex-1 overflow-y-auto p-5 font-mono text-xs leading-relaxed bg-slate-950 text-emerald-300 selection:bg-emerald-900 selection:text-white">
          <pre className="whitespace-pre-wrap break-words">{currentCode}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 flex items-center justify-between text-xs text-slate-400 font-sans">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Reading Mode Enabled • Pure Botanical & Code Representation</span>
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold"
          >
            Close Reader
          </button>
        </div>
      </motion.div>
    </div>
  );
};
