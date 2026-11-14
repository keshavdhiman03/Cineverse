import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CitySelectorModal from './components/CitySelectorModal';
import HeroCarousel from './components/HeroCarousel';
import MovieFilters from './components/MovieFilters';
import MovieCard from './components/MovieCard';
import MovieDetailsModal from './components/MovieDetailsModal';
import TrailerModal from './components/TrailerModal';
import ShowtimePicker from './components/ShowtimePicker';
import SeatLayoutModal from './components/SeatLayoutModal';
import SnackPickerModal from './components/SnackPickerModal';
import CheckoutModal from './components/CheckoutModal';
import TicketSuccessModal from './components/TicketSuccessModal';
import MyBookingsModal from './components/MyBookingsModal';
import Footer from './components/Footer';

import { CITIES } from './data/cities';
import { MOVIES } from './data/movies';
import { THEATERS_BY_CITY } from './data/theaters';
import { Film, MapPin, Sparkles, AlertCircle, Clapperboard, Flame, Rewind } from 'lucide-react';

export default function App() {
  // City state
  const [currentCity, setCurrentCity] = useState(() => {
    const saved = localStorage.getItem('cineverse_city');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return CITIES[0]; // Bengaluru by default
  });

  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('movies'); // 'movies', '2026-latest', 'vintage-classic', 'imax', 'cinemas'
  const [searchQuery, setSearchQuery] = useState('');

  // Filters
  const [selectedEra, setSelectedEra] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');

  // Modals & Flows
  const [activeMovieForDetails, setActiveMovieForDetails] = useState(null);
  const [activeTrailerMovie, setActiveTrailerMovie] = useState(null);
  const [activeMovieForBooking, setActiveMovieForBooking] = useState(null);

  // Booking Stage Modals
  const [seatBookingContext, setSeatBookingContext] = useState(null);
  const [snacksBookingContext, setSnacksBookingContext] = useState(null);
  const [checkoutBookingContext, setCheckoutBookingContext] = useState(null);
  const [confirmedBookingTicket, setConfirmedBookingTicket] = useState(null);

  // Saved Bookings
  const [savedBookings, setSavedBookings] = useState(() => {
    const stored = localStorage.getItem('cineverse_bookings');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return [];
  });
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Persist City
  const handleSelectCity = (city) => {
    setCurrentCity(city);
    localStorage.setItem('cineverse_city', JSON.stringify(city));
  };

  // Persist Bookings
  const handlePaymentSuccess = (bookingRecord) => {
    const updated = [bookingRecord, ...savedBookings];
    setSavedBookings(updated);
    localStorage.setItem('cineverse_bookings', JSON.stringify(updated));
    setCheckoutBookingContext(null);
    setConfirmedBookingTicket(bookingRecord);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? A 100% refund of ₹' + (savedBookings.find(b => b.bookingId === bookingId)?.finalTotal || 0) + ' will be processed to the original payment source.')) {
      const updated = savedBookings.filter(b => b.bookingId !== bookingId);
      setSavedBookings(updated);
      localStorage.setItem('cineverse_bookings', JSON.stringify(updated));
      if (confirmedBookingTicket?.bookingId === bookingId) {
        setConfirmedBookingTicket(null);
      }
    }
  };

  // Filter movies logic
  const filteredMovies = MOVIES.filter((movie) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = movie.title.toLowerCase().includes(q);
      const matchGenre = movie.genres.some(g => g.toLowerCase().includes(q));
      const matchCast = movie.cast.some(c => c.name.toLowerCase().includes(q));
      const matchDirector = movie.director.toLowerCase().includes(q);
      const matchTagline = movie.tagline.toLowerCase().includes(q);
      if (!matchTitle && !matchGenre && !matchCast && !matchDirector && !matchTagline) {
        return false;
      }
    }

    // Tab filter
    if (activeTab === '2026-latest' && movie.era !== '2026-latest') {
      return false;
    }
    if (activeTab === 'vintage-classic' && movie.era !== 'vintage-classic') {
      return false;
    }
    if (activeTab === 'imax' && !movie.formats.some(f => f.includes('IMAX') || f.includes('70mm'))) {
      return false;
    }

    // Era filter
    if (selectedEra !== 'All' && movie.era !== selectedEra) {
      return false;
    }

    // Language filter
    if (selectedLanguage !== 'All' && !movie.languages.includes(selectedLanguage)) {
      return false;
    }

    // Genre filter
    if (selectedGenre !== 'All' && !movie.genres.includes(selectedGenre)) {
      return false;
    }

    // Format filter
    if (selectedFormat !== 'All' && !movie.formats.some(f => f.includes(selectedFormat))) {
      return false;
    }

    return true;
  });

  const handleResetFilters = () => {
    setSelectedEra('All');
    setSelectedLanguage('All');
    setSelectedGenre('All');
    setSelectedFormat('All');
    setSearchQuery('');
  };

  // Start booking for a movie
  const startBooking = (movie) => {
    setActiveMovieForBooking(movie);
    setActiveMovieForDetails(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // City Theaters list
  const currentCityTheaters = THEATERS_BY_CITY[currentCity.id] || THEATERS_BY_CITY['bengaluru'];

  return (
    <div className="min-h-screen flex flex-col bg-[#080b11] text-slate-100">
      
      {/* Top Navigation */}
      <Navbar
        currentCity={currentCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingsCount={savedBookings.length}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveMovieForBooking(null);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">

        {/* If user is in Showtime Picker view for a specific movie */}
        {activeMovieForBooking ? (
          <ShowtimePicker
            movie={activeMovieForBooking}
            currentCity={currentCity}
            onBack={() => setActiveMovieForBooking(null)}
            onSelectShowtime={(context) => {
              setSeatBookingContext(context);
            }}
          />
        ) : activeTab === 'cinemas' ? (
          /* Theaters Directory Tab */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center gap-2.5">
                  <MapPin className="w-7 h-7 text-rose-500" />
                  Iconic Multiplexes & Theaters in {currentCity.name}
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Discover IMAX with Laser, 4DX, ScreenX, and Luxury Dine-in auditoriums near you
                </p>
              </div>
              <button
                onClick={() => setIsCityModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 text-xs font-bold transition-colors"
              >
                Change City ({currentCity.name})
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentCityTheaters.map((theater) => (
                <div
                  key={theater.id}
                  className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white font-heading">
                        {theater.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-rose-400 font-bold border border-slate-700 flex-shrink-0">
                        {theater.distance}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span>{theater.area}</span>
                    </p>

                    {/* Formats badge */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {theater.formats.map((fmt) => (
                        <span key={fmt} className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-900/40">
                          {fmt}
                        </span>
                      ))}
                    </div>

                    {/* Amenities list */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-2">
                        Theater Features & Auditoriums:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {theater.amenities.map((am) => (
                          <span key={am} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60">
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Screens: <b className="text-white">{theater.screens.join(', ')}</b>
                    </span>
                    <button
                      onClick={() => {
                        setActiveMovieForBooking(MOVIES[0]);
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-glow-red"
                    >
                      View Showtimes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Default Movies View */
          <>
            {/* Cinematic Hero Carousel (hidden during tight search) */}
            {!searchQuery && (
              <HeroCarousel
                movies={MOVIES}
                onSelectMovie={startBooking}
                onWatchTrailer={(movie) => setActiveTrailerMovie(movie)}
              />
            )}

            {/* Movies Catalog Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center gap-2">
                    {activeTab === '2026-latest' ? (
                      <>
                        <Flame className="w-6 h-6 text-amber-400" />
                        <span>2026 Latest Blockbusters & Epic Releases</span>
                      </>
                    ) : activeTab === 'vintage-classic' ? (
                      <>
                        <Rewind className="w-6 h-6 text-sky-400" />
                        <span>Very Old & Timeless Indian & Global Classics</span>
                      </>
                    ) : activeTab === 'imax' ? (
                      <>
                        <Sparkles className="w-6 h-6 text-rose-500" />
                        <span>IMAX Laser & 70mm Large Format Experiences</span>
                      </>
                    ) : (
                      <>
                        <Clapperboard className="w-6 h-6 text-rose-500" />
                        <span>All Movies (2026 Latest, Classics & Blockbusters)</span>
                      </>
                    )}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Book tickets in <span className="text-rose-400 font-semibold">{currentCity.name}</span> across PVR INOX, Cinépolis, Urvashi & Heritage auditoriums
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 font-bold text-white shadow-sm">
                    {filteredMovies.length} Titles Found
                  </span>
                </div>
              </div>

              {/* Filters Bar */}
              <MovieFilters
                selectedEra={selectedEra}
                setSelectedEra={setSelectedEra}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedFormat={selectedFormat}
                setSelectedFormat={setSelectedFormat}
                onReset={handleResetFilters}
              />

              {/* Movies Grid */}
              {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onSelectMovie={startBooking}
                      onWatchTrailer={(m) => setActiveTrailerMovie(m)}
                      onOpenDetails={(m) => setActiveMovieForDetails(m)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 glass-card rounded-2xl border border-slate-800">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500 mb-4">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    No movies match your filters
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                    Try clearing your era or experience filters, or searching for a different title.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-glow-red"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

            </div>
          </>
        )}

      </main>

      {/* Footer */}
      <Footer onSelectCity={handleSelectCity} />

      {/* City Selector Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        currentCity={currentCity}
        onSelectCity={handleSelectCity}
      />

      {/* Movie Details Modal */}
      {activeMovieForDetails && (
        <MovieDetailsModal
          movie={activeMovieForDetails}
          onClose={() => setActiveMovieForDetails(null)}
          onSelectMovie={startBooking}
          onWatchTrailer={(m) => setActiveTrailerMovie(m)}
        />
      )}

      {/* Official YouTube Trailer Modal */}
      {activeTrailerMovie && (
        <TrailerModal
          movie={activeTrailerMovie}
          onClose={() => setActiveTrailerMovie(null)}
        />
      )}

      {/* Step 1: Seat Selection Modal */}
      {seatBookingContext && (
        <SeatLayoutModal
          bookingContext={seatBookingContext}
          onClose={() => setSeatBookingContext(null)}
          onProceedToSnacks={(summaryWithSeats) => {
            setSeatBookingContext(null);
            setSnacksBookingContext(summaryWithSeats);
          }}
        />
      )}

      {/* Step 2: Food & Beverage Concession Modal */}
      {snacksBookingContext && (
        <SnackPickerModal
          bookingSummary={snacksBookingContext}
          onClose={() => setSnacksBookingContext(null)}
          onProceedToCheckout={(summaryWithSnacks) => {
            setSnacksBookingContext(null);
            setCheckoutBookingContext(summaryWithSnacks);
          }}
        />
      )}

      {/* Step 3: Checkout & Payment Modal */}
      {checkoutBookingContext && (
        <CheckoutModal
          bookingData={checkoutBookingContext}
          onClose={() => setCheckoutBookingContext(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Step 4: Digital Boarding Pass Ticket Modal */}
      {confirmedBookingTicket && (
        <TicketSuccessModal
          booking={confirmedBookingTicket}
          onClose={() => setConfirmedBookingTicket(null)}
          onViewMyBookings={() => {
            setConfirmedBookingTicket(null);
            setIsMyBookingsOpen(true);
          }}
          onBookMore={() => {
            setConfirmedBookingTicket(null);
            setActiveMovieForBooking(null);
          }}
        />
      )}

      {/* My Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={savedBookings}
        onSelectBooking={(b) => {
          setIsMyBookingsOpen(false);
          setConfirmedBookingTicket(b);
        }}
        onCancelBooking={handleCancelBooking}
        onBrowseMovies={() => {
          setActiveTab('movies');
          setActiveMovieForBooking(null);
        }}
      />

    </div>
  );
}
