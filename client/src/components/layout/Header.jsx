import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Menu, Mountain, Sun, Moon, User, ChevronDown, CheckCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '../ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '../ui/dropdown-menu';

export function Header({ darkMode, toggleDarkMode, currentPage, navigateToPage }) {
  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Events', page: 'events' },
    { name: 'Blog', page: 'blog' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-miv-cyan rounded-lg p-2">
              <Mountain className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-foreground">MIV</span>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs px-2 py-0.5 hidden xl:flex">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  All Systems Active
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground -mt-1">Adventure Awaits</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigateToPage(item.page)}
                className={`transition-colors duration-200 font-medium ${
                  currentPage === item.page 
                    ? 'text-miv-cyan' 
                    : 'text-foreground hover:text-miv-cyan'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* All Pages Dropdown - Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden lg:flex">
                  All Features
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>All Working Features</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allPages.map((page) => (
                  <DropdownMenuItem
                    key={page.page}
                    onClick={() => navigateToPage(page.page)}
                    className="cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">{page.name}</div>
                      <div className="text-xs text-muted-foreground">{page.description}</div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full p-2"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Login button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex"
              onClick={() => navigateToPage('user-dashboard')}
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Access all pages and features of My India Ventures adventure platform
                </SheetDescription>
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="bg-miv-cyan rounded-lg p-2">
                      <Mountain className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-xl">My India Ventures</span>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => navigateToPage(item.page)}
                        className={`text-left transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-accent ${
                          currentPage === item.page 
                            ? 'text-miv-cyan bg-miv-cyan/10' 
                            : 'text-foreground hover:text-miv-cyan'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                    
                    {/* Divider */}
                    <div className="border-t border-border my-4"></div>
                    <div className="text-sm font-medium text-muted-foreground px-4">All Features</div>
                    
                    {/* Additional Pages */}
                    {allPages.map((page) => (
                      <button
                        key={page.page}
                        onClick={() => navigateToPage(page.page)}
                        className="text-left transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-accent text-foreground hover:text-miv-cyan"
                      >
                        <div className="text-sm font-medium">{page.name}</div>
                        <div className="text-xs text-muted-foreground">{page.description}</div>
                      </button>
                    ))}
                  </nav>

                  <Button 
                    className="bg-miv-cyan hover:bg-miv-sky-blue text-white"
                    onClick={() => navigateToPage('user-dashboard')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
