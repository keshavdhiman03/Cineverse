import React from 'react';
import { X, Star, Clock, Calendar, Play, Ticket, User, Award, Film } from 'lucide-react';

export default function MovieDetailsModal({ movie, onClose, onSelectMovie, onWatchTrailer }) {
  if (!movie) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="glass-card w-full max-w-3xl rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop Banner */}
        <div className="relative h-60 sm:h-72 w-full bg-slate-950">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-black/40" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Watch Trailer button on backdrop */}
          <button
            onClick={() => onWatchTrailer(movie)}
            className="absolute bottom-4 right-4 z-20 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white text-xs font-semibold flex items-center gap-2 backdrop-blur-md"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Watch Trailer</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 -mt-20 relative z-10">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            
            {/* Poster Thumbnail */}
            <div className="w-32 sm:w-40 aspect-[2/3] rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl flex-shrink-0 bg-slate-800">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-600 text-white">
                  {movie.badge}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {movie.certificate}
                </span>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{movie.rating}/10</span>
                  <span className="text-slate-400 font-normal">({movie.votes})</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                {movie.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400">
                {movie.genres.join(', ')} • {movie.duration} • Released {movie.releaseDate}
              </p>

              {/* Formats and Languages */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {movie.formats.map((fmt) => (
                  <span
                    key={fmt}
                    className="text-xs font-semibold px-2 py-0.5 bg-slate-800/80 text-rose-300 border border-rose-900/40 rounded"
                  >
                    {fmt}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={() => {
                    onClose();
                    onSelectMovie(movie);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow-red"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Select Theaters & Showtimes</span>
                </button>
              </div>
            </div>

          </div>

          {/* Synopsis */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2">
              Synopsis
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {movie.synopsis}
            </p>
          </div>

          {/* Director & Cast */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="mb-4">
              <span className="text-xs text-slate-400 font-medium">Directed by: </span>
              <span className="text-sm font-bold text-white ml-1">{movie.director}</span>
            </div>

            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-rose-400" />
              Featured Star Cast
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {movie.cast.map((actor, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/50 border border-slate-700/60"
                >
                  <img
                    src={actor.avatar}
                    alt={actor.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-600"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">{actor.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{actor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
