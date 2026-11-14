import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Printer, 
  Share2, 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  Sparkles, 
  Download,
  X,
  Smartphone
} from 'lucide-react';

export default function TicketSuccessModal({ 
  booking, 
  onClose, 
  onViewMyBookings, 
  onBookMore 
}) {
  useEffect(() => {
    // Fire confetti cannon
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-750 rounded-3xl shadow-2xl overflow-hidden relative my-auto animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-white" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg font-heading leading-tight">
                Booking Confirmed!
              </h3>
              <p className="text-xs text-emerald-100">
                M-Ticket sent to {booking.contactPhone} & {booking.contactEmail}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Boarding Pass Style Digital Ticket Card */}
        <div className="p-6 sm:p-8 bg-[#0d121c] text-white">
          
          {/* Movie banner header */}
          <div className="flex gap-4 items-start pb-5 border-b border-dashed border-slate-700">
            <img
              src={booking.movie.poster}
              alt={booking.movie.title}
              className="w-16 h-24 object-cover rounded-xl shadow-lg border border-slate-700 flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-600 font-bold uppercase tracking-wider text-white">
                  {booking.format}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ID: <b className="text-white">{booking.bookingId}</b>
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-black font-heading text-white mt-1">
                {booking.movie.title}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {booking.movie.languages.join(', ')} • {booking.movie.certificate}
              </p>
              <p className="text-xs text-slate-300 mt-1 font-medium">
                {booking.theater.name}
              </p>
            </div>
          </div>

          {/* Showtime and Venue details */}
          <div className="grid grid-cols-3 gap-3 py-4 border-b border-dashed border-slate-700 text-center">
            <div className="p-2 rounded-xl bg-slate-800/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Date</span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block font-heading">
                {booking.date.dayName}, {booking.date.dateNum} {booking.date.month}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-800/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Time</span>
              <span className="text-xs sm:text-sm font-bold text-rose-400 mt-0.5 block font-heading">
                {booking.time}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-800/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Auditorium</span>
              <span className="text-xs sm:text-sm font-bold text-amber-400 mt-0.5 block font-heading">
                Audi 2 (Main)
              </span>
            </div>
          </div>

          {/* Seats Tally */}
          <div className="py-4 border-b border-dashed border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Confirmed Seats ({booking.seats.length})</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {booking.seats.map(s => (
                  <span
                    key={s.id}
                    className="px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-600/60 text-white font-mono font-bold text-xs shadow-sm"
                  >
                    {s.id}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Paid</span>
              <span className="text-xl font-black text-emerald-400 font-heading">
                ₹{booking.finalTotal}
              </span>
            </div>
          </div>

          {/* Snacks Note if any */}
          {booking.snacks && booking.snacks.length > 0 && (
            <div className="py-3 border-b border-dashed border-slate-700 text-xs text-slate-300">
              <span className="text-amber-400 font-bold block mb-1">🍿 Seat Concessions Included:</span>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                {booking.snacks.map((snk, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800">
                    {snk.name} (×{snk.qty})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* QR Code Scan Area */}
          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-xs font-bold text-slate-300 block flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-rose-500" />
                Scan this QR at the Multiplex Turnstile
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                No physical ticket printout required. Show this barcode on your phone screen.
              </p>
            </div>

            <div className="p-2 bg-white rounded-xl shadow-lg flex-shrink-0">
              {/* High-res Simulated QR */}
              <svg viewBox="0 0 100 100" className="w-20 h-20 text-slate-950" fill="currentColor">
                <path d="M0 0h35v35H0V0zm5 5v25h25V5H5zm5 5h15v15H10V10zM65 0h35v35H65V0zm5 5v25h25V5H70zm5 5h15v15H75V10zM0 65h35v35H0V65zm5 5v25h25V70H5zm5 5h15v15H10V75zM45 10h10v15H45zm0 25h10v10H45zm15 15h15v10H60zm-15 15h10v20H45zm15 10h20v10H60zm15-20h15v10H75zm-30 0h10v10H45z" />
              </svg>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Ticket</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewMyBookings}
              className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-rose-400 text-xs font-bold transition-colors"
            >
              My Bookings
            </button>

            <button
              onClick={onBookMore}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-glow-red"
            >
              Done & Explore
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
