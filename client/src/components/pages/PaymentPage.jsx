import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/seperator'; // Assuming 'seperator' is a typo for 'separator'
import { Checkbox } from '../ui/checkbox';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import {
  Shield, CheckCircle, Calendar, MapPin, Users, Clock, ArrowLeft, Lock, Smartphone, Mail, User, Loader2, AlertTriangle
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';
import miv_logo from '../../../src/assets/logo/miv_brand_logo.webp';
import axios from 'axios';
import { useParams } from "react-router-dom";
import koraigad01 from '../../assets/locations/koraigad01.jpg';

// ----------------------------------------------------------------------
// ⚠️ MOCK/HELPER FUNCTIONS (REPLACE WITH REAL ROUTER LOGIC)
// ----------------------------------------------------------------------

// 1. Helper function to read eventId from the URL search params (e.g., ?eventId=E001)
const getEventIdFromUrl = () => {
  // In a real application with React Router, you would use:
  // const { eventId } = useParams();
  // return eventId;
  const params = new URLSearchParams(window.location.search);
  return params.get('eventId');
};

const bookingId = "MIV-" + Date.now() + "-" + Math.floor(Math.random() * 10000);

// Helper function to load the Razorpay script
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------
export function PaymentPage({ navigateToPage, darkMode, toggleDarkMode }) {
  // Event Data State (Replaces static mock)
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form & Payment States
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [participants, setParticipants] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [customerPhone, setCustomerPhone] = useState('');

  // ----------------------------------------------------------------------
  // EFFECT: Fetch Event Details on Component Mount
  // ----------------------------------------------------------------------
  const { eventId } = useParams();

  useEffect(() => {
    if (!eventId) {
      setError("No event ID found in the URL. Please navigate from a product page.");
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://myindiaventuresserver.vercel.app/miv/events/getEvent/id/${eventId}`
        );
        if (!response.data.success) throw new Error("Failed to fetch event details");
        setBooking(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);
 // Empty dependency array means this runs only once on mount


  // ----------------------------------------------------------------------
  // PRICE CALCULATION LOGIC (useMemo) - Now depends on dynamic `booking`
  // ----------------------------------------------------------------------
  const calculatedTotals = useMemo(() => {
    if (!booking) {
      return { baseCost: 0, discount: 0, totalBookingFees: 0, processingFees: 0, gst: 0, taxes: 0, total: 0 };
    }

    const basePricePerPerson = booking.price;
    const processingRate = 0.02; // 2%
    const gstRate = 0.18; // 18%
    const bookingFeeRate = 0.025; // 2.5% per person booking fee
    const bulkDiscountRate = 0.10; // 10% discount for 5 or more participants

    const numParticipants = Math.max(1, participants || 1);

    const totalBaseCost = basePricePerPerson * numParticipants;
    const discount = numParticipants >= 5 ? totalBaseCost * bulkDiscountRate : 0;
    const subtotalAfterDiscount = totalBaseCost - discount;

    const perPersonBookingFee = basePricePerPerson * bookingFeeRate;
    const totalBookingFees = perPersonBookingFee * numParticipants;

    const processingFees = subtotalAfterDiscount * processingRate;
    const gst = processingFees * gstRate;
    const taxes = processingFees + gst;

    const finalTotal = subtotalAfterDiscount + totalBookingFees + taxes;

    return {
      baseCost: totalBaseCost,
      discount: discount,
      totalBookingFees: totalBookingFees,
      processingFees: processingFees,
      gst: gst,
      taxes: taxes,
      total: finalTotal
    };
  }, [booking, participants]); // Dependency updated to include `booking`

  const { baseCost, discount, totalBookingFees, processingFees, gst, total, taxes } = calculatedTotals;

  // ----------------------------------------------------------------------
  // PAYMENT HANDLER (Minimal changes)
  // ----------------------------------------------------------------------
  const handlePayment = async () => {
    if (loading || error || !booking) return;

    if (!isAgreed) {
      alert("Please agree to the Terms & Conditions and Privacy Policy before proceeding.");
      return;
    }

    if (!customerName || !customerEmail || !customerPhone || participants < 1) {
      alert("Please ensure all booking details (name, email, phone, and at least 1 participant) are correctly filled.");
      return;
    }

    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you offline?');
      return;
    }

    try {
      setIsProcessing(true);
      const amountInPaise = Math.ceil(total);

      const { data } = await axios.post("https://myindiaventuresserver.vercel.app/miv/payments/create-order", {
        amount: amountInPaise,
        currency: "INR",
        booking_title: booking.title,
        participants: participants,
        // ... other backend data
      });

      if (!data.success) throw new Error("Failed to create order");
      const { order } = data;

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
                // 2️⃣ Construct Booking Data
                const bookingData = {
                    bookingId:bookingId, // same one you generated earlier
                    name: customerName,
                    phone: `${countryCode}${customerPhone}`,
                    email: customerEmail,
                    eventName: booking.title,
                    participants:participants,
                    paymentDetails: {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        amount: Math.ceil(total),
                        status: "success",
                    },
                };

                // 3️⃣ Send Booking to Backend
                const saveBooking = await axios.post(
                    "https://myindiaventuresserver.vercel.app/miv/bookings/create-booking",
                    bookingData
                );

                if (saveBooking.data.success) {
                    console.log("✅ Booking saved successfully:", saveBooking.data);
                    setPaymentComplete(true);
                } else {
                    console.warn("⚠️ Booking saved but response unclear:", saveBooking.data);
                }
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
          booking_title: booking.title,
          customer_name: customerName,
          participants: participants,
          total_amount: Math.ceil(total).toLocaleString(),
        },
        theme: {
          color: "#38bdf8",
        },
      };

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


  // ----------------------------------------------------------------------
  // CONDITIONAL RENDERING: Loading, Error, or Success
  // ----------------------------------------------------------------------

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
                <p className="text-muted-foreground">Your booking for **{booking?.title || 'the event'}** has been confirmed</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                <p className="font-mono text-lg font-semibold text-foreground">{bookingId}</p>
              </div>
              <div className="space-y-3">
                {/* <Button className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white" onClick={() => navigateToPage('user-dashboard')}>
                  View My Bookings
                </Button> */}
                <a 
                    href={`https://wa.me/917021014315?text=${encodeURIComponent(
                    // 🛑 CHANGE 1: Use 'booking' instead of the undefined 'currentEvent'
                    `Hello, I have successfully booked the event: ${booking?.title} (ID: ${booking?._id}). My Booking ID is ${bookingId}. Please assist me with next steps.`
                    // 🛑 CHANGE 2: Simplified and corrected the message content.
                )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                        Confirm on WhatsApp
                    </Button>
                </a>
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
  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-muted/30 flex items-center justify-center">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex flex-col items-center p-8">
          <Loader2 className="h-10 w-10 animate-spin text-miv-cyan" />
          <h2 className="mt-4 text-xl font-semibold">Loading Event Details...</h2>
          <p className="text-muted-foreground">Please wait while we fetch your adventure details.</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen pt-16 bg-muted/30 flex items-center justify-center">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Card className="max-w-xl text-center p-8 m-4">
          <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <CardTitle>Error Loading Booking</CardTitle>
          <CardContent className="mt-4">
            <p className="text-muted-foreground mb-4">
              {error || "Could not find event details. The event ID may be invalid or missing."}
            </p>
            <Button onClick={() => navigateToPage('events')}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Go Back to Events
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // MAIN RENDER (Only runs if `!loading` and `!error` and `booking` is set)
  // ----------------------------------------------------------------------
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
            {/* Booking Summary (Uses dynamic `booking` data) */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  {/* <ImageWithFallback
                    src={booking.image}
                    alt={booking.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  /> */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{booking.title}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {booking.nextDate}
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
                        {participants} participants
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method & Customer Details (unchanged logic) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Secure Payment powered by Razorpay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Participants Input */}
                <div>
                  <label htmlFor="participants" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center mb-2">
                    <Users className="h-4 w-4 mr-2" /> Number of Participants
                  </label>
                  <Input
                    id="participants"
                    type="number"
                    // min="1"
                    placeholder="Number of participants"
                    value={participants}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setParticipants(value);
                    }}
                  />
                  {participants >= 5 && (
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      🎉 **10% Group Discount** applied!
                    </p>
                  )}
                </div>

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

                {/* Price Breakdown (Compact) - Uses dynamic calculated totals */}
                <div className="space-y-4 border p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground">Summary of Charges</h4>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Base Cost ({participants} x ₹{booking?.price?.toLocaleString()})</span>
                    <span className="font-medium">₹{baseCost.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Group Discount (10%)</span>
                      <span className="font-medium">- ₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Booking Fees (5% per person)</span>
                    <span className="font-medium">₹{totalBookingFees.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Processing Fees & Taxes (incl. GST)</span>
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
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to the <button type="button" className="text-miv-cyan hover:underline" onClick={() => navigateToPage('cancellation-and-refund-policy')}>Cancellation & Refund Policy</button> and <button type="button" className="text-miv-cyan hover:underline" onClick={() => navigateToPage('shipping-and-delivery-policy')}>Shipping & Delivery Policy</button>
                  </label>
                </div>

                {/* Payment Button */}
                <Button
                  className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white py-6 text-lg font-semibold"
                  onClick={handlePayment}
                  disabled={isProcessing || !isAgreed || !customerName || !customerEmail || !customerPhone || participants < 1}
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
            {/* Price Breakdown (Detailed) - Uses dynamic calculated totals */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Cost ({participants} x ₹{booking?.price?.toLocaleString()})</span>
                  <span className="font-medium">₹{baseCost.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span className='font-semibold'>Group Discount (10%)</span>
                    <span className="font-medium">- ₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Booking Fees (5% pp)</span>
                  <span className="font-medium">₹{totalBookingFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fees (2% on discounted subtotal)</span>
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

            {/* Other Side Content (Unchanged) */}
            <Card>
              <CardHeader><CardTitle className="flex items-center"><Shield className="h-5 w-5 mr-2 text-green-500" />Peace of Mind</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /><span className="text-muted-foreground">SSL Encrypted</span></div>
                <div className="flex items-center text-sm"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /><span className="text-muted-foreground">PCI DSS Compliant</span></div>
                <div className="flex items-center text-sm"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /><span className="text-muted-foreground">100% Secure</span></div>
                <div className="flex items-center text-sm"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /><span className="text-muted-foreground">Instant Confirmation</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Need Help?</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigateToPage('contact')}><Users className="h-4 w-4 mr-2" />Contact Support</Button>
                <div className="text-sm text-muted-foreground">Call us at <span className="font-medium text-foreground">+91 70210 14315</span> for immediate assistance</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Cancellation Policy</CardTitle></CardHeader>
              <CardContent className="text-sm space-y-2">
                <div><span className="font-medium text-foreground">Free cancellation</span><span className="text-muted-foreground"> up to 30 days before departure</span></div>
                <div><span className="font-medium text-foreground">50% refund</span><span className="text-muted-foreground"> 15-30 days before</span></div>
                <div><span className="font-medium text-foreground">25% refund</span><span className="text-muted-foreground"> 7-15 days before</span></div>
                <div><span className="font-medium text-foreground">No refund</span><span className="text-muted-foreground"> within 7 days</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}