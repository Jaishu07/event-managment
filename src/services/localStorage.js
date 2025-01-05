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
const dummyEvents = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year!',
    date: '2024-02-15',
    time: '09:00',
    location: 'ies university campus',
    price: 1999,
    capacity: 500,
    image: 'https://i.imghippo.com/files/vqGv7904mag.webp',
    organizer: 'Admin'
  },
  {
    id: '2',
    title: 'AI Summit 2025',
    description: 'Explore the future of Artificial Intelligence and Machine Learning!',
    date: '2024-03-20',
    time: '10:00',
    location: 'ies university campus',
    price: 2499,
    capacity: 300,
    image: 'https://i.imghippo.com/files/vqGv7904mag.webp',
    organizer: 'Admin'
  },
  {
    id: '3',
    title: 'Web Development Workshop',
    description: 'Master modern web development techniques and frameworks!',
    date: '2024-04-10',
    time: '11:00',
    location: 'ies university campus',
    price: 1499,
    capacity: 200,
    image: 'https://i.imghippo.com/files/vqGv7904mag.webp',
    organizer: 'Admin'
  },
  {
    id: '4',
    title: 'Cybersecurity Conference',
    description: 'Learn about the latest trends in cybersecurity and network protection!',
    date: '2024-05-05',
    time: '09:30',
    location: 'ies university campus',
    price: 2999,
    capacity: 400,
    image: 'https://i.imghippo.com/files/vqGv7904mag.webp',
    organizer: 'Admin'
  },
  {
    id: '5',
    title: 'Mobile App Development Summit',
    description: 'Discover the latest mobile app development strategies and tools!',
    date: '2024-06-15',
    time: '10:30',
    location: 'ies university campus',
    price: 1799,
    capacity: 250,
    image: 'https://i.imghippo.com/files/vqGv7904mag.webp',
    organizer: 'Admin'
  }
];

const initializeDummyData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(dummyEvents));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TICKETS)) {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify([]));
  }
};

initializeDummyData();

export default StorageService;
