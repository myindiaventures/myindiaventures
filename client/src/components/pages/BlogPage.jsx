import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  MessageCircle, 
  Share2,
  Play,
  TrendingUp,
  BookOpen,
  Video
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';

export function BlogPage({ navigateToPage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "My First Himalayan Trek: Lessons from the Mountains",
      excerpt: "What I learned during my 12-day journey to Everest Base Camp and how it changed my perspective on adventure travel.",
      author: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1573496267526-8fba73ad0b87",
        role: "Adventure Enthusiast"
      },
      image: "https://images.unsplash.com/photo-1571648393873-29bad2324860",
      category: "stories",
      tags: ["Trekking", "Himalayas", "Personal Growth"],
      publishDate: "2025-01-28",
      readTime: "8 min read",
      likes: 127,
      comments: 23,
      type: "article"
    },
    {
      id: 2,
      title: "Essential Gear Guide for Himalayan Treks",
      excerpt: "A comprehensive guide to choosing the right equipment for high-altitude adventures, tested by our expert guides.",
      author: {
        name: "MIV Expert Team",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        role: "Adventure Guides"
      },
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f",
      category: "tips",
      tags: ["Gear", "Preparation", "Safety"],
      publishDate: "2025-01-25",
      readTime: "12 min read",
      likes: 89,
      comments: 15,
      type: "article"
    },
    {
      id: 3,
      title: "Capturing the Perfect Adventure Moment",
      excerpt: "Professional photography tips for documenting your adventures, from sunrise shots to action sequences.",
      author: {
        name: "Arjun Singh",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        role: "Adventure Photographer"
      },
      image: "https://images.unsplash.com/photo-1592490930965-c9d525c8cd53",
      category: "tips",
      tags: ["Photography", "Tips", "Adventure"],
      publishDate: "2025-01-22",
      readTime: "6 min read",
      likes: 156,
      comments: 31,
      type: "article"
    },
    {
      id: 4,
      title: "Valley of Flowers: A Visual Journey",
      excerpt: "Experience the breathtaking beauty of this UNESCO World Heritage site through our latest expedition video.",
      author: {
        name: "MIV Media Team",
        avatar: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
        role: "Video Production"
      },
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      category: "videos",
      tags: ["Valley of Flowers", "Nature", "UNESCO"],
      publishDate: "2025-01-20",
      readTime: "15 min watch",
      likes: 245,
      comments: 42,
      type: "video"
    },
    {
      id: 5,
      title: "Monsoon Trekking: Safety and Beauty Combined",
      excerpt: "Discover the lush beauty of monsoon treks while staying safe with our comprehensive guide to rainy season adventures.",
      author: {
        name: "Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        role: "Senior Guide"
      },
      image: "https://images.unsplash.com/photo-1440581572325-0bea30075d9d",
      category: "tips",
      tags: ["Monsoon", "Safety", "Seasonal Trekking"],
      publishDate: "2025-01-18",
      readTime: "10 min read",
      likes: 98,
      comments: 18,
      type: "article"
    },
    {
      id: 6,
      title: "Solo Female Traveler's Guide to Adventure",
      excerpt: "Empowering solo female adventurers with safety tips, confidence-building advice, and inspiring stories from the trail.",
      author: {
        name: "Anita Verma",
        avatar: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
        role: "Solo Adventure Specialist"
      },
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
      category: "stories",
      tags: ["Solo Travel", "Female Empowerment", "Safety"],
      publishDate: "2025-01-15",
      readTime: "7 min read",
      likes: 189,
      comments: 35,
      type: "article"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Posts', icon: BookOpen },
    { value: 'stories', label: 'Adventure Stories', icon: User },
    { value: 'tips', label: 'Tips & Guides', icon: TrendingUp },
    { value: 'videos', label: 'Videos', icon: Video }
  ];

  const trendingTags = [
    "Himalayas", "Safety", "Photography", "Solo Travel", "Monsoon", 
    "Gear Guide", "Base Camp", "Valley of Flowers", "River Rafting"
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Adventure
            <span className="block text-miv-cyan">STORIES & GUIDES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Real stories, expert tips, and inspiring content from India's adventure community
          </p>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stories, tips, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Categories */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                {categories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <TabsTrigger key={category.value} value={category.value} className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>

            {/* Trending Tags */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-foreground mb-4">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-miv-cyan hover:text-white transition-colors"
                    onClick={() => setSearchTerm(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              {filteredPosts.length} Posts Found
            </h2>
            <Button variant="outline" className="hidden md:flex">Latest First</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Posts */}
            <div className="lg:col-span-2 space-y-8">
              {filteredPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="bg-white/90 rounded-full p-4">
                          <Play className="h-8 w-8 text-miv-navy" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-miv-cyan text-white">
                        {categories.find(c => c.value === post.category)?.label}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-miv-cyan transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-foreground">{post.author.name}</div>
                          <div className="text-xs text-muted-foreground">{post.author.role}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📖</div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">No posts found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or browse different categories.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Featured Story */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-foreground">Featured Story</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa"
                    alt="Featured story"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <h4 className="font-semibold text-foreground">From Zero to Hero: My Mountaineering Journey</h4>
                  <p className="text-sm text-muted-foreground">How a desk job led to conquering India's highest peaks...</p>
                  <Button variant="outline" size="sm" className="w-full">Read More</Button>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-foreground">Popular Tags</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {trendingTags.slice(0, 6).map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-miv-cyan hover:text-white transition-colors"
                        onClick={() => setSearchTerm(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-foreground">Stay Updated</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Get the latest adventure stories and tips delivered to your inbox.
                  </p>
                  <Input placeholder="Your email address" />
                  <Button className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white">
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
