import React from 'react';
import { Filter, RotateCcw, Flame, Rewind, Sparkles } from 'lucide-react';

export default function MovieFilters({
  selectedEra,
  setSelectedEra,
  selectedLanguage,
  setSelectedLanguage,
  selectedGenre,
  setSelectedGenre,
  selectedFormat,
  setSelectedFormat,
  onReset
}) {
  const eras = [
    { id: 'All', label: 'All Eras' },
    { id: '2026-latest', label: '🔥 2026 Latest & Ramayana' },
    { id: 'vintage-classic', label: '📼 Very Old Classics (70s/80s/90s)' },
    { id: 'recent', label: '🎬 Recent Blockbusters' }
  ];

  const languages = ['All', 'Hindi', 'English', 'Telugu', 'Kannada', 'Tamil'];
  const formats = ['All', 'IMAX 3D', '70mm Stereophonic', '4K Restored', 'Laser IMAX', 'Dolby Atmos', '2D'];
  const genres = ['All', 'Mythology', 'Action', 'Classic', 'Romance', 'Sci-Fi', 'Crime', 'Comedy', 'Drama'];

  const hasActiveFilters = selectedEra !== 'All' || selectedLanguage !== 'All' || selectedGenre !== 'All' || selectedFormat !== 'All';

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800/80 mb-8 space-y-3">
      
      {/* Era Quick Selector Bar */}
      <div className="flex items-center gap-2 flex-wrap pb-3 border-b border-slate-800/80">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Cinema Era:
        </span>
        {eras.map((era) => (
          <button
            key={era.id}
            onClick={() => setSelectedEra(era.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedEra === era.id
                ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-glow-red scale-102'
                : 'bg-slate-850 bg-slate-800/90 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
            }`}
          >
            {era.label}
          </button>
        ))}
      </div>

      {/* Secondary Dropdown & Pills Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Filter className="w-3.5 h-3.5 text-rose-500" />
          <span>Refine By:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          {/* Language Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Language:</span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedLanguage === lang
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="hidden sm:block h-4 w-px bg-slate-700" />

          {/* Format Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Format:</span>
            {formats.slice(0, 4).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedFormat === fmt
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <div className="hidden sm:block h-4 w-px bg-slate-700" />

          {/* Genre Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Genre:</span>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-slate-800/90 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-rose-500"
            >
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g} {g !== 'All' ? 'Movies' : 'Genres'}
                </option>
              ))}
            </select>
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 ml-auto px-2 py-1 rounded-md bg-rose-950/40 border border-rose-900/50"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
