import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Truck,          // Icon for Shipping
  Globe,          // Icon for International
  Home,           // Icon for Domestic
  Mail,           // Icon for Confirmation/Email
  Phone,          // Icon for Support
  AlertTriangle,  // Icon for Last Updated/Disclaimer
  Clock,          // Icon for Timelines
} from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

// ✅ New component for Shipping and Delivery Policy
export function ShippingAndDeliveryPolicy({ navigateToPage, darkMode, toggleDarkMode }) {
  return (
    <div className="min-h-screen pt-16">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Hero - Updated for Shipping & Delivery Policy */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Shipping &
              <span className="block text-miv-cyan">Delivery Policy</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Details on how your orders are shipped, delivery timelines, and our service commitments.
            </p>
        </div>
      </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content - Updated with Shipping Policy Points */}
            <div className="lg:col-span-3 space-y-8">
                {/* Shipping Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Truck className="h-6 w-6 mr-2 text-miv-cyan" />
                    Shipping Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="font-semibold text-miv-sky-blue flex items-center mb-3"><Globe className="h-4 w-4 mr-2" /> International Orders</p>
                  <p className="text-muted-foreground leading-relaxed pl-6 border-l-2 border-miv-cyan">
                    For **International buyers**, orders are shipped and delivered through registered international courier companies and/or International speed post only.
                  </p>
                    <p className="font-semibold text-miv-sky-blue flex items-center mt-6 mb-3"><Home className="h-4 w-4 mr-2" /> Domestic Orders</p>
                    <p className="text-muted-foreground leading-relaxed pl-6 border-l-2 border-miv-cyan">
                    For **domestic buyers**, orders are shipped through registered domestic courier companies and /or speed post only.
                  </p>
                </CardContent>
              </Card>

                {/* Processing and Shipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Clock className="h-6 w-6 mr-2 text-miv-cyan" />
                    Processing & Handover Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-4 text-muted-foreground">
                        <li>
                            **Shipment Timeline:** Orders are shipped within **0-7 days** or as per the delivery date agreed upon at the time of order confirmation. The final delivery of the shipment is subject to Courier Company / post office norms.
                        </li>
                        <li>
                            **Our Guarantee:** **Jigar Dejul Veera** only guarantees to hand over the consignment to the courier company or postal authorities within **0-7 days** from the date of the order and payment, or as per the delivery date agreed at the time of order confirmation.
                        </li>
                        <li>
                            **Delivery Liability:** Jigar Dejul Veera is **not liable for any delay in delivery** by the courier company / postal authorities once the consignment has been handed over.
                        </li>
                  </ul>
                </CardContent>
              </Card>

                {/* Delivery Confirmation & Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Mail className="h-6 w-6 mr-2 text-miv-cyan" />
                    Delivery Confirmation and Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ul className="space-y-4 text-muted-foreground">
                        <li>
                            **Delivery Address:** Delivery of all orders will be to the **address provided by the buyer** during the ordering process.
                        </li>
                        <li>
                            **Service Confirmation:** Delivery of our services (non-physical items like bookings) will be confirmed on your **email ID** as specified during registration.
                        </li>
                        <li>
                            **Support:** For any issues in utilizing our services, you may contact our helpdesk on:
                            <div className="mt-2 space-y-1 ml-4 font-medium text-foreground">
                                <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-miv-cyan" /> +91 70210 14315</p>
                                <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-miv-cyan" /> support@myindiaventures.com</p>
                            </div>
                        </li>
                    </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <Truck className="h-12 w-12 text-miv-cyan mx-auto" />
                  <h3 className="font-semibold text-foreground">Fast Handover</h3>
                  <p className="text-sm text-muted-foreground">
                    We commit to handing over your order to the courier within **0-7 days** of payment.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Need Assistance?</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact our team for service-related delivery issues or general support.
                  </p>
                  <Button 
                    className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white"
                    onClick={() => navigateToPage('contact')}
                  >
                    Contact Customer Support
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-miv-cyan mr-2" />
                    <h3 className="font-semibold text-foreground">Last Updated</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This Shipping & Delivery Policy was last updated on **Oct 7, 2025**.
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