import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookingProvider } from './context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

// Components
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Services from './components/Services';
import Offers from './components/Offers';
import Gallery from './components/Gallery';
import Instagram from './components/Instagram';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import WorkingHours from './components/WorkingHours';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import BookingModal from './components/BookingModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [isLoading]);

  return (
    <BookingProvider>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
        <Navbar />
        
        <main>
          <Hero />
          <SocialProof />
          <Services />
          <Offers />
          <Gallery />
          <Instagram />
          <Team />
          <Testimonials />
          <FAQ />
          <WorkingHours />
          <Contact />
        </main>

        <Footer />
        <WhatsAppFloat />
        <BookingModal />
      </div>
    </BookingProvider>
  );
}

export default App;