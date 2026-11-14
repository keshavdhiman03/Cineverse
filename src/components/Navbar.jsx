import React from 'react';
import { 
  Film, 
  MapPin, 
  Search, 
  Ticket, 
  ChevronDown, 
  Sparkles,
  Clapperboard,
  Flame,
  Rewind
} from 'lucide-react';

export default function Navbar({ 
  currentCity, 
  onOpenCityModal, 
  searchQuery, 
  setSearchQuery, 
  onOpenMyBookings, 
  bookingsCount,
  activeTab,
  setActiveTab
}) {
  return (
    <header className="sticky top-0 z-40 glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => { setActiveTab('movies'); setSearchQuery(''); }}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center shadow-glow-red group-hover:scale-105 transition-transform">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-rose-400 font-heading">
                CINE<span className="text-rose-500">VERSE</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">
                2026 Megahits & Timeless Classics
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Ramayana, Sholay, War 2, Godfather, IMAX..."
                className="w-full bg-slate-900/80 border border-slate-700/70 rounded-full pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded-full bg-slate-800"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links & Actions */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            
            {/* City Selector Button */}
            <button
              onClick={onOpenCityModal}
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-sm font-medium transition-all group hover:border-rose-500/50 shadow-sm"
              title="Change City"
            >
              <span className="text-base">{currentCity.icon}</span>
              <div className="text-left hidden sm:block">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block -mb-0.5 font-semibold">City</span>
                <span className="font-semibold text-rose-400 group-hover:text-rose-300 flex items-center gap-1">
                  {currentCity.name}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400 transition-transform group-hover:translate-y-0.5" />
                </span>
              </div>
            </button>

            {/* My Bookings Trigger */}
            <button
              onClick={onOpenMyBookings}
              className="relative flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-glow-red hover:scale-102 active:scale-98"
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">My Bookings</span>
              {bookingsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 animate-pulse">
                  {bookingsCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Ramayana, Sholay, War 2, Godfather..."
              className="w-full bg-slate-900/90 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Secondary Category Subnav */}
        <div className="flex items-center gap-5 overflow-x-auto py-2.5 border-t border-slate-800/80 text-xs sm:text-sm font-medium no-scrollbar">
          <button
            onClick={() => setActiveTab('movies')}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'movies'
                ? 'border-rose-500 text-rose-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clapperboard className="w-3.5 h-3.5" />
            All Movies
          </button>

          <button
            onClick={() => setActiveTab('2026-latest')}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === '2026-latest'
                ? 'border-amber-500 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-amber-300'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            2026 Megahits (Ramayana & Latest)
          </button>

          <button
            onClick={() => setActiveTab('vintage-classic')}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'vintage-classic'
                ? 'border-sky-500 text-sky-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-sky-300'
            }`}
          >
            <Rewind className="w-4 h-4 text-sky-400" />
            Timeless & Very Old Classics (Sholay, DDLJ, Godfather)
          </button>

          <button
            onClick={() => setActiveTab('imax')}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'imax'
                ? 'border-rose-500 text-rose-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            IMAX Laser & 70mm
          </button>

          <button
            onClick={() => setActiveTab('cinemas')}
            className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'cinemas'
                ? 'border-rose-500 text-rose-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Theaters in {currentCity.name}
          </button>
        </div>

      </div>
    </header>
  );
}
