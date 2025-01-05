const STORAGE_KEYS = {
  EVENTS: 'events',
  TICKETS: 'tickets',
  USERS: 'users',
};

export const StorageService = {
  // Events
  getEvents: () => {
    const events = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return events ? JSON.parse(events) : [];
  },

  saveEvent: (event) => {
    const events = StorageService.getEvents();
    events.push(event);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },

  // Tickets
  getTickets: () => {
    const tickets = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return tickets ? JSON.parse(tickets) : [];
  },

  saveTicket: (ticket) => {
    const tickets = StorageService.getTickets();
    tickets.push(ticket);
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  },

  // Users
  getUsers: () => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  saveUser: (user) => {
    const users = StorageService.getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  // Validation
  isTicketValid: (ticketId) => {
    const tickets = StorageService.getTickets();
    const ticket = tickets.find((t) => t.id === ticketId);
    
    if (!ticket) return false;
    
    const expiryDate = new Date(ticket.expiryDate);
    const now = new Date();
    
    return expiryDate > now;
  },
};

// Initialize with some dummy data
const initializeDummyData = () => {
  if (localStorage.getItem(STORAGE_KEYS.EVENTS)) return;

  const dummyEvent = {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Join us for the biggest tech conference of the year!',
    date: '2024-06-15',
    time: '09:00',
    location: 'Convention Center',
    price: 99.99,
    capacity: 500,
    image: 'https://example.com/tech-conf.jpg',
    organizer: 'Admin'
  };

  StorageService.saveEvent(dummyEvent);
};

initializeDummyData();

export default StorageService;
