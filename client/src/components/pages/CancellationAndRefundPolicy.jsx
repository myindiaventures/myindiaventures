import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  UserCheck, 
  AlertTriangle,
  RotateCcw, // Icon for Cancellation
  Receipt,   // Icon for Refund/Order
  DollarSign, // Icon for Refunds
  CalendarCheck // Icon for timelines
} from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

// ✅ Component renamed to match the new content: RefundPolicy
export function CancellationAndRefundPolicy({ navigateToPage, darkMode, toggleDarkMode }) {
  return (
    <div className="min-h-screen pt-16">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Hero - Updated for Cancellation & Refund Policy */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cancellation &
              <span className="block text-miv-cyan">Refund Policy</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              We believe in transparent customer service. Find out how we handle cancellations and refunds.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content - Updated with Refund Policy Points */}
            <div className="lg:col-span-3 space-y-8">
                {/* Policy Introduction */}
                <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <CalendarCheck className="h-6 w-6 mr-2 text-miv-cyan" />
                        Policy Overview
                      </CardTitle>
                </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            **Jigar Dejul Veera**, proprietor of My India Ventures, believes in helping its customers as far as possible, and therefore has a **liberal cancellation policy**.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            This policy outlines the conditions and timelines for order cancellation and refund processing.
                        </p>
                    </CardContent>
                </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <RotateCcw className="h-6 w-6 mr-2 text-miv-cyan" />
                    Cancellation Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-4 text-muted-foreground">
                        <li>
                            **Standard Cancellation:** Cancellations will be considered only if the request is made within **7 days of placing the order**.
                        </li>
                        <li>
                            **Service Commencement:** The cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of service delivery or shipping them.
                        </li>
                        <li>
                            **Perishable Items:** Jigar Dejul Veera does not accept cancellation requests for perishable items like flowers, eatables, etc., often associated with adventure bookings. However, refund/replacement can be made if the customer establishes that the quality of the product delivered is not good.
                        </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <AlertTriangle className="h-6 w-6 mr-2 text-miv-cyan" />
                    Defective or Damaged Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ul className="space-y-4 text-muted-foreground">
                        <li>
                            **Reporting Damage:** In case of receipt of damaged or defective items, please report the same to our **Customer Service team within 7 days of receipt of the products**.
                        </li>
                        <li>
                            **Investigation:** The refund or replacement request will be entertained only once the merchant has checked and determined the issue at their end.
                        </li>
                        <li>
                            **Deviation from Expectation:** If you feel that the product or service received is **not as shown on the site or as per your expectations**, you must bring it to the notice of our customer service within **7 days of receiving the product**. The Customer Service Team, after looking into your complaint, will take an appropriate decision.
                        </li>
                    </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <DollarSign className="h-6 w-6 mr-2 text-miv-cyan" />
                    Manufacturer Warranties & Refund Processing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ul className="space-y-4 text-muted-foreground">
                        <li>
                            **Manufacturer Issues:** In case of complaints regarding products that come with a **warranty from manufacturers**, please refer the issue directly to them.
                        </li>
                        <li>
                            **Refund Processing Time:** In case of any Refunds approved by Jigar Dejul Veera (My India Ventures), it will take **3-5 days** for the refund to be processed to the end customer.
                        </li>
                    </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Modified to remove outdated Privacy Policy links */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <DollarSign className="h-12 w-12 text-miv-cyan mx-auto" />
                  <h3 className="font-semibold text-foreground">Quick Refunds</h3>
                  <p className="text-sm text-muted-foreground">
                    Approved refunds are processed back to your original payment source within **3-5 days**.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Related Pages</h3>
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
                      onClick={() => navigateToPage('privacy')} // Assuming 'privacy' page now holds the old content or a proper Privacy Policy
                    >
                      Privacy Policy
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left"
                      onClick={() => navigateToPage('contact')}
                    >
                      Contact Us
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
                    This Cancellation & Refund Policy was last updated on **Oct 7, 2025**.
                  </p>
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