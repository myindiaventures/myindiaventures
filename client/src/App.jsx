import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { EventsPage } from "./components/pages/EventsPage";
import { ContactPage } from './components/pages/ContactPage'
import { BlogPage } from "./components/pages/BlogPage";
import { AboutPage } from "./components/pages/AboutPage";
import { FAQPage } from "./components/pages/FAQPage";
import { PaymentPage } from "./components/pages/PaymentPage";
import { ReviewsPage } from "./components/pages/ReviewsPage";
import { PrivacyPolicyPage } from "./components/pages/PrivacyPolicyPage";
import { TermsPage } from "./components/pages/TermsPage";
import { CancellationAndRefundPolicy } from "./components/pages/CancellationAndRefundPolicy";
import { ShippingAndDeliveryPolicy } from "./components/pages/ShippingAndDeliveryPolicy";
import { UserDashboard } from "./components/pages/UserDashboard";

export const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  // function to navigate between pages
  const navigateToPage = (page) => {
    navigate(`/${page === "home" ? "" : page}`);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
   <div>
     <Routes>
      
      {/* main pages */}
      <Route path="/" element={<HomePage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/events" element={<EventsPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/blog" element={<BlogPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/about" element={<AboutPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/contact" element={<ContactPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>

      {/* additional pages */}
      <Route path="/faq" element={<FAQPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/payment" element={<PaymentPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/user-dashboard" element={<UserDashboard navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/reviews" element={<ReviewsPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/privacy" element={<PrivacyPolicyPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/terms" element={<TermsPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/cancellation-and-refund-policy" element={<CancellationAndRefundPolicy navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/shipping-and-delivery-policy" element={<ShippingAndDeliveryPolicy navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
    </Routes>
   </div>
  );
};
