import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Header} from '../layout/Header'
import { Footer } from '../layout/Footer'
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Mountain,
  Users,
  Shield,
  Award
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';
import get_in_touch from '../../assets/bg/get_in_touch.webp'

export function ContactPage({ navigateToPage, darkMode, toggleDarkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Get instant responses to your queries",
      action: "Chat Now",
      info: "+91 93228 16749",
      color: "bg-green-500",
      available: "24/7 Available"
    },
    {
      icon: Phone,
      title: "Direct Call", 
      description: "Speak with our adventure experts",
      action: "Call Now",
      info: "+91 93228 16749",
      color: "bg-blue-500",
      available: "9 AM - 8 PM IST"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Detailed responses within 2 hours",
      action: "Send Email",
      info: "info@myindiaventures.com",
      color: "bg-purple-500",
      available: "Response in 2 hours"
    }
  ];

  const offices = [
    {
      city: "Mumbai Suburban",
      address: "Adventure Hub, Mumbai Suburban, Mumbai - 400077",
      phone: "+91 93228 16749",
      email: "info@myindiaventures.com",
      isMain: true
    },
    // {
    //   city: "Mumbai",
    //   address: "Ocean View, Bandra West, Mumbai - 400050",
    //   phone: "+91 87654 32109",
    //   email: "mumbai@myindiaventures.com",
    //   isMain: false
    // },
    // {
    //   city: "Rishikesh",
    //   address: "River Side Camp, Tapovan, Rishikesh - 249137",
    //   phone: "+91 76543 21098",
    //   email: "rishikesh@myindiaventures.com",
    //   isMain: false
    // }
  ];

  const stats = [
    { icon: Users, number: "15,000+", label: "Happy Adventurers" },
    { icon: Mountain, number: "500+", label: "Adventures Completed" },
    { icon: Shield, number: "100%", label: "Safety Record" },
    { icon: Award, number: "4.9", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen pt-16">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={get_in_touch}
            alt="Contact support"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In Touch
              <span className="block text-miv-cyan">WITH US</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Ready for your next adventure? Our team is here to help you plan the perfect expedition.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Preferred Way</h2>
            <p className="text-muted-foreground">Get instant support through multiple channels</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className={`${method.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{method.title}</h3>
                    <p className="text-muted-foreground mb-4">{method.description}</p>
                    <div className="text-sm font-medium text-foreground mb-2">{method.info}</div>
                    <Badge variant="outline" className="mb-4">{method.available}</Badge>
                    <Button className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-miv-cyan/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-miv-cyan" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">Send Us a Message</CardTitle>
                  <p className="text-muted-foreground">Fill out the form and we'll get back to you within 2 hours</p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">We'll get back to you within 2 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Inquiry Type</label>
                        <Select value={formData.inquiryType} onValueChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="booking">New Booking</SelectItem>
                            <SelectItem value="existing">Existing Booking</SelectItem>
                            <SelectItem value="custom">Custom Adventure</SelectItem>
                            <SelectItem value="group">Group Booking</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your adventure requirements..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Office Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Our Offices</h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <Card key={index} className={`${office.isMain ? 'border-miv-cyan shadow-lg' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-lg font-semibold text-foreground">{office.city}</h4>
                          {office.isMain && (
                            <Badge className="bg-miv-cyan text-white">Main Office</Badge>
                          )}
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{office.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-muted-foreground">{office.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-muted-foreground">{office.email}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Clock className="h-5 w-5 mr-2" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium text-foreground">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium text-foreground">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium text-foreground">11:00 AM - 5:00 PM</span>
                  </div>
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emergency Support</span>
                      <span className="font-medium text-miv-cyan">24/7 Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
