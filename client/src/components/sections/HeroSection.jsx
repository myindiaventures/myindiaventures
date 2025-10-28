import React from 'react';
import { Button } from '../ui/button';
import { Play, Calendar, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';
import hero_bg from '../../assets/bg/hero_bg.webp'

export function HeroSection({ navigateToPage }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={hero_bg}
          alt="Mountain trekking adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-miv-navy/80 via-miv-navy/50 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 animate-float opacity-20">
        <div className="w-16 h-16 bg-miv-cyan rounded-full"></div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float opacity-10" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 bg-miv-sky-blue rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-miv-cyan/20 backdrop-blur-sm border border-miv-cyan/30 mb-6 animate-fade-in-up">
            <MapPin className="h-4 w-4 text-miv-cyan mr-2" />
            <span className="text-sm font-medium text-white">India's Premier Adventure Platform</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white md:mb-8 mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            ADVENTURE
            <span className="block text-miv-cyan ">AWAITS YOU</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-2xl text-gray-200 md:mb-12 mb-8 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Discover breathtaking treks, thrilling adventures, and unforgettable experiences across India's most
            stunning landscapes with expert guides and comprehensive safety.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <Button
              size="lg"
              className="bg-miv-cyan hover:bg-miv-sky-blue text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => navigateToPage('events')}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Explore Events
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-miv-navy px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              onClick={() =>
                window.open("https://www.instagram.com/myindiaventures/reels/", "_blank")
              }
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Stories
            </Button>

          </div>

          {/* Stats */}
          <div
            className="md:mt-16 mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-miv-cyan mb-2">50+</div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">Adventures</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-miv-cyan mb-2">1,500+</div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">Happy Trekkers</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl md:text-4xl font-bold text-miv-cyan mb-2">10+</div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">Expert Guides</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
