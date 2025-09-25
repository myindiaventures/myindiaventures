import React from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/seperator';
import { Mountain, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import miv_logo from '../../assets/logo/miv_brand_logo.webp';
import { Link } from 'react-router-dom';

export function Footer({ navigateToPage }) {
  const quickLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Events', page: 'events' },
    { name: 'Blog', page: 'blog' },
    { name: 'About Us', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  const services = [
    { name: 'Events', page: 'events' },
    { name: 'Gallery', page: 'gallery' },
    { name: 'Reviews', page: 'reviews' },
    { name: 'FAQ', page: 'faq' },
    { name: 'Live Tracking', page: 'live-tracking' },
  ];

  const legal = [
    { name: 'Privacy Policy', page: 'privacy' },
    { name: 'Terms & Conditions', page: 'terms' },
    { name: 'Contact Support', page: 'contact' },
    { name: 'User Dashboard', page: 'user-dashboard' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-miv-cyan rounded-2xl ">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                  <div className="bg-miv-cyan rounded-2xl p-0.25">
                    <img src={miv_logo} alt="MIV Logo" className="bg-cover h-12 w-12 rounded-2xl" />
                  </div>
                  
                </Link>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-foreground">My India Ventures</span>
                <span className="text-sm text-muted-foreground">Adventure Awaits</span>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              India's premier adventure platform, connecting you with breathtaking experiences, expert guides, and unforgettable memories across the country's most stunning landscapes.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-3" />
                <span className="text-sm">+91 93228 16749</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-3" />
                <span className="text-sm">info@myindiaventures.com</span>
              </div>
              <div className="flex items-start text-muted-foreground">
                <MapPin className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Adventure Hub, Sector 12<br />Mumbai Suburban, Mumbai 400077</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigateToPage(link.page)}
                  className="text-left text-muted-foreground hover:text-miv-cyan transition-colors duration-200 text-sm"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-foreground">Adventures</h3>
            <nav className="flex flex-col space-y-3">
              {services.map((service) => (
                <button
                  key={service.name}
                  onClick={() => navigateToPage(service.page)}
                  className="text-left text-muted-foreground hover:text-miv-cyan transition-colors duration-200 text-sm"
                >
                  {service.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Newsletter & Legal */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-foreground">Stay Connected</h3>
            
            {/* Newsletter Signup */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Get the latest adventure updates and exclusive offers.
              </p>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-miv-cyan"
                />
                <Button size="sm" className="bg-miv-cyan hover:bg-miv-sky-blue text-white">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Legal Links */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Legal</h4>
              <nav className="flex flex-col space-y-2">
                {legal.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => navigateToPage(link.page)}
                    className="text-left text-muted-foreground hover:text-miv-cyan transition-colors duration-200 text-xs"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 My India Ventures. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-miv-cyan transition-colors duration-200"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-miv-cyan transition-colors duration-200"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-miv-cyan transition-colors duration-200"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-miv-cyan transition-colors duration-200"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
