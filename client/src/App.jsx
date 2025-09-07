import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { EventsPage } from "./components/pages/EventsPage";
import { ContactPage } from './components/pages/ContactPage'
import { BlogPage } from "./components/pages/BlogPage";
import { AboutPage } from "./components/pages/AboutPage";

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
    <Routes>
      <Route path="/" element={<HomePage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/events" element={<EventsPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/blog" element={<BlogPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/about" element={<AboutPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
      <Route path="/contact" element={<ContactPage navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}/>
    </Routes>
  );
};
