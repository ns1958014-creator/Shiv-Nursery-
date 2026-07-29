import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';

export const GoogleMapSection: React.FC = () => {
  // Encoded location search for Manwal, Jammu & Kashmir
  const mapIframeUrl = "https://maps.google.com/maps?q=Manwal%2C%20Jammu%20and%20Kashmir%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed";
  const googleMapsDirectionsUrl = "https://www.google.com/maps/search/?api=1&query=Shiv+Nursery+Manwal+Jammu+and+Kashmir";

  return (
    <section id="location" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Nursery Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-emerald-950">
            Visit <span className="text-emerald-700">Shiv Nursery</span>
          </h2>
          <p className="mt-3 text-emerald-900/70 text-base sm:text-lg">
            Located in peaceful Manwal, Jammu & Kashmir. Visit us to explore our fresh stock in person and get expert gardening advice.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative rounded-3xl overflow-hidden border border-emerald-100 shadow-xl bg-emerald-900/5">
          
          <iframe
            title="Shiv Nursery Location Map Manwal Jammu & Kashmir"
            src={mapIframeUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[400px] sm:h-[480px] grayscale-[20%] contrast-[105%]"
          />

          {/* Floating Address Overlay Card */}
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-100 shadow-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Shiv Nursery • Manwal</span>
            </div>
            
            <p className="text-xs text-emerald-900/80 leading-relaxed">
              Manwal, Jammu & Kashmir, India. Accessible via main highway route with convenient parking space for visitors.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-md"
              >
                <Navigation className="w-4 h-4 text-emerald-300" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 text-emerald-300 ml-1" />
              </a>

              <a
                href="tel:+918493029963"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <span>Call Nursery</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
