/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Menu, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronRight,
  Star,
  Github,
  Twitter,
  Instagram,
  Facebook
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, Product } from './data';

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold tracking-tighter text-brand-700">AVOS</h1>
              <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
                <a href="#" className="hover:text-brand-600 transition-colors">New Arrivals</a>
                <a href="#" className="hover:text-brand-600 transition-colors">Categories</a>
                <a href="#" className="hover:text-brand-600 transition-colors">Deals</a>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <User className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[500px] overflow-hidden bg-brand-950">
          <img 
            src="https://picsum.photos/seed/tech-blue/1920/1080" 
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/30">
                Limited Edition
              </span>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                Elevate Your <span className="text-brand-400">Experience</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Discover the next generation of premium tech and lifestyle essentials. 
                Designed for those who demand excellence.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg transition-all transform hover:scale-105">
                  Shop Now
                </button>
                <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg backdrop-blur-sm transition-all">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories & Products */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Featured Products</h3>
              <p className="text-slate-500 mt-2">Our handpicked selection for you</p>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-200' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-brand-100 transition-all duration-500"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                        <Star className="h-4 w-4 fill-current" />
                      </button>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2"
                      >
                        <Plus className="h-4 w-4" /> Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">{product.category}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-slate-600">4.9</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">{product.name}</h4>
                    <p className="text-slate-500 text-xs mt-1 line-clamp-2">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-black text-slate-900">${product.price}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="sm:hidden p-2 bg-brand-50 text-brand-600 rounded-lg"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-brand-50 py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Join the AVOS Insider</h3>
            <p className="text-slate-600 mb-8">Get exclusive access to new drops, limited editions, and special offers.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-6 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-brand-500 shadow-sm"
              />
              <button className="px-8 py-4 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <h1 className="text-3xl font-black tracking-tighter text-brand-700 mb-6">AVOS</h1>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Redefining the standard of digital commerce with curated premium essentials for the modern lifestyle.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-600 transition-colors"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-600 transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-600 transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-600 transition-colors"><Github className="h-5 w-5" /></a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-slate-900 mb-6">Shop</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-600 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Accessories</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6">Support</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-600 transition-colors">Order Status</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6">Company</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-600 transition-colors">About AVOS</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-xs">© 2026 AVOS E-Commerce. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 opacity-30 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-30 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-30 grayscale" />
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-brand-600" />
                  <h3 className="text-xl font-bold text-slate-900">Your Cart</h3>
                  <span className="px-2 py-0.5 bg-brand-50 text-brand-600 text-[10px] font-bold rounded-full">
                    {cartCount} items
                  </span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-6 bg-slate-50 rounded-full">
                      <ShoppingBag className="h-12 w-12 text-slate-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Your cart is empty</h4>
                      <p className="text-slate-500 text-sm mt-1">Looks like you haven't added anything yet.</p>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2 bg-brand-600 text-white font-bold rounded-lg"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-slate-500 text-xs mt-1">{item.category}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-slate-50 text-slate-500"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-xs font-bold text-slate-700">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-slate-50 text-slate-500"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-bold text-slate-900">${item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-bold text-slate-900">${cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Shipping</span>
                      <span className="text-green-600 font-bold uppercase text-[10px]">Free</span>
                    </div>
                    <div className="flex justify-between text-lg pt-2 border-t border-slate-200">
                      <span className="font-bold text-slate-900">Total</span>
                      <span className="font-black text-brand-700">${cartTotal}</span>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all">
                    Checkout <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
