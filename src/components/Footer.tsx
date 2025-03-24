
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">SimpleSanskrit</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Making ancient wisdom accessible through simple translations and explanations.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-sm hover:underline">Bhagavad Gita</Link></li>
              <li><Link to="/explore" className="text-sm hover:underline">Upanishads</Link></li>
              <li><Link to="/explore" className="text-sm hover:underline">Vedas</Link></li>
              <li><Link to="/explore" className="text-sm hover:underline">Popular Verses</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">About</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:underline">Our Mission</Link></li>
              <li><Link to="/about" className="text-sm hover:underline">Contact</Link></li>
              <li><Link to="/about" className="text-sm hover:underline">Privacy</Link></li>
              <li><Link to="/about" className="text-sm hover:underline">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} SimpleSanskrit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
