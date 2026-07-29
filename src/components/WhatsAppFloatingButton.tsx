import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/918493029963?text=Hello%20Shiv%20Nursery%2C%20I%20want%20to%20inquire%20about%20plants.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-600 text-white shadow-2xl hover:bg-emerald-500 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      title="Chat with Shiv Nursery on WhatsApp"
      aria-label="WhatsApp Chat"
    >
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
      </span>

      <MessageSquare className="w-6 h-6 fill-white" />

      {/* Tooltip on hover */}
      <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-emerald-950 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
};
