import React, { useState } from 'react';

export default function ReviewsSection({ reviews, onAddReview }) {
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    onAddReview({ ...form, rating: Number(form.rating), id: Date.now() });
    setForm({ name: '', rating: 5, comment: '' });
  };

  return (
    <section className="max-w-5xl mx-auto py-10">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee reviews of IT Support</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur border rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Jane Doe"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {[5,4,3,2,1].map((r) => (
                  <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea
                rows={4}
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                placeholder="Share your experience with our IT support team"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">Submit Review</button>
          </form>
        </div>

        <div className="space-y-4">
          {reviews.length === 0 && (
            <div className="bg-white/70 backdrop-blur border rounded-2xl p-6 text-gray-600">
              No reviews yet. Be the first to share feedback.
            </div>
          )}
          {reviews.map((r) => (
            <div key={r.id} className="bg-white/70 backdrop-blur border rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-900">{r.name}</div>
                <div className="text-amber-500" aria-label={`Rating: ${r.rating}`}>
                  {'★'.repeat(r.rating)}
                  <span className="text-gray-300">{'★'.repeat(5 - r.rating)}</span>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
