import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Calendar, Phone, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';

export function CTASection({ navigateToPage }) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTY2NTMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mountain sunset adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-miv-navy/90 to-miv-navy/70"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-miv-cyan/20 backdrop-blur-sm border border-miv-cyan/30 mb-8">
            <Sparkles className="h-4 w-4 text-miv-cyan mr-2" />
            <span className="text-sm font-medium text-white">Start Your Adventure Today</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready for Your Next
            <span className="block text-miv-cyan">ADVENTURE?</span>
          </h2>

          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Join thousands of adventurers who have discovered India's most incredible landscapes. Your unforgettable journey starts with just one click.
          </p>

          {/* Action Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-miv-cyan/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-8 w-8 text-miv-cyan" />
                </div>
                <h3 className="font-semibold text-white mb-2">Book Online</h3>
                <p className="text-gray-300 text-sm">Browse and book your perfect adventure in just a few clicks</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-miv-cyan/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="h-8 w-8 text-miv-cyan" />
                </div>
                <h3 className="font-semibold text-white mb-2">Call Direct</h3>
                <p className="text-gray-300 text-sm">Speak with our adventure experts for personalized recommendations</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-miv-cyan/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-8 w-8 text-miv-cyan" />
                </div>
                <h3 className="font-semibold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-300 text-sm">Quick answers and instant booking support via WhatsApp</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-miv-cyan hover:bg-miv-sky-blue text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 group"
              onClick={() => navigateToPage('events')}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Your Adventure
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-miv-navy px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 group"
              onClick={() => navigateToPage('contact')}
            >
              <Phone className="h-5 w-5 mr-2" />
              Call +91 98765 43210
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="text-center">
              <div className="text-sm text-white font-medium">100% Safe</div>
              <div className="text-xs text-gray-300">Certified Guides</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white font-medium">24/7 Support</div>
              <div className="text-xs text-gray-300">Emergency Assistance</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white font-medium">Easy Booking</div>
              <div className="text-xs text-gray-300">Instant Confirmation</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white font-medium">Best Price</div>
              <div className="text-xs text-gray-300">Guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
