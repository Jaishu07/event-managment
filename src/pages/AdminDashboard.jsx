import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StorageService from '../services/localStorage';
import { QRCodeSVG } from 'qrcode.react';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [scanMode, setScanMode] = useState(false);
  const [scannedTicket, setScannedTicket] = useState('');

  useEffect(() => {
    setEvents(StorageService.getEvents());
    setTickets(StorageService.getTickets());
    setUsers(StorageService.getUsers());
  }, []);

  const validateTicket = (ticketData) => {
    try {
      const ticket = JSON.parse(ticketData);
      const isValid = StorageService.isTicketValid(ticket.id);
      return isValid;
    } catch {
      return false;
    }
  };

  const TabButton = ({ name, label }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-2 rounded-lg ${
        activeTab === name ? 'bg-purple-600' : 'bg-gray-800'
      }`}
      onClick={() => setActiveTab(name)}
    >
      {label}
    </motion.button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Admin Dashboard
      </motion.h1>

      <div className="flex space-x-4 mb-8">
        <TabButton name="events" label="Events" />
        <TabButton name="tickets" label="Tickets" />
        <TabButton name="users" label="Users" />
        <TabButton name="scanner" label="Ticket Scanner" />
      </div>

      {activeTab === 'events' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                  <p className="text-gray-400">{event.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400">${event.price}</p>
                  <p className="text-gray-400">
                    {event.ticketsSold} tickets sold
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'tickets' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    Ticket #{ticket.id.slice(0, 8)}
                  </h3>
                  <p className="text-gray-400">Event: {ticket.eventName}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`${
                      ticket.used ? 'text-red-400' : 'text-green-400'
                    }`}
                  >
                    {ticket.used ? 'Used' : 'Valid'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'users' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">
                    {user.tickets.length} tickets purchased
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'scanner' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Ticket Scanner</h2>
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <textarea
                className="w-full p-4 bg-gray-700 rounded-lg text-white"
                placeholder="Paste ticket QR code data here..."
                value={scannedTicket}
                onChange={(e) => setScannedTicket(e.target.value)}
              />
              <button
                className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
                onClick={() => {
                  const isValid = validateTicket(scannedTicket);
                  alert(
                    isValid
                      ? 'Ticket is valid!'
                      : 'Invalid or already used ticket!'
                  );
                }}
              >
                Validate Ticket
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
