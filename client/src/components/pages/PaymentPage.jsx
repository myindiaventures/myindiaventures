import React, { useState, useMemo } from 'react'; // 💡 useMemo added for complex calculations
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/seperator'; // ✅ FIX: Corrected import path
import { Checkbox } from '../ui/checkbox';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import {
  CreditCard,
  Shield,
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Lock,
  Smartphone,
  Building2,
  Mail, // 💡 Added for email icon
  User // 💡 Added for name icon
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';
import miv_logo from '../../../src/assets/logo/miv_brand_logo.webp';
import axios from 'axios';
import koraigad01 from '../../assets/locations/koraigad01.png';

// 💡 Helper function to load the Razorpay script
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function PaymentPage({ navigateToPage, darkMode, toggleDarkMode }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false); // 💡 State for the terms checkbox

  // 💡 States for user details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India
  const [customerPhone, setCustomerPhone] = useState('');

  // Mock booking data with corrected structure
  const booking = {
    title: "Koraigad Fort Trek",
    image: koraigad01 || "https://images.unsplash.com/photo-1690842855840-0b56f4b2a208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRyZkFsbCUyMGhpbWFsYXlhJTIwYWR2ZW50dXJl2fHwxNzU2NjUyMzM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "November 16, 2025",
    duration: "1 Day",
    location: "Koraigad Fort Maharashtra",
    participants: 1,
    basePrice: 1250, // 💡 Set a reasonable base price
  };

  // 💡 Use useMemo to correctly calculate totals based on basePrice
  const calculatedTotals = useMemo(() => {
    const processingRate = 0.02; // 2%
    const gstRate = 0.18; // 18%

    const processingFees = booking.basePrice * processingRate;
    const gst = processingFees * gstRate;
    const taxes = processingFees + gst;
    const total = booking.basePrice + taxes;

    return {
      processingFees: processingFees,
      gst: gst,
      taxes: taxes,
      total: total
    };
  }, [booking.basePrice]);

  // 💡 Destructure the calculated totals for easier use
  const { processingFees, gst, total, taxes } = calculatedTotals;

  // 💡 Replaced the original separate calculations with the single computed 'total'
  const handlePayment = async () => {
    if (!isAgreed) {
      alert("Please agree to the Terms & Conditions and Privacy Policy before proceeding.");
      return;
    }

    if (!customerName || !customerEmail || !customerPhone) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }

    // 1. Load the Razorpay script
    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you offline?');
      return;
    }

    try {
      setIsProcessing(true);

      // Step 2️⃣ Create an order (from your backend)
      // Razorpay accepts amount in paise (total * 100) - and it expects an integer, so we floor it.
      const amountInPaise = Math.ceil(total);

      const { data } = await axios.post("https://myindiaventuresserver.vercel.app/miv/payments/create-order", {
        amount: amountInPaise,
        currency: "INR", // Specify currency
      });

      if (!data.success) throw new Error("Failed to create order");
      const { order } = data;

      // Step 3️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "My India Ventures",
        description: booking.title,
        image: miv_logo,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verify = await axios.post("https://myindiaventuresserver.vercel.app/miv/payments/verify", response);
            if (verify.data.success) {
              setPaymentComplete(true);
            } else {
              alert("❌ Payment verification failed");
            }
          } catch (err) {
            console.error("Verification failed:", err);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: `${countryCode}${customerPhone}`,
        },
        notes: {
          booking_id: "MIV-2025-001247",
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: `${countryCode}${customerPhone}`,
        },
        theme: {
          color: "#38bdf8",
        },
      };

      // Step 4️⃣ Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        alert("❌ Payment Failed\n" + response.error.description);
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong while initiating payment");
    } finally {
      setIsProcessing(false);
    }
  };


  if (paymentComplete) {
    return (
      <div className="min-h-screen pt-16 bg-muted/30 flex flex-col w-full items-center justify-center">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <Card className="text-center p-8">
            <CardContent className="space-y-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful!</h1>
                <p className="text-muted-foreground">Your booking has been confirmed</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                <p className="font-mono text-lg font-semibold text-foreground">MIV-2025-001247</p>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white" onClick={() => navigateToPage('user-dashboard')}>
                  View My Bookings
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigateToPage('events')}>
                  Book Another Adventure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-muted/30">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex md:items-centeritems-start w-full mb-8 md:flex-row flex-col">
          <Button variant="ghost" onClick={() => navigateToPage('events')} className="mr-4 ">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
          <h1 className="text-3xl font-bold text-foreground md:text-start text-center w-full md:mt-0 mt-4">Complete Your Booking</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <ImageWithFallback
                    src={booking.image}
                    alt={booking.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{booking.title}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {booking.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {booking.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {booking.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {booking.participants} participants
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method (Simplified for Razorpay) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Secure Payment powered by Razorpay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Input fields for Name, Email, Phone */}
                <div className='w-full space-y-4'>
                  <div>
                    <label htmlFor="customerName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center mb-2">
                      <User className="h-4 w-4 mr-2" /> Full Name
                    </label>
                    <Input
                      id="customerName"
                      placeholder="Your Full Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="customerEmail" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center mb-2">
                      <Mail className="h-4 w-4 mr-2" /> Email Address
                    </label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="customerPhone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center mb-2">
                      <Smartphone className="h-4 w-4 mr-2" /> Phone Number
                    </label>
                    <div className="flex space-x-2">
                      <Select value={countryCode} onValueChange={setCountryCode}>
                        <SelectTrigger className="w-[80px]">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">🇮🇳 +91</SelectItem>
                          <SelectItem value="+1">🇺🇸 +1</SelectItem>
                          <SelectItem value="+44">🇬🇧 +44</SelectItem>
                          {/* Add more country codes as needed */}
                        </SelectContent>
                      </Select>
                      <Input
                        id="customerPhone"
                        type="tel"
                        placeholder="e.g., 9876543210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Breakdown (Removed duplication from sidebar, kept only essential elements) */}
                <div className="space-y-4 border p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground">Summary of Charges</h4>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Base Price ({booking.participants} people)</span>
                    <span className="font-medium">₹{booking.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Taxes & Fees (incl. GST)</span>
                    <span className="font-medium">₹{taxes.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount Payable</span>
                    <span className="text-miv-cyan">₹{Math.ceil(total).toLocaleString()}</span>
                  </div>
                </div>


                {/* Terms Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={isAgreed}
                    onCheckedChange={setIsAgreed}
                    className="mt-1" // align better with text
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to the <button type="button" className="text-miv-cyan hover:underline" onClick={() => navigateToPage('cancellation-and-refund-policy')}>Cancellation & Refund Policy</button> and <button type="button" className="text-miv-cyan hover:underline" onClick={() => navigateToPage('shipping-and-delivery-policy')}>Shipping & Delivery Policy</button>
                  </label>
                </div>

                {/* Payment Button */}
                <Button
                  className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white py-6 text-lg font-semibold"
                  onClick={handlePayment}
                  disabled={isProcessing || !isAgreed || !customerName || !customerEmail || !customerPhone}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ₹${Math.ceil(total).toLocaleString()}`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Breakdown (Simplified and corrected property names) */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Price ({booking.participants} people)</span>
                  <span className="font-medium">₹{booking.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fees (2%)</span>
                  <span className="font-medium">₹{processingFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (18% on fees)</span>
                  <span className="font-medium">₹{gst.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-miv-cyan">₹{Math.ceil(total).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Peace of Mind
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-muted-foreground">SSL Encrypted</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-muted-foreground">PCI DSS Compliant</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-muted-foreground">100% Secure</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-muted-foreground">Instant Confirmation</span>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigateToPage('contact')}>
                  <Users className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <div className="text-sm text-muted-foreground">
                  Call us at <span className="font-medium text-foreground">+91 70210 14315</span> for immediate assistance
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <span className="font-medium text-foreground">Free cancellation</span>
                  <span className="text-muted-foreground"> up to 30 days before departure</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">50% refund</span>
                  <span className="text-muted-foreground"> 15-30 days before</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">25% refund</span>
                  <span className="text-muted-foreground"> 7-15 days before</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">No refund</span>
                  <span className="text-muted-foreground"> within 7 days</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}