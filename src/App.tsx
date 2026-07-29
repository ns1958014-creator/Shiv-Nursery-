import React, { useState } from 'react';
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
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { InquiryItem, Plant, CategoryType } from './types';

export default function App() {
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);
  const [isInquiryDrawerOpen, setIsInquiryDrawerOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [quickViewPlant, setQuickViewPlant] = useState<Plant | null>(null);

  // Add plant to inquiry bag
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
      />

      {/* Quick View Care Details Modal */}
      <QuickViewModal
        plant={quickViewPlant}
        onClose={() => setQuickViewPlant(null)}
        onAddToInquiry={handleAddToInquiry}
        isInBag={quickViewPlant ? isInBag(quickViewPlant.id) : false}
      />

      {/* Fixed WhatsApp Floating Chat Widget */}
      <WhatsAppFloatingButton />
    </div>
  );
}
