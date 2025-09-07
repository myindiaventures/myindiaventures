import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Shield, AlertTriangle, Users, CreditCard, MapPin } from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

export function TermsPage({ navigateToPage, darkMode, toggleDarkMode }) {
  return (
    <div className="min-h-screen pt-16">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms &
              <span className="block text-miv-cyan">CONDITIONS</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Important information about using our services and participating in adventures with MIV.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-miv-cyan" />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using My India Ventures' services, you accept and agree to be bound by the terms 
                    and provision of this agreement. These terms apply to all users of our website, booking platform, 
                    and adventure services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    If you do not agree to abide by these terms, please do not use this service. We reserve the right 
                    to change these terms at any time, and continued use of our services constitutes acceptance of any changes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-6 w-6 mr-2 text-miv-cyan" />
                    Booking and Payment Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Booking Confirmation</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      All bookings are subject to availability and confirmation. A booking is only confirmed when you 
                      receive a confirmation email from us along with payment receipt.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Payment Policy</h4>
                    <ul className="space-y-1 text-muted-foreground ml-4">
                      <li>• Full payment is required at the time of booking</li>
                      <li>• All prices are in Indian Rupees (INR) and include applicable taxes</li>
                      <li>• Payment can be made via credit/debit cards, UPI, or net banking</li>
                      <li>• We reserve the right to change prices without prior notice</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-6 w-6 mr-2 text-miv-cyan" />
                    Cancellation and Refund Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Cancellation by Participant</h4>
                    <ul className="space-y-1 text-muted-foreground ml-4">
                      <li>• 30+ days before departure: 100% refund (minus processing fees)</li>
                      <li>• 15-30 days before departure: 50% refund</li>
                      <li>• 7-15 days before departure: 25% refund</li>
                      <li>• Less than 7 days: No refund</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Cancellation by MIV</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to cancel adventures due to insufficient bookings, weather conditions, 
                      or other circumstances beyond our control. In such cases, full refunds will be provided or 
                      alternative dates offered.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-6 w-6 mr-2 text-miv-cyan" />
                    Safety and Liability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Participant Responsibilities</h4>
                    <ul className="space-y-1 text-muted-foreground ml-4">
                      <li>• Participants must be in good physical and mental health</li>
                      <li>• All medical conditions must be disclosed at the time of booking</li>
                      <li>• Participants must follow all safety instructions and guidelines</li>
                      <li>• Age restrictions apply to certain adventures</li>
                      <li>• Participants are responsible for their personal belongings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Limitation of Liability</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Adventure activities involve inherent risks. While we maintain high safety standards and 
                      comprehensive insurance, participants acknowledge these risks and agree that MIV's liability 
                      is limited to the extent permitted by law.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-6 w-6 mr-2 text-miv-cyan" />
                    Code of Conduct
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    All participants are expected to maintain respectful behavior towards fellow adventurers, 
                    guides, local communities, and the environment. We reserve the right to remove participants 
                    who violate our code of conduct without refund.
                  </p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Environmental Responsibility</h4>
                    <ul className="space-y-1 text-muted-foreground ml-4">
                      <li>• Follow Leave No Trace principles</li>
                      <li>• Respect local customs and communities</li>
                      <li>• Minimize environmental impact</li>
                      <li>• Support local conservation efforts</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-6 w-6 mr-2 text-miv-cyan" />
                    Adventure Modifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify itineraries, routes, or accommodations due to weather conditions, 
                    safety concerns, government regulations, or other factors beyond our control. Such changes will 
                    be made with participant safety and experience quality as priorities.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    No compensation will be provided for itinerary changes, but we will strive to provide 
                    equivalent value experiences whenever possible.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <FileText className="h-12 w-12 text-miv-cyan mx-auto" />
                  <h3 className="font-semibold text-foreground">Legal Agreement</h3>
                  <p className="text-sm text-muted-foreground">
                    These terms constitute a legally binding agreement between you and MIV.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Important Policies</h3>
                  <div className="space-y-2">
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
                      onClick={() => navigateToPage('faq')}
                    >
                      FAQ
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left"
                      onClick={() => navigateToPage('contact')}
                    >
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-miv-cyan mr-2" />
                    <h3 className="font-semibold text-foreground">Effective Date</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These terms are effective from January 1, 2025.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    We reserve the right to update these terms. Material changes will be communicated via email.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Governing Law</h3>
                  <p className="text-sm text-muted-foreground">
                    These terms are governed by the laws of India. Any disputes will be subject to the 
                    jurisdiction of Delhi courts.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="font-semibold text-foreground">Questions?</h3>
                  <p className="text-sm text-muted-foreground">
                    Need clarification on any terms? Our legal team is here to help.
                  </p>
                  <Button 
                    className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white"
                    onClick={() => navigateToPage('contact')}
                  >
                    Contact Legal Team
                  </Button>
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
