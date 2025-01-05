import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StorageService from '../services/localStorage';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setEvents(StorageService.getEvents());
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Upcoming Events
        </h1>
        <input
          type="text"
          placeholder="Search events..."
          className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <Link to={`/buy-ticket/${event.id}`} key={event.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer group"
            >
              {event.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">{event.date}</p>
                    <p className="text-sm text-gray-400">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">${event.price}</p>
                    <p className="text-sm text-gray-400">
                      {event.ticketsLeft} tickets left
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-xl text-gray-400">No events found</p>
          <Link to="/create-event">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Create an Event
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Events;
