import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StorageService from '../services/localStorage';
import { useEffect, useState } from 'react';

const Home = () => {
  const [events, setEvents] = useState(StorageService.getEvents());

  return (
    <div className="relative min-h-screen">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" 
           style={{ backgroundSize: '40px 40px' }} />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
      >
        <motion.h1 
          className="text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Experience Amazing Events in IES University
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Discover and book tickets for the most exciting events happening around you
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-6">
          <Link to="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Browse Events
            </motion.button>
          </Link>
          <Link to="/create-event">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Create Event
            </motion.button>
          </Link>
        </div>

        {/* Featured Events */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                  <p className="text-gray-400 mb-4">{event.date}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-semibold">
                      ${event.price}
                    </span>
                    <Link to={`/buy-ticket/${event.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Buy Ticket
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
