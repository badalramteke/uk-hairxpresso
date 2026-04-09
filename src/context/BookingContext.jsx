import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState('');

  const openBooking = (service = '') => {
    setInitialService(service);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setTimeout(() => setInitialService(''), 300); // clear after animation
  };

  return (
    <BookingContext.Provider value={{ isOpen, initialService, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
