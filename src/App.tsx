import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedPlantsSection } from './components/FeaturedPlantsSection';
import { PlantCareFinder } from './components/PlantCareFinder';
import { WhyChooseSection } from './components/WhyChooseSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { GoogleMapSection } from './components/GoogleMapSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { InquiryDrawer } from './components/InquiryDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { InquiryItem, Plant, Order } from './types';

export default function App() {
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);
  const [isInquiryDrawerOpen, setIsInquiryDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderHistoryModalOpen, setIsOrderHistoryModalOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [quickViewPlant, setQuickViewPlant] = useState<Plant | null>(null);

  // Load saved orders from localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('shiv_nursery_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shiv_nursery_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Add plant to inquiry bag / cart
  const handleAddToInquiry = (plant: Plant) => {
    setInquiryItems((prev) => {
      const existing = prev.find((item) => item.plant.id === plant.id);
      if (existing) {
        return prev.map((item) =>
          item.plant.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { plant, quantity: 1 }];
    });
  };

  // Direct Buy Now handler
  const handleBuyNow = (plant: Plant) => {
    if (!isInBag(plant.id)) {
      handleAddToInquiry(plant);
    }
    setIsCheckoutModalOpen(true);
  };

  // Order completion handler
  const handleOrderComplete = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setInquiryItems([]); // Clear cart
  };

  // Update quantity in inquiry bag
  const handleUpdateQuantity = (plantId: string, delta: number) => {
    setInquiryItems((prev) =>
      prev
        .map((item) => {
          if (item.plant.id === plantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as InquiryItem[]
    );
  };

  // Remove single item
  const handleRemoveItem = (plantId: string) => {
    setInquiryItems((prev) => prev.filter((item) => item.plant.id !== plantId));
  };

  // Clear all
  const handleClearAllInquiries = () => {
    setInquiryItems([]);
  };

  // Check if plant in bag
  const isInBag = (plantId: string) => {
    return inquiryItems.some((item) => item.plant.id === plantId);
  };

  // Handle category filter selection
  const handleSelectCategory = (categoryTitle: string) => {
    setSelectedCategoryFilter(categoryTitle);
    const targetEl = document.getElementById('plants');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-emerald-950 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Scroll Progress Bar at Viewport Top */}
      <ScrollProgressBar />

      {/* Sticky Top Navbar */}
      <Navbar
        inquiryItems={inquiryItems}
        onOpenInquiryDrawer={() => setIsInquiryDrawerOpen(true)}
        onNavigateCategory={handleSelectCategory}
        onOpenOrderHistory={() => setIsOrderHistoryModalOpen(true)}
        orderCount={orders.length}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. About Us */}
        <AboutSection />

        {/* 3. Categories Section */}
        <CategoriesSection onSelectCategory={handleSelectCategory} />

        {/* 4. Featured Plants Catalog */}
        <FeaturedPlantsSection
          selectedCategoryFilter={selectedCategoryFilter}
          onSelectCategoryFilter={setSelectedCategoryFilter}
          onQuickView={(plant) => setQuickViewPlant(plant)}
          onAddToInquiry={handleAddToInquiry}
          isInBag={isInBag}
        />

        {/* Plant Finder / Care Calculator Widget */}
        <PlantCareFinder onSelectPlant={(plant) => setQuickViewPlant(plant)} />

        {/* 5. Why Choose Shiv Nursery */}
        <WhyChooseSection />

        {/* 6. Gallery */}
        <GallerySection />

        {/* 7. Customer Reviews */}
        <ReviewsSection />

        {/* 8. Contact Section */}
        <ContactSection />

        {/* 9. Google Map */}
        <GoogleMapSection />

        {/* 10. Contact Inquiry Form */}
        <ContactForm />
      </main>

      {/* 11. Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Inquiry Drawer Slide-out */}
      <InquiryDrawer
        isOpen={isInquiryDrawerOpen}
        onClose={() => setIsInquiryDrawerOpen(false)}
        items={inquiryItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAllInquiries}
        onOpenCheckout={() => setIsCheckoutModalOpen(true)}
      />

      {/* Checkout & Instant Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        items={inquiryItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderComplete={handleOrderComplete}
      />

      {/* Order History & Track Orders Modal */}
      <OrderHistoryModal
        isOpen={isOrderHistoryModalOpen}
        onClose={() => setIsOrderHistoryModalOpen(false)}
        orders={orders}
      />

      {/* Quick View Care Details Modal */}
      <QuickViewModal
        plant={quickViewPlant}
        onClose={() => setQuickViewPlant(null)}
        onAddToInquiry={handleAddToInquiry}
        isInBag={quickViewPlant ? isInBag(quickViewPlant.id) : false}
        onBuyNow={(plant) => handleBuyNow(plant)}
      />

      {/* Fixed WhatsApp Floating Chat Widget */}
      <WhatsAppFloatingButton />
    </div>
  );
}
