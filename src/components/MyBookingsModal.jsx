import React from 'react';
import { 
  X, 
  Ticket, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  QrCode,
  ArrowRight
} from 'lucide-react';

export default function MyBookingsModal({ 
  isOpen, 
  onClose, 
  bookings, 
  onSelectBooking, 
  onCancelBooking,
  onBrowseMovies 
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="glass-card w-full max-w-3xl rounded-2xl border border-slate-700 bg-[#0d111a] shadow-2xl overflow-hidden relative my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Ticket className="w-5 h-5 text-rose-500" />
              My Cinema Bookings & Tickets
            </h3>
            <p className="text-xs text-slate-400">
              Access your digital M-Tickets, QR turnstile passes, or manage cancellations
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookings List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto text-slate-500 mb-4">
                <Ticket className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                No Tickets Booked Yet
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                You haven't booked any movie tickets yet. Pick from current blockbusters like Dune 2, Deadpool, Kalki or Stree 2!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseMovies();
                }}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-glow-red inline-flex items-center gap-2"
              >
                <span>Browse Now Showing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.bookingId}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                {/* Left Movie Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={b.movie.poster}
                    alt={b.movie.title}
                    className="w-14 h-20 object-cover rounded-xl border border-slate-700 shadow-md flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-600/90 text-white">
                        {b.format}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {b.bookingId}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white font-heading mt-0.5">
                      {b.movie.title}
                    </h4>

                    <p className="text-xs text-slate-400 mt-0.5">
                      {b.theater.name}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-300">
                      <span className="flex items-center gap-1 text-rose-400 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {b.date.dayName}, {b.date.dateNum} {b.date.month}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {b.time}
                      </span>
                      <span className="text-slate-400">
                        Seats: <b className="text-white font-mono">{b.seats.map(s => s.id).join(', ')}</b>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Paid</span>
                    <span className="text-base font-black text-emerald-400 font-heading">
                      ₹{b.finalTotal}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectBooking(b)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
                      title="View Digital Pass"
                    >
                      <QrCode className="w-3.5 h-3.5 text-rose-400" />
                      <span>View Pass</span>
                    </button>

                    <button
                      onClick={() => onCancelBooking(b.bookingId)}
                      className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/60 text-rose-400 transition-colors"
                      title="Cancel Ticket & Refund"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookings.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>{bookings.length} Active Booking(s)</span>
            <span className="text-slate-500">Tickets stored securely in your browser</span>
          </div>
        )}

      </div>
    </div>
  );
}
