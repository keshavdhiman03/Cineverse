import React, { useState } from 'react';
import { Search, MapPin, X, Check, Navigation, Building2 } from 'lucide-react';
import { CITIES } from '../data/cities';

export default function CitySelectorModal({ isOpen, onClose, currentCity, onSelectCity }) {
  const [citySearch, setCitySearch] = useState('');
  const [locating, setLocating] = useState(false);

  if (!isOpen) return null;

  const filteredCities = CITIES.filter(c => 
    c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
    c.state.toLowerCase().includes(citySearch.toLowerCase()) ||
    c.landmark.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleAutoDetect = () => {
    setLocating(true);
    setTimeout(() => {
      // simulate realistic auto detection to Bengaluru or Delhi
      const defaultDetected = CITIES.find(c => c.id === 'bengaluru') || CITIES[0];
      onSelectCity(defaultDetected);
      setLocating(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-card w-full max-w-2xl rounded-2xl p-6 shadow-2xl border border-slate-700/80 bg-slate-900/95 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-rose-500" />
              Select Your City
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Real-time theaters, screens and showtimes curated for your city
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Auto Detect */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              placeholder="Search city (Bengaluru, Delhi, Mumbai, Gurugram...)"
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
              autoFocus
            />
          </div>
          <button
            onClick={handleAutoDetect}
            disabled={locating}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-rose-400 text-sm font-semibold transition-all hover:border-rose-500/50 flex-shrink-0"
          >
            <Navigation className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
            <span>{locating ? 'Detecting GPS...' : 'Auto Detect'}</span>
          </button>
        </div>

        {/* Popular Cities Grid */}
        <div className="mt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-rose-400" />
            Popular Metropolitan Hubs
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-1">
            {filteredCities.map((city) => {
              const isSelected = currentCity.id === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  className={`group relative text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-950/40 border-rose-500 shadow-glow-red ring-1 ring-rose-500'
                      : 'bg-slate-850 bg-slate-800/40 hover:bg-slate-800 border-slate-700/60 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {city.icon}
                    </span>
                    {isSelected && (
                      <span className="bg-rose-500 text-white rounded-full p-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors">
                      {city.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {city.landmark}
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      {city.cinemasCount} Cinemas Active
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              No cities found matching "{citySearch}".
            </div>
          )}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Active location determines theater distances & showtimes</span>
          <span className="text-rose-400 font-semibold">{CITIES.length} Major Hubs Supported</span>
        </div>
      </div>
    </div>
  );
}
