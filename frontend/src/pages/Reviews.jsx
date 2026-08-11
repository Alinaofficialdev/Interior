import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { apiFetch } from '../services/api';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(5.0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await apiFetch('/reviews');
        if (res.success) {
          setReviews(res.data);
          if (res.meta && res.meta.averageRating) {
            setAvgRating(res.meta.averageRating);
          }
        }
      } catch (e) {
        console.error('Error fetching reviews:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="page-offset pb-20">
      
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#C4795A] font-semibold text-xs uppercase tracking-widest">Client Feedback</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-2">Reviews & Testimonials</h1>
          <div className="mt-4 flex items-center justify-center space-x-2 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="text-white text-lg font-bold ml-2">{avgRating} / 5.0 Rating</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm animate-pulse">
                <div className="h-4 bg-stone-200 rounded w-24 mb-4" />
                <div className="h-4 bg-stone-200 rounded mb-2" />
                <div className="h-4 bg-stone-200 rounded w-5/6 mb-2" />
                <div className="h-4 bg-stone-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div key={rev._id} className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 space-x-1 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed italic">
                    "{rev.reviewText}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-serif font-bold text-stone-900 text-sm">{rev.customerName}</span>
                  <span className="text-[11px] text-stone-500 font-medium px-2 py-0.5 rounded bg-stone-100">{rev.source}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-stone-600">No reviews available right now.</div>
        )}
      </section>

    </div>
  );
}
