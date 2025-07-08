"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { Dialog } from "@headlessui/react";
import {
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaPlus,
  FaFilter,
  FaPaperclip,
} from "react-icons/fa";

export default function ExpenseClaims() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    reason: "",
    file: null,
  });

  const [claims, setClaims] = useState([
    { id: 1, date: "2025-07-01", amount: "₹1,500", category: "Travel", status: "Pending" },
    { id: 2, date: "2025-06-20", amount: "₹800", category: "Meals", status: "Approved" },
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClaims([
      ...claims,
      { ...form, id: Date.now(), status: "Pending" },
    ]);
    setForm({ date: "", amount: "", category: "", reason: "", file: null });
    setIsOpen(false);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaFileInvoiceDollar className="text-[var(--primary-color)]" />
            Expense Claims
          </h1>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[var(--primary-color)] text-white px-5 py-2 rounded shadow text-sm flex items-center gap-2 hover:opacity-90"
          >
            <FaPlus /> Apply Claim
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 mb-6 rounded-xl shadow flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <FaFilter className="text-gray-400" />
            <span>Filter by:</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>All Categories</option>
              <option>Travel</option>
              <option>Meals</option>
              <option>Supplies</option>
            </select>
            <input type="month" className="border rounded px-2 py-1 text-sm" />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {claims.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl space-y-4">
            <Dialog.Title className="text-xl font-semibold mb-2 flex items-center gap-2">
              <FaMoneyBillWave className="text-[var(--primary-color)]" />
              Apply Expense Claim
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="₹"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="">Select</option>
                    <option>Travel</option>
                    <option>Meals</option>
                    <option>Supplies</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Reason</label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                />
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <FaPaperclip className="mr-2" />
                <span>Attach Receipt</span>
                <span className="ml-4 text-xs text-gray-400">
                  (pdf, jpg, png)
                </span>
              </div>
              <input type="file" name="file" onChange={handleChange} className="text-sm" />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="border border-gray-300 px-4 py-2 rounded text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Layout>
  );
}

