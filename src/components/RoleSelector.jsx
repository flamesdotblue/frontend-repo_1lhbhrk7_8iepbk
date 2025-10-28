import React, { useState } from 'react';

export default function RoleSelector({ onLogin }) {
  const [role, setRole] = useState('employee');
  const [employeeId, setEmployeeId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeId.trim()) return;
    onLogin({ role, employeeId: employeeId.trim() });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/60 backdrop-blur rounded-2xl shadow-xl border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          IT Assist Tracking System
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose who you are
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('employee')}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition ${
                  role === 'employee'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                }`}
              >
                Employee
              </button>
              <button
                type="button"
                onClick={() => setRole('it')}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition ${
                  role === 'it'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
                }`}
              >
                IT Support
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {role === 'employee' ? 'Employee ID' : 'IT Staff ID'}
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter your ID"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Use your employee ID to enter. Employees can raise tickets; IT staff can manage and update ticket statuses.
        </p>
      </div>
    </div>
  );
}
