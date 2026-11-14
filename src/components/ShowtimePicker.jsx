import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  Sparkles, 
  Coffee, 
  Car, 
  Armchair, 
  ShieldCheck,
  Info
} from 'lucide-react';
import { THEATERS_BY_CITY } from '../data/theaters';

export default function ShowtimePicker({ 
  movie, 
  currentCity, 
  onBack, 
  onSelectShowtime 
}) {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [timeFilter, setTimeFilter] = useState('All'); // 'All', 'Morning', 'Afternoon', 'Evening', 'Night'

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      fullDateStr: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
    };
  });

  const cityTheaters = THEATERS_BY_CITY[currentCity.id] || THEATERS_BY_CITY['bengaluru'];

  // Base showtimes generator
  const getTheaterShows = (theater, movie) => {
    const defaultShows = [
      { time: '10:00 AM', period: 'Morning', format: theater.formats[0] || '2D', status: 'available', price: movie.pricingBase },
      { time: '01:30 PM', period: 'Afternoon', format: theater.formats[1] || theater.formats[0] || 'IMAX 2D', status: 'filling', price: movie.pricingBase + 40 },
      { time: '04:45 PM', period: 'Evening', format: theater.formats[0] || 'IMAX 3D', status: 'available', price: movie.pricingBase + 60 },
      { time: '07:30 PM', period: 'Evening', format: theater.formats[1] || 'Dolby Atmos', status: 'almost-full', price: movie.pricingBase + 80 },
      { time: '10:45 PM', period: 'Night', format: '2D Dolby Atmos', status: 'available', price: movie.pricingBase + 20 }
    ];

    if (timeFilter === 'All') return defaultShows;
    return defaultShows.filter(s => s.period.toLowerCase() === timeFilter.toLowerCase());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Back to Movies Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Movies</span>
        </button>

        <div className="text-right">
          <span className="text-xs text-slate-400">Showing for</span>
          <p className="text-sm font-bold text-rose-400 flex items-center gap-1 justify-end">
            <MapPin className="w-3.5 h-3.5" />
            {currentCity.name}
          </p>
        </div>
      </div>

      {/* Selected Movie Summary Strip */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-14 h-20 object-cover rounded-lg border border-slate-700 shadow-md flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {movie.certificate}
              </span>
              <span className="text-xs text-amber-400 font-bold">★ {movie.rating}</span>
            </div>
            <h2 className="text-xl font-bold font-heading text-white">{movie.title}</h2>
            <p className="text-xs text-slate-400">
              {movie.languages.join(', ')} • {movie.genres.join(', ')} • {movie.duration}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 w-full sm:w-auto justify-end">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Available
          </span>
          <span className="inline-flex items-center gap-1 text-amber-400 font-medium ml-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Filling Fast
          </span>
          <span className="inline-flex items-center gap-1 text-rose-400 font-medium ml-2">
            <span className="w-2 h-2 rounded-full bg-rose-400" /> Almost Full
          </span>
        </div>
      </div>

      {/* Date Carousel */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-rose-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Select Date:
          </h3>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {dates.map((d, idx) => {
            const isSelected = selectedDateIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDateIndex(idx)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-20 py-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-rose-600 border-rose-500 text-white shadow-glow-red scale-105'
                    : 'bg-slate-850 bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className={`text-[11px] uppercase font-bold tracking-wider ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                  {d.dayName}
                </span>
                <span className="text-xl font-extrabold font-heading mt-0.5">
                  {d.dateNum}
                </span>
                <span className={`text-[10px] ${isSelected ? 'text-rose-200' : 'text-slate-500'}`}>
                  {d.month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time of Day Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
        <span className="text-slate-400 font-semibold mr-1">Time:</span>
        {['All', 'Morning', 'Afternoon', 'Evening', 'Night'].map((period) => (
          <button
            key={period}
            onClick={() => setTimeFilter(period)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              timeFilter === period
                ? 'bg-slate-200 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {period} {period !== 'All' ? '(Showtimes)' : ''}
          </button>
        ))}
      </div>

      {/* Theaters List */}
      <div className="space-y-5">
        {cityTheaters.map((theater) => {
          const shows = getTheaterShows(theater, movie);
          return (
            <div
              key={theater.id}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                
                {/* Theater Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                      {theater.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-rose-500 flex-shrink-0" />
                    <span>{theater.area}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-semibold">{theater.distance}</span>
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {theater.amenities.map((am) => (
                      <span
                        key={am}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {am}
                      </span>
                    ))}
                    <span className="text-[10px] text-emerald-400 font-medium self-center flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Cancellation Available
                    </span>
                  </div>
                </div>

              </div>

              {/* Showtimes Grid */}
              <div className="pt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Available Showtimes:
                </span>

                <div className="flex flex-wrap gap-3">
                  {shows.map((show, sIdx) => {
                    const statusColor = 
                      show.status === 'available' ? 'border-emerald-500/50 hover:border-emerald-400 text-emerald-300' :
                      show.status === 'filling' ? 'border-amber-500/50 hover:border-amber-400 text-amber-300' :
                      'border-rose-500/50 hover:border-rose-400 text-rose-300';

                    return (
                      <button
                        key={sIdx}
                        onClick={() => onSelectShowtime({
                          movie,
                          theater,
                          date: dates[selectedDateIndex],
                          time: show.time,
                          format: show.format,
                          basePrice: show.price
                        })}
                        className={`group relative px-4 py-2.5 rounded-xl bg-slate-850 bg-slate-900/90 border ${statusColor} hover:bg-slate-800 transition-all text-left flex flex-col justify-center min-w-[125px]`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                            {show.time}
                          </span>
                          <span className="text-[10px] px-1 rounded bg-slate-800 text-slate-300 font-medium">
                            {show.format}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                          <span>₹{show.price}</span>
                          <span className="capitalize text-[10px] opacity-80">{show.status.replace('-', ' ')}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
