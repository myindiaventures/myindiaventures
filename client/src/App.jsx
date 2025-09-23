import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// ✅ Lazy load pages
const HomePage = lazy(() => import("./components/pages/HomePage"));
const EventsPage = lazy(() => import("./components/pages/EventsPage"));
const ContactPage = lazy(() => import("./components/pages/ContactPage"));
const BlogPage = lazy(() => import("./components/pages/BlogPage"));
const AboutPage = lazy(() => import("./components/pages/AboutPage"));
const FAQPage = lazy(() => import("./components/pages/FAQPage"));
const PaymentPage = lazy(() => import("./components/pages/PaymentPage"));
const ReviewsPage = lazy(() => import("./components/pages/ReviewsPage"));
const PrivacyPolicyPage = lazy(() => import("./components/pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./components/pages/TermsPage"));

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
      {/* ✅ Suspense wrapper handles lazy loading fallback */}
      <Suspense fallback={<div className="loader">Loading...</div>}>
        <Routes>
          {/* main pages */}
          <Route
            path="/"
            element={
              <HomePage
                navigateToPage={navigateToPage}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
            }
          />
          <Route
            path="/events"
            element={
              <EventsPage
                navigateToPage={navigateToPage}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
            }
          />
          <Route
            path="/blog"
            element={
              <BlogPage
                navigateToPage={navigateToPage}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                navigateToPage={navigateToPage}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <ContactPage
                navigateToPage={navigateToPage}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
            }
          />

          {/* additional pages */}
          <Route
            path="/faq"
            element={
              <FAQPage
                navigateToPage={navigateToPage}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <PaymentPage
                navigateToPage={navigateToPage}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
            }
          />
          <Route
            path="/reviews"
            element={
              <ReviewsPage
                navigateToPage={navigateToPage}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
            }
          />
          <Route
            path="/privacy"
            element={
              <PrivacyPolicyPage
                navigateToPage={navigateToPage}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
            }
          />
          <Route
            path="/terms"
            element={
              <TermsPage
                navigateToPage={navigateToPage}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};
