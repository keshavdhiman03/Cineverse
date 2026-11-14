import React from 'react';
import { Star, Play, Ticket, Clock, Info } from 'lucide-react';

export default function MovieCard({ movie, onSelectMovie, onWatchTrailer, onOpenDetails }) {
  return (
    <div className="group glass-card rounded-2xl overflow-hidden border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-rose-950/20 hover:-translate-y-1">
      
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          {movie.badge && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-rose-600 text-white shadow-md">
              {movie.badge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700 ml-auto">
            {movie.certificate}
          </span>
        </div>

        {/* Bottom Poster Stats Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
          <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/80 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{movie.rating}</span>
            <span className="text-[10px] text-slate-400 font-normal">({movie.votes})</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-700/80 text-slate-300 text-[11px]">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{movie.duration}</span>
          </div>
        </div>

        {/* Play Trailer Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWatchTrailer(movie);
          }}
          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-glow-red"
          title="Play Trailer"
        >
          <Play className="w-5 h-5 fill-white ml-0.5" />
        </button>
      </div>

      {/* Info Container */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Formats Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {movie.formats.slice(0, 3).map((fmt) => (
              <span
                key={fmt}
                className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/80"
              >
                {fmt}
              </span>
            ))}
            {movie.formats.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{movie.formats.length - 3}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetails(movie)}
            className="font-bold text-base text-white group-hover:text-rose-400 transition-colors line-clamp-1 font-heading cursor-pointer"
          >
            {movie.title}
          </h3>

          {/* Languages & Genres */}
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">
            {movie.languages.join(', ')}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            {movie.genres.join(' • ')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => onSelectMovie(movie)}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/40 hover:shadow-glow-red transition-all"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Book Show</span>
          </button>

          <button
            onClick={() => onOpenDetails(movie)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Movie Overview & Cast"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
