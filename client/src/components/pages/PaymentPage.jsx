import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/seperator';
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
  Building2
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';

export function PaymentPage({ navigateToPage, darkMode, toggleDarkMode }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Mock booking data
  const booking = {
    title: "Himalayan Base Camp Trek",
    image: "https://images.unsplash.com/photo-1690842855840-0b56f4b2a208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRyZWtraW5nJTIwaGltYWxheWElMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzU2NjUyMzM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "March 15, 2025",
    duration: "12 Days",
    location: "Himachal Pradesh",
    participants: 2,
    guide: "Rajesh Kumar",
    basePrice: 45000,
    taxes: 4050,
    total: 49050
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 3000);
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
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigateToPage('events')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Complete Your Booking</h1>
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

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Secure Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-miv-cyan bg-miv-cyan/10' 
                        : 'border-border hover:border-miv-cyan/50'
                    }`}
                  >
                    <CreditCard className="h-6 w-6 mx-auto mb-2 text-miv-cyan" />
                    <div className="text-sm font-medium">Credit/Debit Card</div>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      paymentMethod === 'upi' 
                        ? 'border-miv-cyan bg-miv-cyan/10' 
                        : 'border-border hover:border-miv-cyan/50'
                    }`}
                  >
                    <Smartphone className="h-6 w-6 mx-auto mb-2 text-miv-cyan" />
                    <div className="text-sm font-medium">UPI</div>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      paymentMethod === 'netbanking' 
                        ? 'border-miv-cyan bg-miv-cyan/10' 
                        : 'border-border hover:border-miv-cyan/50'
                    }`}
                  >
                    <Building2 className="h-6 w-6 mx-auto mb-2 text-miv-cyan" />
                    <div className="text-sm font-medium">Net Banking</div>
                  </button>
                </div>

                {/* Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name</label>
                      <Input placeholder="John Doe" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">UPI ID</label>
                      <Input placeholder="yourname@upi" />
                    </div>
                    <div className="text-center py-8 border border-dashed border-border rounded-lg">
                      <div className="text-sm text-muted-foreground">Or scan QR code to pay</div>
                      <div className="w-32 h-32 bg-muted rounded-lg mx-auto mt-4 flex items-center justify-center">
                        QR Code
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Select Bank</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sbi">State Bank of India</SelectItem>
                          <SelectItem value="hdfc">HDFC Bank</SelectItem>
                          <SelectItem value="icici">ICICI Bank</SelectItem>
                          <SelectItem value="axis">Axis Bank</SelectItem>
                          <SelectItem value="other">Other Banks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to the <button className="text-miv-cyan hover:underline" onClick={() => navigateToPage('terms')}>Terms & Conditions</button> and <button className="text-miv-cyan hover:underline" onClick={() => navigateToPage('privacy')}>Privacy Policy</button>
                  </label>
                </div>

                {/* Payment Button */}
                <Button 
                  className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white py-6 text-lg font-semibold"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ₹${booking.total.toLocaleString()}`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Price (2 people)</span>
                  <span className="font-medium">₹{booking.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="font-medium">₹{booking.taxes.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-miv-cyan">₹{booking.total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Secure Payment
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
                  Call us at <span className="font-medium text-foreground">+91 98765 43210</span> for immediate assistance
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
