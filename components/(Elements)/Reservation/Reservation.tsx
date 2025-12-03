import { useState } from "react";
import { FaTimes, FaUtensils } from "react-icons/fa";
import ReservationIframe from "./ReservationIframe";


function Reservation() {
  const [showReservation, setShowReservation] = useState(false);


  return (
    <div className="reservation relative" id="tableReservation">
      <div className="flex flex-col items-center justify-center min-h-[400px] relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-200/20 to-primary-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-secondary-200/20 to-secondary-300/20 rounded-full blur-3xl"></div>
        </div>

        {!showReservation ? (
          <div className="relative z-10">
            {/* Main reservation card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-primary-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              <button
                onClick={() => setShowReservation(true)}
                className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group hover:scale-105 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-lg opacity-60"></div>
                    <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 p-4 rounded-full">
                      <FaUtensils className="text-white text-2xl" />
                    </div>
                  </div>
                </div>

                {/* Text content */}
                <div className="text-center space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Reserve Your Table
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base max-w-xs">
                    Experience our exceptional dining atmosphere with a personalized reservation
                  </p>
                  <button
                    onClick={() => setShowReservation(true)}
                    className="bg-gradient-to-br from-primary-400 to-primary-600 text-white text-2xl md:text-3xl font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-0 focus:outline-none focus:ring-4 focus:ring-primary-300 focus:ring-opacity-50"
                  >
                    Book a table
                  </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary-400 rounded-full opacity-40"></div>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 w-full max-w-4xl mx-auto">
            {/* Close button */}
            <button
              onClick={() => setShowReservation(false)}
              className="absolute -top-4 -right-4 z-20 bg-gradient-to-br from-red-400 to-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-white hover:scale-110 hover:rotate-90"
            >
              <FaTimes className="text-lg" />
            </button>

          <ReservationIframe />
      
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservation;
