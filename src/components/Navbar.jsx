import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link to="/" className="text-xl font-bold text-white">
              IESEvents
            </Link>
          </motion.div>

          <div className="flex space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/create-event">Create Event</NavLink>
            <NavLink to="/admin">Admin</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  </motion.div>
);

export default Navbar;
