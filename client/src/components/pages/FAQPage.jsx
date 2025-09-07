import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordian';
import { Search, MessageCircle, Phone, Mail } from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

export function FAQPage({ navigateToPage, darkMode, toggleDarkMode }) {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: "Booking & Payment",
      items: [
        {
          question: "How do I book an adventure?",
          answer: "You can book through our website by selecting your preferred adventure, choosing dates, and completing the secure payment process. You'll receive instant confirmation via email."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit/debit cards, UPI payments, net banking, and digital wallets. All payments are processed through secure, encrypted gateways."
        },
        {
          question: "Can I cancel or reschedule my booking?",
          answer: "Yes, cancellations are allowed with varying refund policies based on timing. Free cancellation up to 30 days before departure, with partial refunds closer to the date."
        }
      ]
    },
    {
      category: "Safety & Preparation",
      items: [
        {
          question: "What safety measures do you have in place?",
          answer: "All our guides are certified, we maintain strict safety protocols, provide comprehensive safety briefings, carry first aid equipment, and have emergency communication systems."
        },
        {
          question: "Do I need prior trekking experience?",
          answer: "Our adventures are designed for different fitness levels. Beginner-friendly treks require no prior experience, while advanced expeditions may require previous trekking experience."
        },
        {
          question: "What should I pack for my adventure?",
          answer: "We provide detailed packing lists for each adventure. Essential items include proper footwear, weather-appropriate clothing, personal medications, and any specific gear mentioned in your itinerary."
        }
      ]
    },
    {
      category: "During the Adventure",
      items: [
        {
          question: "What is included in the package price?",
          answer: "Packages typically include accommodation, meals, professional guides, permits, safety equipment, and transportation as mentioned in the itinerary. Personal expenses are excluded."
        },
        {
          question: "Can I join if I'm traveling solo?",
          answer: "Absolutely! Many of our adventurers are solo travelers. We create a welcoming group environment where you'll make new friends and enjoy shared experiences."
        },
        {
          question: "What happens in case of bad weather?",
          answer: "Safety is our priority. In case of severe weather, we may modify routes or postpone activities. Alternative activities are provided, and safety decisions are made by experienced guides."
        }
      ]
    },
    {
      category: "Health & Fitness",
      items: [
        {
          question: "What fitness level is required?",
          answer: "Fitness requirements vary by adventure. Each listing includes a difficulty rating and fitness recommendations. We suggest regular cardio exercise and hiking preparation for most treks."
        },
        {
          question: "Are there age restrictions?",
          answer: "Age requirements vary by adventure type. Most treks welcome participants aged 16-65, but specific adventures may have different age ranges for safety reasons."
        },
        {
          question: "What if I have medical conditions?",
          answer: "Please inform us of any medical conditions during booking. Our team will assess suitability and may require medical clearance for certain high-altitude or strenuous adventures."
        }
      ]
    }
  ];

  const filteredFAQs = faqs
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen pt-16">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked
              <span className="block text-miv-cyan">QUESTIONS</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Everything you need to know about booking and experiencing adventures with MIV
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* FAQ Categories */}
              <div className="space-y-8">
                {filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h2 className="text-2xl font-bold text-foreground mb-6  mt-2">{category.category}</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.items.map((faq, faqIndex) => (
                        <AccordionItem
                          key={faqIndex}
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border border-border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🤔</div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">No FAQs found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or contact our support team.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Still Need Help */}
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="font-semibold text-foreground">Still Need Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp Chat
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open('tel:+919876543210')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Support
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigateToPage('contact')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Form
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Quick Links</h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => navigateToPage('events')}
                    >
                      Browse Adventures
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => navigateToPage('terms')}
                    >
                      Terms & Conditions
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => navigateToPage('privacy')}
                    >
                      Privacy Policy
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => navigateToPage('user-dashboard')}
                    >
                      My Bookings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Support Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium">9AM - 8PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">10AM - 6PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">11AM - 5PM</span>
                    </div>
                    <div className="border-t pt-2 mt-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Emergency Support</span>
                        <span className="font-medium text-miv-cyan">24/7</span>
                      </div>
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
