import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import StorageService from '../services/localStorage';

const BuyTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: '',
  });
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState('');

  useEffect(() => {
    const foundEvent = StorageService.getEvents().find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      navigate('/events');
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const ticket = {
      id: Date.now().toString(),
      eventId: id,
      userId: Date.now().toString(),
      purchaseDate: new Date().toISOString(),
      userName: formData.name,
      userPhoto: formData.photo,
      qrCode: `${id}-${Date.now()}`,
      expiryDate: new Date(event.date).toISOString(),
    };

    StorageService.saveTicket(ticket);
    setTicketData(JSON.stringify(ticket));
    setShowTicket(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!event) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl overflow-hidden"
      >
        {!showTicket ? (
          <>
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6">{event.title}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-400 mb-2">Date: {event.date}</p>
                  <p className="text-gray-400 mb-2">Time: {event.time}</p>
                  <p className="text-gray-400 mb-4">Location: {event.location}</p>
                  <p className="text-2xl font-bold text-green-400 mb-6">
                    ${event.price}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-4">{event.description}</p>
                </div>
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-gray-700 p-8"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold mb-6">Your Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Photo URL (optional)
                  </label>
                  <input
                    type="url"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-6 w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Purchase Ticket
              </motion.button>
            </motion.form>
          </>
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Your Ticket</h2>
            <div className="bg-white p-4 rounded-lg inline-block mb-6">
              <QRCodeSVG value={ticketData} size={200} />
            </div>
            <p className="text-gray-400 mb-6">
              Show this QR code at the event entrance
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/events')}
              className="px-6 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Back to Events
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BuyTicket;
