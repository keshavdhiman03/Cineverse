import React, { useState } from 'react';
import { X, ChevronLeft, Armchair, Shield, Sparkles, Check, AlertCircle } from 'lucide-react';

export default function SeatLayoutModal({ 
  bookingContext, 
  onClose, 
  onProceedToSnacks 
}) {
  const { movie, theater, date, time, format, basePrice } = bookingContext;

  // Seat Tiers config
  const TIERS = [
    {
      id: 'recliner',
      name: 'VIP Plush Recliner',
      rows: ['A', 'B'],
      price: basePrice + 220,
      description: 'Ultra-luxurious motor-powered recliner with personal tray and butler call'
    },
    {
      id: 'prime',
      name: 'Prime Dolby Club',
      rows: ['C', 'D', 'E', 'F'],
      price: basePrice + 70,
      description: 'Acoustic prime central sweet spot with premium wide armrests'
    },
    {
      id: 'classic',
      name: 'Classic Executive',
      rows: ['G', 'H', 'J', 'K'],
      price: basePrice,
      description: 'Standard ergonomic stadium comfort seating'
    }
  ];

  // Pre-seed some booked seats based on theater and time
  const [bookedSeats] = useState(() => {
    const booked = new Set();
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
    // Deterministic random simulation
    rows.forEach((r, rIdx) => {
      [2, 3, 7, 8, 12, 13].forEach((seatNum) => {
        if ((rIdx * 7 + seatNum) % 3 === 0 || (rIdx * 5 + seatNum) % 4 === 0) {
          booked.add(`${r}-${seatNum}`);
        }
      });
    });
    return booked;
  });

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, num, tier) => {
    const seatId = `${row}-${num}`;
    if (bookedSeats.has(seatId)) return;

    if (selectedSeats.some(s => s.id === seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        alert('You can select a maximum of 8 seats per transaction.');
        return;
      }
      setSelectedSeats([
        ...selectedSeats,
        { id: seatId, row, num, tierName: tier.name, price: tier.price }
      ]);
    }
  };

  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="glass-card w-full max-w-4xl rounded-2xl border border-slate-700 bg-[#0c1019] shadow-2xl overflow-hidden relative my-auto flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                {movie.title}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-600/90 font-bold text-white">
                {format}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {theater.name} | <span className="text-rose-400 font-semibold">{date.fullDateStr} at {time}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Seating Canvas Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* Cinema Screen Indicator */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-3/4 max-w-md h-2 rounded-full bg-gradient-to-r from-sky-400 via-rose-500 to-sky-400 shadow-screen" />
            <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mt-2 flex items-center gap-1.5">
              <span>All eyes this way • Curved Screen</span>
            </div>
          </div>

          {/* Seat Layout by Tiers */}
          <div className="space-y-6 max-w-2xl mx-auto">
            {TIERS.map((tier) => (
              <div key={tier.id} className="pt-2">
                
                {/* Tier Label */}
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80 mb-3">
                  <div className="flex items-center gap-1.5 font-bold text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>{tier.name}</span>
                    <span className="text-slate-400 font-normal">({tier.rows.join(', ')})</span>
                  </div>
                  <span className="font-extrabold text-white text-sm">₹{tier.price}</span>
                </div>

                {/* Rows Grid */}
                <div className="space-y-2">
                  {tier.rows.map((rowLetter) => (
                    <div key={rowLetter} className="flex items-center justify-center gap-1.5 sm:gap-2">
                      {/* Row Label */}
                      <span className="w-5 text-center text-xs font-bold text-slate-400">
                        {rowLetter}
                      </span>

                      {/* Left Block (Seats 1-4) */}
                      <div className="flex gap-1 sm:gap-1.5">
                        {[1, 2, 3, 4].map((num) => {
                          const seatId = `${rowLetter}-${num}`;
                          const isBooked = bookedSeats.has(seatId);
                          const isSelected = selectedSeats.some(s => s.id === seatId);

                          return (
                            <button
                              key={num}
                              disabled={isBooked}
                              onClick={() => toggleSeat(rowLetter, num, tier)}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all ${
                                isBooked
                                  ? 'bg-slate-800/40 text-slate-600 border border-slate-800 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-rose-600 text-white shadow-glow-red scale-105 border border-rose-400'
                                  : 'bg-slate-800/90 text-slate-300 border border-slate-700/80 hover:border-rose-500/80 hover:text-white hover:scale-105'
                              }`}
                              title={isBooked ? `Seat ${seatId} (Booked)` : `Seat ${seatId} - ₹${tier.price}`}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>

                      {/* Center Aisle */}
                      <div className="w-4 sm:w-8" />

                      {/* Center Block (Seats 5-10) */}
                      <div className="flex gap-1 sm:gap-1.5">
                        {[5, 6, 7, 8, 9, 10].map((num) => {
                          const seatId = `${rowLetter}-${num}`;
                          const isBooked = bookedSeats.has(seatId);
                          const isSelected = selectedSeats.some(s => s.id === seatId);

                          return (
                            <button
                              key={num}
                              disabled={isBooked}
                              onClick={() => toggleSeat(rowLetter, num, tier)}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all ${
                                isBooked
                                  ? 'bg-slate-800/40 text-slate-600 border border-slate-800 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-rose-600 text-white shadow-glow-red scale-105 border border-rose-400'
                                  : 'bg-slate-800/90 text-slate-300 border border-slate-700/80 hover:border-rose-500/80 hover:text-white hover:scale-105'
                              }`}
                              title={isBooked ? `Seat ${seatId} (Booked)` : `Seat ${seatId} - ₹${tier.price}`}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>

                      {/* Right Aisle */}
                      <div className="w-4 sm:w-8" />

                      {/* Right Block (Seats 11-14) */}
                      <div className="flex gap-1 sm:gap-1.5">
                        {[11, 12, 13, 14].map((num) => {
                          const seatId = `${rowLetter}-${num}`;
                          const isBooked = bookedSeats.has(seatId);
                          const isSelected = selectedSeats.some(s => s.id === seatId);

                          return (
                            <button
                              key={num}
                              disabled={isBooked}
                              onClick={() => toggleSeat(rowLetter, num, tier)}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all ${
                                isBooked
                                  ? 'bg-slate-800/40 text-slate-600 border border-slate-800 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-rose-600 text-white shadow-glow-red scale-105 border border-rose-400'
                                  : 'bg-slate-800/90 text-slate-300 border border-slate-700/80 hover:border-rose-500/80 hover:text-white hover:scale-105'
                              }`}
                              title={isBooked ? `Seat ${seatId} (Booked)` : `Seat ${seatId} - ₹${tier.price}`}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Seat Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-slate-800 border border-slate-600" />
              <span className="text-slate-400">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-rose-600 border border-rose-400 shadow-glow-red" />
              <span className="text-rose-400 font-semibold">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-slate-800/40 text-slate-600 border border-slate-800" />
              <span className="text-slate-500">Booked / Occupied</span>
            </div>
          </div>
        </div>

        {/* Footer Summary & Proceed */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div>
            <div className="text-xs text-slate-400">
              {selectedSeats.length > 0 ? (
                <span>Selected {selectedSeats.length} Seat(s): <b className="text-white">{selectedSeats.map(s => s.id).join(', ')}</b></span>
              ) : (
                <span>Please click on available seats to select</span>
              )}
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
              ₹{totalPrice}
              <span className="text-xs font-normal text-slate-400 ml-1.5">(Base Tickets)</span>
            </div>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            onClick={() => onProceedToSnacks({
              ...bookingContext,
              seats: selectedSeats,
              ticketsTotal: totalPrice
            })}
            className={`w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              selectedSeats.length > 0
                ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-glow-red active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Proceed ({selectedSeats.length} Tickets)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
