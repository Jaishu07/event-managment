import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import AdminDashboard from './pages/AdminDashboard';
import CreateEvent from './pages/CreateEvent';
import BuyTicket from './pages/BuyTicket';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/buy-ticket/:id" element={<BuyTicket />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
