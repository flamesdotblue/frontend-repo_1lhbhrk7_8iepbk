import React from 'react';

const STATUS_LIST = ['New', 'Active', 'In Progress', 'Resolved', 'Closed'];

export default function ITSupportDashboard({ tickets, onUpdateStatus }) {
  const counts = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">IT Support Dashboard</h2>
        <p className="text-sm text-gray-600">View all raised tickets and update their statuses. Click “Mark Active” to acknowledge a new ticket immediately.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {STATUS_LIST.map((s) => (
          <div key={s} className="bg-white/70 backdrop-blur border rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500">{s}</div>
            <div className="text-lg font-semibold">{counts[s] || 0}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {tickets.length === 0 && (
          <div className="bg-white/70 backdrop-blur border rounded-xl p-6 text-center text-gray-600">
            No tickets yet.
          </div>
        )}
        {tickets.map((t) => (
          <div key={t.id} className="bg-white/70 backdrop-blur border rounded-xl p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 border">{t.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    t.status === 'Resolved' || t.status === 'Closed' ? 'bg-green-50 border-green-200 text-green-700' :
                    t.status === 'Active' || t.status === 'In Progress' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                    'bg-blue-50 border-blue-200 text-blue-700'
                  }`}>{t.status}</span>
                  <span className="text-xs text-gray-500">• {new Date(t.createdAt).toLocaleString()}</span>
                </div>
                <div className="mt-1 font-medium text-gray-900">{t.issueType} — {t.priority} priority</div>
                <div className="text-sm text-gray-600 line-clamp-2">{t.description || 'No description provided.'}</div>
                <div className="text-xs text-gray-500 mt-1">From: {t.name || 'Unknown'} ({t.employeeId}) • {t.department || '—'} • {t.location || '—'}</div>
              </div>
              <div className="flex items-center gap-2">
                {t.status === 'New' && (
                  <button
                    onClick={() => onUpdateStatus(t.id, 'Active')}
                    className="px-3 py-2 rounded-lg bg-amber-600 text-white text-sm hover:bg-amber-700"
                  >
                    Mark Active
                  </button>
                )}
                <select
                  value={t.status}
                  onChange={(e) => onUpdateStatus(t.id, e.target.value)}
                  className="px-3 py-2 rounded-lg border text-sm"
                >
                  {STATUS_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {t.attachments && (
              <div className="mt-3 text-sm">
                <a href={t.attachments} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                  View attachment
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
