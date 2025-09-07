import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';


export function PrivacyPolicyPage({ navigateToPage, darkMode, toggleDarkMode }) {
  return (
    <div className="min-h-screen pt-16">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy
              <span className="block text-miv-cyan">POLICY</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Your privacy and data security are our top priorities. Learn how we protect your information.
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
                    <Shield className="h-6 w-6 mr-2 text-miv-cyan" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information you provide directly to us when you book adventures, create an account, 
                    participate in our programs, or communicate with us. This includes:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    <li>• Personal identification information (name, email, phone number)</li>
                    <li>• Booking and payment information</li>
                    <li>• Emergency contact details</li>
                    <li>• Health and fitness information relevant to adventure activities</li>
                    <li>• Communications and feedback</li>
                    <li>• Location data during adventures (with your consent)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-6 w-6 mr-2 text-miv-cyan" />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We use the information we collect to provide, maintain, and improve our services:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    <li>• Process bookings and payments</li>
                    <li>• Provide customer support and respond to inquiries</li>
                    <li>• Ensure safety during adventures through emergency contacts and health monitoring</li>
                    <li>• Send important updates about your bookings and adventures</li>
                    <li>• Improve our services and develop new offerings</li>
                    <li>• Comply with legal obligations and protect our rights</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-6 w-6 mr-2 text-miv-cyan" />
                    Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    <li>• SSL encryption for all data transmission</li>
                    <li>• Secure payment processing through certified providers</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Limited access to personal data on a need-to-know basis</li>
                    <li>• Staff training on data protection and privacy</li>
                    <li>• Incident response procedures for data breaches</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-6 w-6 mr-2 text-miv-cyan" />
                    Information Sharing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in these limited circumstances:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    <li>• With your explicit consent</li>
                    <li>• With service providers who assist in our operations (under strict confidentiality agreements)</li>
                    <li>• For emergency purposes during adventures to ensure your safety</li>
                    <li>• To comply with legal requirements or court orders</li>
                    <li>• To protect the rights and safety of our participants and staff</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="h-6 w-6 mr-2 text-miv-cyan" />
                    Your Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    <li>• Access: Request a copy of the personal information we hold about you</li>
                    <li>• Correction: Request correction of inaccurate or incomplete information</li>
                    <li>• Deletion: Request deletion of your personal information (subject to legal requirements)</li>
                    <li>• Portability: Request transfer of your data to another service provider</li>
                    <li>• Opt-out: Unsubscribe from marketing communications at any time</li>
                    <li>• Restriction: Request limitation of processing in certain circumstances</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    To exercise these rights, please contact us at privacy@myindiaventures.com or through our contact form.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <Shield className="h-12 w-12 text-miv-cyan mx-auto" />
                  <h3 className="font-semibold text-foreground">Data Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is protected with enterprise-grade security measures and encryption.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Quick Links</h3>
                  <div className="space-y-2">
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
                      onClick={() => navigateToPage('contact')}
                    >
                      Contact Us
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left"
                      onClick={() => navigateToPage('faq')}
                    >
                      FAQ
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-miv-cyan mr-2" />
                    <h3 className="font-semibold text-foreground">Last Updated</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This privacy policy was last updated on January 1, 2025.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    We may update this policy periodically. Significant changes will be communicated via email.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="font-semibold text-foreground">Questions?</h3>
                  <p className="text-sm text-muted-foreground">
                    Have questions about our privacy practices? We're here to help.
                  </p>
                  <Button 
                    className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white"
                    onClick={() => navigateToPage('contact')}
                  >
                    Contact Privacy Team
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
