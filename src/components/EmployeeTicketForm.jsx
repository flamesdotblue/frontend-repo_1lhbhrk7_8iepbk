import React, { useEffect, useState } from 'react';

const ISSUE_TYPES = [
  'Network Issue',
  'Login Issue',
  'Hardware Problem',
  'Software Bug',
  'Email/Outlook',
  'Access Request',
  'Printer/Scanner',
  'Other',
];

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

export default function EmployeeTicketForm({ employeeId, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    employeeId: employeeId || '',
    name: '',
    department: '',
    location: '',
    device: '',
    issueType: 'Network Issue',
    priority: 'Medium',
    description: '',
    allowRemote: true,
    contact: '',
    attachments: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setForm((f) => ({ ...f, employeeId: employeeId || '' }));
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticket = {
      ...form,
      status: 'New',
      createdAt: new Date().toISOString(),
      id: `TKT-${Date.now()}`,
    };
    onSubmit(ticket);
    setSubmitted(true);
    // Redirect back after a short thank-you
    setTimeout(() => {
      onCancel?.();
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur border rounded-2xl p-8 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.5 4.21A9 9 0 1020.79 16.5 9 9 0 007.5 4.21z"/></svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Thank you!</h3>
        <p className="text-gray-600 mt-2">We received your ticket and will resolve your problem soon.</p>
        <p className="text-sm text-gray-500 mt-1">Redirecting you back...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Raise a new support ticket</h2>
      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur border rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <input name="employeeId" value={form.employeeId} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input name="department" value={form.department} onChange={handleChange} placeholder="e.g., Finance" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="Floor / Building / Remote" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Device</label>
            <input name="device" value={form.device} onChange={handleChange} placeholder="Laptop / Desktop / Mobile" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
            <select name="issueType" value={form.issueType} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
              {ISSUE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input name="contact" value={form.contact} onChange={handleChange} placeholder="Email or phone" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the issue with details" rows={4} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input id="allowRemote" name="allowRemote" type="checkbox" checked={form.allowRemote} onChange={handleChange} className="h-4 w-4" />
            <label htmlFor="allowRemote" className="text-sm text-gray-700">Allow remote access if needed</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (URL)</label>
            <input name="attachments" value={form.attachments} onChange={handleChange} placeholder="Link to screenshot or file" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">Submit Ticket</button>
        </div>
      </form>
    </div>
  );
}
