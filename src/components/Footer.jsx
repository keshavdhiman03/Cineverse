import React from 'react';
import { Film, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react';
import { CITIES } from '../data/cities';

export default function Footer({ onSelectCity }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 mt-20 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Multiplex Partners Strip */}
        <div className="pb-12 border-b border-slate-800/80">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Official Cinema & Technology Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
            <span className="font-black text-lg tracking-wider text-white">PVR <span className="text-rose-500">INOX</span></span>
            <span className="font-extrabold text-lg tracking-wider text-white">CINÉPOLIS</span>
            <span className="font-black text-xl tracking-widest text-sky-400">IMAX</span>
            <span className="font-bold text-lg tracking-wider text-slate-200">DOLBY ATMOS</span>
            <span className="font-extrabold text-lg tracking-wider text-amber-400">4DX</span>
            <span className="font-bold text-base tracking-wider text-slate-300">PRASADS PCX</span>
            <span className="font-bold text-base tracking-wider text-rose-400">SPI CINEMAS</span>
          </div>
        </div>

        {/* Cities Directory */}
        <div className="py-10 border-b border-slate-800/80">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            Book Movie Tickets Across Indian Metros
          </h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {CITIES.map((city) => (
              <button
                key={city.id}
                onClick={() => onSelectCity(city)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs transition-colors flex items-center gap-1.5"
              >
                <span>{city.icon}</span>
                <span>{city.name}</span>
                <span className="text-[10px] text-slate-400">({city.cinemasCount})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom branding and copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <span className="font-black text-sm text-white tracking-wider font-heading">
                CINE<span className="text-rose-500">VERSE</span>
              </span>
              <p className="text-[11px] text-slate-400">
                Next-Gen Real Cinema Ticketing Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400 text-[11px]">
            <span className="hover:text-slate-200 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">24x7 Support</span>
            <span className="hover:text-slate-200 cursor-pointer">Multiplex Partner Login</span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>Built with precision for film lovers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
