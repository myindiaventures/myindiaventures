import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  Menu, Sun, Moon, User, ChevronDown, LogOut
} from 'lucide-react';
import {
  Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription
} from '../ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  DropdownMenuSeparator, DropdownMenuLabel
} from '../ui/dropdown-menu';
import { useAuth0 } from "@auth0/auth0-react";
import miv_logo from '../../assets/logo/miv_brand_logo.webp';

export function Header({ darkMode, toggleDarkMode, currentPage }) {
  const { user, isAuthenticated, loginWithPopup, logout, isLoading } = useAuth0();
  
  
  const navItems = [
    { name: 'Home', page: '' },
    { name: 'Events', page: 'events' },
    { name: 'Blog', page: 'blog' },
    { name: 'About', page: 'about-us' },
    { name: 'Contact', page: 'contact-us' },
  ];

  const allPages = [
    { name: 'Events', page: 'events', description: 'Browse & book adventures' },
    { name: 'Blog', page: 'blog', description: 'Stories & guides' },
    { name: 'Gallery', page: 'gallery', description: 'Adventure photos & videos' },
    { name: 'Reviews', page: 'reviews', description: 'Customer feedback' },
    { name: 'Live Tracking', page: 'live-tracking', description: 'Real-time GPS tracking' },
    { name: 'FAQ', page: 'faq', description: 'Common questions' },
    { name: 'User Dashboard', page: 'user-dashboard', description: 'Your adventure hub' },
    { name: 'Guide Dashboard', page: 'guide-dashboard', description: 'Guide management' },
    { name: 'Admin Panel', page: 'admin-panel', description: 'System administration' },
    { name: 'Payment', page: 'payment', description: 'Secure checkout' },
    { name: 'Reports', page: 'reports', description: 'Analytics & insights' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:h-20 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-miv-cyan rounded-2xl p-0.25">
              <img src={miv_logo} alt="MIV Logo" className="bg-cover h-12 w-12 rounded-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold md:text-xl text-lg text-foreground">MIV</span>
              <span className="md:text-md text-sm text-muted-foreground -mt-1">Adventure Awaits</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={`/${item.page}`}
                className={`transition-colors duration-200 font-medium md:text-lg cursor-pointer text-md ${
                  currentPage === item.page
                    ? 'text-miv-cyan'
                    : 'text-foreground hover:text-miv-cyan'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* All Features Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden lg:flex">
                  All Features
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Our functionalities</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allPages.map((page) => (
                  <DropdownMenuItem key={page.page} asChild>
                    <Link to={`/${page.page}`} className="cursor-pointer block">
                      <div className="hover:text-blue-400 group">
                        <div className="font-medium">{page.name}</div>
                        <div className="text-xs text-muted-foreground group-hover:text-gray-400">
                          {page.description}
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="md"
              onClick={toggleDarkMode}
              className="rounded-full p-2 h-8 w-8 cursor-pointer"
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>

            {/* Auth Section */}
            {isLoading ? (
              <div className="text-muted-foreground text-sm">Loading...</div>
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-border"
                    />
                    <span className="hidden sm:inline font-medium">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
                  <div className="px-3 py-2 text-sm text-muted-foreground truncate">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/user-dashboard" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" /> My Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    className="cursor-pointer text-red-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => loginWithPopup()}
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Access all pages and features of My India Ventures
                </SheetDescription>

                <div className="flex flex-col space-y-6 mt-6">
                  <Link to="/" className="flex items-center space-x-2 cursor-pointer ml-4">
                    <div className="bg-miv-cyan rounded-2xl p-0.25">
                      <img src={miv_logo} alt="MIV Logo" className="bg-cover h-12 w-12 rounded-2xl" />
                    </div>
                    <span className="font-bold text-xl">My India Ventures</span>
                  </Link>

                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={`/${item.page}`}
                        className={`text-left transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-accent ${
                          currentPage === item.page
                            ? 'text-miv-cyan bg-miv-cyan/10'
                            : 'text-foreground hover:text-miv-cyan'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <div className="border-t border-border my-4"></div>
                    <div className="text-sm font-medium text-muted-foreground px-4">All Features</div>

                    {allPages.map((page) => (
                      <Link
                        key={page.page}
                        to={`/${page.page}`}
                        className="text-left transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-accent text-foreground hover:text-miv-cyan"
                      >
                        <div className="text-sm font-medium">{page.name}</div>
                        <div className="text-xs text-muted-foreground">{page.description}</div>
                      </Link>
                    ))}
                  </nav>

                  {!isAuthenticated ? (
                    <Button
                      className="bg-miv-cyan hover:bg-miv-sky-blue text-white"
                      onClick={() => loginWithPopup()}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Get Started
                    </Button>
                  ) : (
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() =>
                        logout({ logoutParams: { returnTo: window.location.origin } })
                      }
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
