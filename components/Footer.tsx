import React from 'react';
import { Glasses, Send, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 border-t border-gray-200 mt-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Glasses className="w-6 h-6" />
          <span className="font-bold text-xl">M.K. Qoliyan</span>
        </div>

        <div className="flex items-center gap-4">
            <a href="https://t.me/MKQoliyan" target="_blank" rel="noopener noreferrer" className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                <Send size={18} className="-ml-0.5 mt-0.5" />
            </a>
            <a href="https://www.instagram.com/m.k.qoliyan/" target="_blank" rel="noopener noreferrer" className="p-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition-colors">
                <Instagram size={18} />
            </a>
            <a href="https://www.linkedin.com/in/qoliyan/" target="_blank" rel="noopener noreferrer" className="p-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition-colors">
                <Linkedin size={18} />
            </a>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mt-8 font-bold text-sm">
        <a href="#" className="hover:underline">My Free Tools</a>
        <a href="#" className="hover:underline">My Blog</a>
        <a href="#" className="hover:underline">My Free Tutorials</a>
      </div>
    </footer>
  );
};

export default Footer;
