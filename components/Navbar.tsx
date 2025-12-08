import React, { useState, useEffect } from 'react';
import { Menu, X, Glasses } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const links = [
    { name: 'About', href: '#hero' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 150; // Offset to trigger change earlier
      let current = '';

      for (const link of links) {
        const id = link.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the top of the section is within a reasonable range of the viewport top
          // or if the section covers a significant portion of the viewport
          if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
            current = id;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
         // Fallback for very top
         setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 py-4">
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
            <Glasses className="w-8 h-8" strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight">M.K. Qoliyan</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors uppercase tracking-wide ${
                  isActive ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 top-full p-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            {links.map((link) => {
               const isActive = activeSection === link.href.substring(1);
               return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium ${
                    isActive ? 'text-black pl-2 border-l-4 border-black' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;