import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import StorageService from '../services/localStorage';

const generateRandomAvatar = (name) => {
  const colors = ['FF6B6B', 'FF9F43', '4ECDC4', '45B7D1', '6C5CE7', 'A8E6CF'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${randomColor}&color=fff&size=128`;
};

const generateUniqueId = () => {
  return 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const BuyTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [showTicket, setShowTicket] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef(null);

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
    
    const newTicket = {
      id: generateUniqueId(),
      eventId: id,
      userId: Date.now().toString(),
      purchaseDate: new Date().toISOString(),
      userName: formData.name,
      userEmail: formData.email,
      userAvatar: generateRandomAvatar(formData.name),
      qrCode: `${id}-${Date.now()}`,
      expiryDate: new Date(event.date).toISOString(),
    };

    StorageService.saveTicket(newTicket);
    setTicket(newTicket);
    setShowTicket(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const downloadTicket = async () => {
    if (!ticketRef.current || downloading) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${ticket.id}-${event.title}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading ticket:', error);
    }
    setDownloading(false);
  };

  const shareTicket = async () => {
    const ticketData = {
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      ticketId: ticket.id,
      userName: ticket.userName
    };

    const shareText = `Check out my ticket for ${ticketData.title}!
Event Details:
📅 Date: ${ticketData.date}
⏰ Time: ${ticketData.time}
📍 Location: ${ticketData.location}
🎫 Ticket ID: ${ticketData.ticketId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Event Ticket',
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('Ticket details copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing ticket:', error);
    }
  };

  if (!event) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl"
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
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
                >
                  Purchase Ticket
                </button>
              </div>
            </motion.form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 opacity-20 blur-xl"></div>
            <div ref={ticketRef} className="relative bg-gray-800 rounded-xl p-8 backdrop-blur-sm border border-gray-700 cursor-pointer" onClick={downloadTicket}>
              <div className="flex space-x-8">
                {/* Left Side - QR Code and Download Button */}
                <div className="flex flex-col items-center space-y-4 min-w-[250px]">
                  <div className="bg-white p-4 rounded-lg w-full flex justify-center">
                    <QRCodeSVG value={ticket.qrCode} size={200} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadTicket}
                    disabled={downloading}
                    className={`w-full py-3 bg-purple-600 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 ${downloading ? 'opacity-50' : ''}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>{downloading ? 'Downloading...' : 'Download Ticket'}</span>
                  </motion.button>
                </div>

                {/* Right Side - Ticket Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
                      <p className="text-gray-400 text-lg">Ticket ID: {ticket.id}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={ticket.userAvatar}
                        alt={ticket.userName}
                        className="w-20 h-20 rounded-full border-4 border-purple-500 mb-2"
                      />
                      <p className="text-sm font-medium">{ticket.userName}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Event Date</p>
                        <p className="font-medium text-lg">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Event Time</p>
                        <p className="font-medium text-lg">{event.time}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400 mb-1">Location</p>
                      <p className="font-medium text-lg">{event.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Purchase Date</p>
                        <p className="font-medium">{new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Valid Until</p>
                        <p className="font-medium">{new Date(ticket.expiryDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareTicket}
                      className="w-full mt-4 py-3 bg-pink-600 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      <span>Share Ticket</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-6">
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BuyTicket;
