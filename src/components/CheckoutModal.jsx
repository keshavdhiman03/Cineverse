import React, { useState } from 'react';
import { 
  X, 
  Tag, 
  CreditCard, 
  QrCode, 
  Building2, 
  ShieldCheck, 
  Check, 
  Smartphone, 
  Lock, 
  Sparkles,
  ChevronRight,
  Clock
} from 'lucide-react';

export default function CheckoutModal({ 
  bookingData, 
  onClose, 
  onPaymentSuccess 
}) {
  const { movie, theater, date, time, format, seats, ticketsTotal, snacks, snacksTotal } = bookingData;

  const [contactPhone, setContactPhone] = useState('9876543210');
  const [contactEmail, setContactEmail] = useState('alex.cinephile@gmail.com');
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);
  const [promoError, setPromoError] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);

  // Billing calculations
  const convenienceFeePerTicket = 32;
  const totalConvenienceFee = convenienceFeePerTicket * seats.length;
  const gst = Math.round(totalConvenienceFee * 0.18);
  const subtotal = ticketsTotal + (snacksTotal || 0) + totalConvenienceFee + gst;
  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  const applyPromo = (codeToApply) => {
    const code = (codeToApply || promoInput).trim().toUpperCase();
    setPromoError('');

    if (code === 'BLOCKBUSTER') {
      const disc = 100;
      setAppliedDiscount(disc);
      setAppliedPromoCode('BLOCKBUSTER');
      setPromoInput('BLOCKBUSTER');
    } else if (code === 'CINE20') {
      const disc = Math.min(150, Math.round(ticketsTotal * 0.20));
      setAppliedDiscount(disc);
      setAppliedPromoCode('CINE20');
      setPromoInput('CINE20');
    } else if (code === 'HDFC100') {
      const disc = 100;
      setAppliedDiscount(disc);
      setAppliedPromoCode('HDFC100');
      setPromoInput('HDFC100');
    } else {
      setPromoError('Invalid promo code. Try BLOCKBUSTER or CINE20');
    }
  };

  const removePromo = () => {
    setAppliedDiscount(0);
    setAppliedPromoCode(null);
    setPromoInput('');
    setPromoError('');
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const bookingRecord = {
        bookingId: `CNV-${Math.floor(1000000 + Math.random() * 9000000)}`,
        movie,
        theater,
        date,
        time,
        format,
        seats,
        snacks: snacks || [],
        ticketsTotal,
        snacksTotal: snacksTotal || 0,
        discount: appliedDiscount,
        finalTotal,
        contactPhone,
        contactEmail,
        paymentMethod: paymentMethod.toUpperCase(),
        bookedAt: new Date().toISOString()
      };
      onPaymentSuccess(bookingRecord);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="glass-card w-full max-w-4xl rounded-2xl border border-slate-700 bg-[#0c1019] shadow-2xl overflow-hidden relative my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Secure 256-Bit Checkout
            </h3>
            <p className="text-xs text-slate-400">
              Confirm your seats & contact details for instant M-Ticket delivery
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Payment Options & Contact */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contact Delivery Card */}
            <div className="glass-card rounded-xl p-4 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-rose-400" />
                M-Ticket & WhatsApp Delivery Info
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Mobile (WhatsApp for QR)</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-slate-850 bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Email (for Tax Invoice)</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-850 bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="glass-card rounded-xl p-4 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Select Payment Mode
              </h4>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-rose-950/40 border-rose-500 text-rose-400 shadow-glow-red ring-1 ring-rose-500'
                      : 'bg-slate-850 bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-xs font-bold">UPI / QR</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-rose-950/40 border-rose-500 text-rose-400 shadow-glow-red ring-1 ring-rose-500'
                      : 'bg-slate-850 bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs font-bold">Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-rose-950/40 border-rose-500 text-rose-400 shadow-glow-red ring-1 ring-rose-500'
                      : 'bg-slate-850 bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  <span className="text-xs font-bold">NetBanking</span>
                </button>
              </div>

              {/* UPI Tab View */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 bg-white p-1.5 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    {/* Simulated SVG QR */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950" fill="currentColor">
                      <path d="M0 0h35v35H0V0zm5 5v25h25V5H5zm5 5h15v15H10V10zM65 0h35v35H65V0zm5 5v25h25V5H70zm5 5h15v15H75V10zM0 65h35v35H0V65zm5 5v25h25V70H5zm5 5h15v15H10V75zM45 10h10v15H45zm0 25h10v10H45zm15 15h15v10H60zm-15 15h10v20H45zm15 10h20v10H60zm15-20h15v10H75zm-30 0h10v10H45z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Scan with Google Pay, PhonePe, Paytm, or CRED
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Dynamic UPI ID: <span className="text-rose-400 font-mono font-semibold">cineverse.pay@icici</span>
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 mt-2 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      <Clock className="w-3 h-3" /> Auto-approves instantly on payment
                    </span>
                  </div>
                </div>
              )}

              {/* Card Tab View */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        defaultValue="888"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Netbanking Tab */}
              {paymentMethod === 'netbanking' && (
                <div className="grid grid-cols-2 gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra'].map((b) => (
                    <button
                      key={b}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-rose-500 text-slate-200 text-left font-medium transition-all"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Coupons Card */}
            <div className="glass-card rounded-xl p-4 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-rose-400" />
                Apply Cinema Promo Code
              </h4>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter coupon (e.g. BLOCKBUSTER)"
                  disabled={appliedPromoCode !== null}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-rose-500"
                />
                {appliedPromoCode ? (
                  <button
                    onClick={removePromo}
                    className="px-3 py-2 rounded-lg bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => applyPromo()}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700"
                  >
                    Apply
                  </button>
                )}
              </div>

              {promoError && (
                <p className="text-[11px] text-rose-400 mt-1.5">{promoError}</p>
              )}

              {/* Quick Coupon Chips */}
              {!appliedPromoCode && (
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span className="text-[10px] text-slate-400">Try:</span>
                  <button
                    onClick={() => applyPromo('BLOCKBUSTER')}
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 hover:bg-slate-700 border border-amber-500/30"
                  >
                    BLOCKBUSTER (-₹100)
                  </button>
                  <button
                    onClick={() => applyPromo('CINE20')}
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-rose-400 hover:bg-slate-700 border border-rose-500/30"
                  >
                    CINE20 (20% OFF)
                  </button>
                </div>
              )}

              {appliedPromoCode && (
                <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Coupon '{appliedPromoCode}' applied! Saved ₹{appliedDiscount}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary Bill */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-4 bg-slate-900/90 sticky top-2">
              <h4 className="text-sm font-bold text-white font-heading pb-3 border-b border-slate-800 flex items-center justify-between">
                <span>Booking Summary</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-rose-400 border border-slate-700">
                  {format}
                </span>
              </h4>

              {/* Movie & Theater Info */}
              <div>
                <h5 className="font-bold text-white text-base font-heading">{movie.title}</h5>
                <p className="text-xs text-slate-400 mt-0.5">{theater.name}</p>
                <p className="text-xs text-rose-400 font-semibold mt-0.5">
                  {date.fullDateStr} • {time}
                </p>
                <div className="mt-2 text-xs text-slate-300">
                  Seats: <b className="text-white font-mono">{seats.map(s => s.id).join(', ')}</b>
                  <span className="text-slate-400 ml-1">({seats.length} Tickets)</span>
                </div>
              </div>

              {/* Itemized lines */}
              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Tickets Subtotal ({seats.length})</span>
                  <span className="font-semibold text-white">₹{ticketsTotal}</span>
                </div>

                {snacks && snacks.length > 0 && (
                  <div className="pt-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Cinema F&B ({snacks.length} items)</span>
                      <span className="font-semibold text-white">₹{snacksTotal}</span>
                    </div>
                    {snacks.map((snk, i) => (
                      <div key={i} className="flex justify-between text-[11px] text-slate-400 pl-2">
                        <span>• {snk.name} × {snk.qty}</span>
                        <span>₹{snk.itemTotal}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between text-slate-400 pt-1">
                  <span>Convenience Fee (₹{convenienceFeePerTicket} × {seats.length})</span>
                  <span>₹{totalConvenienceFee}</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Integrated GST (18%)</span>
                  <span>₹{gst}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold pt-1">
                    <span>Discount Coupon ({appliedPromoCode})</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t-2 border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Amount Payable</span>
                  <span className="text-2xl font-black text-white font-heading">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-glow-red transition-all active:scale-98 disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{finalTotal} & Confirm</span>
                  </>
                )}
              </button>

              <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Guaranteed Official Theater Booking</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
