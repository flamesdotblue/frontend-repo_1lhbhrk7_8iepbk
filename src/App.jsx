import React, { useEffect, useState } from 'react';
import RoleSelector from './components/RoleSelector';
import EmployeeTicketForm from './components/EmployeeTicketForm';
import ITSupportDashboard from './components/ITSupportDashboard';
import ReviewsSection from './components/ReviewsSection';

export default function App() {
  const [user, setUser] = useState(null); // { role: 'employee'|'it', employeeId: string }
  const [tickets, setTickets] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [view, setView] = useState('landing');

  useEffect(() => {
    // Restore simple local persistence
    const savedTickets = localStorage.getItem('tickets');
    const savedReviews = localStorage.getItem('reviews');
    if (savedTickets) setTickets(JSON.parse(savedTickets));
    if (savedReviews) setReviews(JSON.parse(savedReviews));
  }, []);

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleLogin = ({ role, employeeId }) => {
    const u = { role, employeeId };
    setUser(u);
    setView(role === 'employee' ? 'employee' : 'it');
  };

  const logout = () => {
    setUser(null);
    setView('landing');
  };

  const addTicket = (ticket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  const updateTicketStatus = (id, status) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const addReview = (review) => {
    setReviews((prev) => [review, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-emerald-50">
      <header className="sticky top-0 z-10 bg-white/60 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">IT</div>
            <div>
              <div className="font-semibold text-gray-900">IT Assist</div>
              <div className="text-xs text-gray-500">Tracking System</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-sm text-gray-700 hidden sm:inline">Logged in as {user.role === 'it' ? 'IT Support' : 'Employee'} • {user.employeeId}</span>
                <button onClick={logout} className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50">Logout</button>
              </>
            ) : (
              <button onClick={() => setView('landing')} className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50">Home</button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {view === 'landing' && (
          <RoleSelector onLogin={handleLogin} />
        )}

        {view === 'employee' && user && user.role === 'employee' && (
          <EmployeeTicketForm
            employeeId={user.employeeId}
            onSubmit={(ticket) => addTicket(ticket)}
            onCancel={() => setView('landing')}
          />
        )}

        {view === 'it' && user && user.role === 'it' && (
          <ITSupportDashboard tickets={tickets} onUpdateStatus={updateTicketStatus} />
        )}

        {/* Reviews section is visible to everyone */}
        <ReviewsSection reviews={reviews} onAddReview={addReview} />
      </main>

      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} IT Assist — Designed for fast, simple ticket tracking.
      </footer>
    </div>
  );
}
