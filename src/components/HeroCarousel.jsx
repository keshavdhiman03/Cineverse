import React, { useState, useEffect } from 'react';
import { Play, Ticket, Star, ChevronLeft, ChevronRight, Sparkles, Clock, Volume2 } from 'lucide-react';

export default function HeroCarousel({ movies, onSelectMovie, onWatchTrailer }) {
  const featuredMovies = movies.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  const currentMovie = featuredMovies[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  if (!currentMovie) return null;

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden bg-slate-950">
      {/* Background Backdrop with Gradient Overlays */}
      {featuredMovies.map((movie, idx) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          {/* Gradient Masks */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080b11] via-[#080b11]/85 to-transparent w-full md:w-3/4" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-left space-y-4">
          
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-glow-red flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {currentMovie.badge || 'Trending Now'}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-800/90 text-amber-400 border border-slate-700 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {currentMovie.rating} / 10 ({currentMovie.votes})
            </span>
            <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700">
              {currentMovie.certificate}
            </span>
            <span className="px-2 py-0.5 rounded-md text-xs text-slate-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {currentMovie.duration}
            </span>
          </div>

          {/* Movie Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-none drop-shadow-md">
            {currentMovie.title}
          </h1>

          {/* Tagline / Subtitle */}
          <p className="text-rose-400 font-medium text-sm sm:text-base italic">
            "{currentMovie.tagline}"
          </p>

          {/* Synopsis */}
          <p className="text-slate-300 text-sm sm:text-base line-clamp-3 max-w-xl leading-relaxed">
            {currentMovie.synopsis}
          </p>

          {/* Formats and Languages */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">Formats:</span>
            {currentMovie.formats.map((fmt) => (
              <span key={fmt} className="px-2 py-0.5 bg-slate-800/90 border border-slate-700 text-slate-200 rounded font-semibold text-[11px]">
                {fmt}
              </span>
            ))}
            <span className="text-slate-500 mx-1">|</span>
            <span className="text-slate-400">{currentMovie.languages.join(', ')}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => onSelectMovie(currentMovie)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-glow-red hover:scale-105 active:scale-95 transition-all"
            >
              <Ticket className="w-5 h-5" />
              <span>Book Tickets</span>
            </button>

            <button
              onClick={() => onWatchTrailer(currentMovie)}
              className="px-5 py-3.5 rounded-xl bg-slate-850/80 hover:bg-slate-700/80 border border-slate-600/70 text-slate-100 font-semibold text-sm sm:text-base flex items-center gap-2.5 backdrop-blur-md transition-all hover:border-slate-400"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Trailer</span>
            </button>
          </div>

        </div>
      </div>

      {/* Nav Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white border border-slate-700/50 backdrop-blur-sm transition-all hover:scale-110 hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white border border-slate-700/50 backdrop-blur-sm transition-all hover:scale-110 hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 right-6 z-20 flex items-center gap-2 bg-slate-900/70 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-md">
        {featuredMovies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? 'w-6 bg-rose-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
