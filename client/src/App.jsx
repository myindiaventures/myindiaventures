import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Import all page components
import { HomePage } from './components/pages/HomePage';
import { EventsPage } from './components/pages/EventsPage';
import { BlogPage } from './components/pages/BlogPage';
import { ContactPage } from './components/pages/ContactPage';
import { AboutPage } from './components/pages/AboutPage';
// import { GalleryPage } from './components/pages/GalleryPage';
// import { ReviewsPage } from './components/pages/ReviewsPage';
// import { FAQPage } from './components/pages/FAQPage';
// import { PaymentPage } from './components/pages/PaymentPage';
// import { UserDashboard } from './components/pages/UserDashboard';
// import { GuideDashboard } from './components/pages/GuideDashboard';
// import { AdminPanel } from './components/pages/AdminPanel';
// import { LiveTrackingPage } from './components/pages/LiveTrackingPage';
// import { ReportsPage } from './components/pages/ReportsPage';
// import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
// import { TermsPage } from './components/pages/TermsPage';

export default function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [currentPage, setCurrentPage] = useState('home'); // no type needed in JS

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateToPage={navigateToPage} />;
      case 'events':
        return <EventsPage navigateToPage={navigateToPage} />;
      case 'blog':
        return <BlogPage navigateToPage={navigateToPage} />;
      case 'contact':
        return <ContactPage navigateToPage={navigateToPage} />;
      case 'about':
        return <AboutPage navigateToPage={navigateToPage} />;
      case 'gallery':
        return <GalleryPage navigateToPage={navigateToPage} />;
      case 'reviews':
        return <ReviewsPage navigateToPage={navigateToPage} />;
      case 'faq':
        return <FAQPage navigateToPage={navigateToPage} />;
      case 'payment':
        return <PaymentPage navigateToPage={navigateToPage} />;
      case 'user-dashboard':
        return <UserDashboard navigateToPage={navigateToPage} />;
      case 'guide-dashboard':
        return <GuideDashboard navigateToPage={navigateToPage} />;
      case 'admin-panel':
        return <AdminPanel navigateToPage={navigateToPage} />;
      case 'live-tracking':
        return <LiveTrackingPage navigateToPage={navigateToPage} />;
      case 'reports':
        return <ReportsPage navigateToPage={navigateToPage} />;
      case 'privacy':
        return <PrivacyPolicyPage navigateToPage={navigateToPage} />;
      case 'terms':
        return <TermsPage navigateToPage={navigateToPage} />;
      default:
        return <HomePage navigateToPage={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        currentPage={currentPage}
        navigateToPage={navigateToPage}
      />
      
      <main>
        {renderCurrentPage()}
      </main>

      <Footer navigateToPage={navigateToPage} />
    </div>
  );
}
