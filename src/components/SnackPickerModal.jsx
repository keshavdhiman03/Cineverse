import React, { useState } from 'react';
import { X, Plus, Minus, Popcorn, Utensils, Sparkles, ChevronRight } from 'lucide-react';
import { FOOD_ITEMS } from '../data/foodItems';

export default function SnackPickerModal({ 
  bookingSummary, 
  onClose, 
  onProceedToCheckout 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState({});

  const categories = ['All', 'Combos', 'Popcorn', 'Snacks', 'Beverages'];

  const filteredItems = selectedCategory === 'All' 
    ? FOOD_ITEMS 
    : FOOD_ITEMS.filter(item => item.category === selectedCategory);

  const updateQuantity = (itemId, delta) => {
    setCart(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Calculate snacks total
  const selectedSnacksList = Object.entries(cart).map(([id, qty]) => {
    const item = FOOD_ITEMS.find(f => f.id === id);
    return { ...item, qty, itemTotal: item.price * qty };
  });

  const snacksTotal = selectedSnacksList.reduce((acc, curr) => acc + curr.itemTotal, 0);

  const handleContinue = () => {
    onProceedToCheckout({
      ...bookingSummary,
      snacks: selectedSnacksList,
      snacksTotal
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="glass-card w-full max-w-4xl rounded-2xl border border-slate-700 bg-[#0c1019] shadow-2xl overflow-hidden relative my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Popcorn className="w-5 h-5 text-amber-400" />
              Grab Cinema Snacks & Combos
            </h3>
            <p className="text-xs text-slate-400">
              Freshly popped popcorn & gourmet theater bites delivered directly to your seat
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-950/60 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="glass-card rounded-xl p-3 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between group"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.popular && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3" /> Best Value Combo
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-black/70 text-slate-300">
                      {item.calories}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white leading-tight font-heading">
                        {item.name}
                      </h4>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-semibold border border-emerald-800/50">
                        VEG
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Price and Counter */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-white">
                      ₹{item.price}
                    </span>

                    {qty === 0 ? (
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-rose-400 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-slate-800/90 border border-rose-500/50 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center bg-rose-600 text-white hover:bg-rose-500 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div>
            <div className="text-xs text-slate-400">
              {snacksTotal > 0 ? (
                <span>{selectedSnacksList.length} Snack item(s) selected</span>
              ) : (
                <span>No snacks selected yet</span>
              )}
            </div>
            <div className="text-lg sm:text-xl font-bold text-white font-heading">
              Tickets: ₹{bookingSummary.ticketsTotal} + Snacks: ₹{snacksTotal}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {snacksTotal === 0 && (
              <button
                onClick={handleContinue}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-colors"
              >
                Skip F&B
              </button>
            )}

            <button
              onClick={handleContinue}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow-red"
            >
              <span>Continue to Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
