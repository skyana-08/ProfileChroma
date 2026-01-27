import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'; // Add useRef import
import AboutModal from '../Components/AboutModal';
import CVModal from '../Components/CVModal'; // Add CVModal import
import { Menu, X } from 'lucide-react';
import background2 from '../assets/background2.png';

export default function HeaderandFooter() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false); // Add CV modal state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Create refs for menu button and menu container
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const openAboutModal = () => {
    setIsAboutModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const openCVModal = () => {
    setIsCVModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeAboutModal = () => setIsAboutModalOpen(false);
  const closeCVModal = () => setIsCVModalOpen(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both menu button AND menu container
      if (isMobileMenuOpen && 
          menuButtonRef.current && 
          mobileMenuRef.current &&
          !menuButtonRef.current.contains(event.target) && 
          !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Use mousedown instead of click
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const navLinkClasses = "text-white text-base lg:text-lg font-bold font-akshar tracking-tight relative group cursor-pointer";
  const mobileNavLinkClasses = "text-white text-2xl sm:text-3xl font-bold font-akshar tracking-tight relative group cursor-pointer py-2 px-4 block";

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <p className="text-white text-xl sm:text-2xl font-bold font-akshar tracking-tight cursor-pointer hover:text-orange-300 transition-colors">
              Chroma<span className="text-orange-400">.</span>
            </p>
          </Link>

          <nav className="hidden md:flex gap-6 lg:gap-8">
            <Link to="/" className={navLinkClasses}>
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/works" className={navLinkClasses}>
              <span className="relative z-10">Works</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <button onClick={openAboutModal} className={navLinkClasses}>
              <span className="relative z-10">About me</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          <button 
            ref={menuButtonRef} // Add ref here
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 focus:outline-none menu-button transition-transform hover:scale-110"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div 
          ref={mobileMenuRef} // Add ref here
          className={`md:hidden mobile-menu-container fixed inset-0 z-40 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className={`absolute inset-0 transition-all duration-300 ${
              isMobileMenuOpen ? 'backdrop-blur-md bg-black/40' : 'backdrop-blur-0 bg-black/0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div 
            className={`absolute inset-0 pt-16 transition-all duration-300 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${background2})` }}
            />
            
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8">
              <div style={{ transitionDelay: isMobileMenuOpen ? '100ms' : '0ms' }}>
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses}
                >
                  <span className="relative z-10 hover:text-orange-300 transition-colors">Home<span className="text-orange-400">.</span></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
              
              <div style={{ transitionDelay: isMobileMenuOpen ? '200ms' : '0ms' }}>
                <Link 
                  to="/works" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses}
                >
                  <span className="relative z-10 hover:text-orange-300 transition-colors">Works<span className="text-orange-400">.</span></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
              
              <div style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}>
                <button onClick={openAboutModal} className={mobileNavLinkClasses}>
                  <span className="relative z-10 hover:text-orange-300 transition-colors">About me<span className="text-orange-400">.</span></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add both modals */}
      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={closeAboutModal}
        onOpenCV={openCVModal} // Pass function to open CV modal
      />
      
      <CVModal 
        isOpen={isCVModalOpen} 
        onClose={closeCVModal}
        onOpenAbout={openAboutModal} // Pass function to open About modal
      />
    </>
  );
}