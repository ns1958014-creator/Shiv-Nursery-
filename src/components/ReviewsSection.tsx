import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data/plantsData';
import { Review } from '../types';
import { Star, Quote, PlusCircle, CheckCircle2, MapPin, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  // New review form state
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newLocation, setNewLocation] = useState('Manwal, J&K');
  const [newPlantPurchased, setNewPlantPurchased] = useState('Grafted Fruit Plants');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRevObj: Review = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      rating: newRating,
      comment: newComment.trim(),
      date: 'Just now',
      location: newLocation.trim() || 'Jammu & Kashmir',
      verified: true,
      plantPurchased: newPlantPurchased,
    };

    setReviewsList([newRevObj, ...reviewsList]);
    setIsReviewModalOpen(false);
    setNewName('');
    setNewComment('');
  };

  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>4.9 / 5.0 Rated Nursery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-emerald-950">
              Customer <span className="text-emerald-700">Reviews</span>
            </h2>
            <p className="mt-2 text-emerald-900/70 text-base">
              See what gardeners, fruit growers, and homeowners across Jammu & Kashmir say about Shiv Nursery.
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-800 text-white font-semibold text-sm hover:bg-emerald-900 shadow-lg shadow-emerald-900/20 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-emerald-300" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviewsList.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-emerald-50/40 border border-emerald-100 shadow-md relative hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-emerald-200/60 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-emerald-950 text-base leading-relaxed italic font-serif">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-6 pt-6 border-t border-emerald-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center font-serif shadow-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                      <span>{review.name}</span>
                      {review.verified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" title="Verified Customer" />
                      )}
                    </div>
                    <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      <span>{review.location}</span>
                    </div>
                  </div>
                </div>

                {review.plantPurchased && (
                  <span className="hidden sm:inline text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                    {review.plantPurchased}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-emerald-100 shadow-2xl relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-emerald-900 hover:bg-emerald-50"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold font-serif text-emerald-950">Share Your Experience</h3>
            <p className="text-xs text-emerald-900/70 mt-1">Review your recent plant purchase at Shiv Nursery, Manwal.</p>

            <form onSubmit={handleAddReview} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-emerald-900 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-emerald-900 block mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-emerald-900 block mb-1">Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Jammu / Manwal / Udhampur"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-emerald-900 block mb-1">Plant Purchased (Optional)</label>
                <input
                  type="text"
                  value={newPlantPurchased}
                  onChange={(e) => setNewPlantPurchased(e.target.value)}
                  placeholder="e.g. Grafted Mango / Rose Bush"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-emerald-900 block mb-1">Review Message</label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tell us about the plant quality, staff help, and growth..."
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 shadow-md transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
