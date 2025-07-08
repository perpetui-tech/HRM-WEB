"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import {
  FaUser,
  FaChevronDown,
  FaPlus,
  FaPaperclip,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Dialog } from "@headlessui/react";

export default function LeavePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState("apply");

  return (
    <Layout>
      <div className="w-full min-h-screen bg-[var(--background-color)] text-[var(--text-color)] font-[var(--font)] font-[var(--font-weight)] p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-xl sm:text-2xl font-bold">Leave Management</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:opacity-90 text-sm"
          >
            <FaPlus /> Manage Leave
          </button>
        </div>

        {/* Placeholder Leave Sections */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Category Card Template */}
            {[
                {
                title: "✅ Approved Leaves",
                bg: "bg-green-50",
                border: "border-green-200",
                text: "text-green-700",
                data: [
                    { from: "2025-07-02", to: "2025-07-04", type: "Sick Leave" },
                    { from: "2025-06-10", to: "2025-06-11", type: "Casual Leave" },
                    { from: "2025-05-15", to: "2025-05-17", type: "Earned Leave" },
                ],
                },
                {
                title: "⏳ Pending Approvals",
                bg: "bg-yellow-50",
                border: "border-yellow-200",
                text: "text-yellow-800",
                data: [
                    { from: "2025-07-10", to: "2025-07-11", type: "Earned Leave" },
                    { from: "2025-06-25", to: "2025-06-26", type: "Casual Leave" },
                ],
                },
                {
                title: "❌ Rejected Leaves",
                bg: "bg-red-50",
                border: "border-red-200",
                text: "text-red-700",
                data: [
                    { from: "2025-06-20", to: "2025-06-21", type: "Casual Leave" },
                    { from: "2025-05-05", to: "2025-05-06", type: "Sick Leave" },
                ],
                },
                {
                title: "📅 Upcoming Leaves",
                bg: "bg-blue-50",
                border: "border-blue-200",
                text: "text-blue-700",
                data: [
                    { from: "2025-07-15", to: "2025-07-16", type: "Vacation" },
                ],
                },
            ].map((category, idx) => (
                <div key={idx} className={`rounded-xl shadow border ${category.border} flex flex-col`}>
                <div className={`${category.bg} ${category.text} px-4 py-2 font-semibold text-sm rounded-t-xl`}>
                    {category.title}
                </div>
                <div className="px-4 py-2 overflow-y-auto max-h-60 text-sm text-gray-700 space-y-2">
                    {category.data.map((leave, index) => (
                    <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-md border border-gray-100 hover:shadow-sm transition"
                    >
                        <p className="font-medium">
                        {leave.from} to {leave.to}
                        </p>
                        <span
                        className="text-xs inline-block mt-1 px-2 py-0.5 bg-gray-200 rounded-full text-gray-600"
                        >
                        {leave.type}
                        </span>
                    </div>
                    ))}
                    {category.data.length === 0 && (
                    <p className="text-xs text-gray-400 italic text-center mt-4">No records</p>
                    )}
                </div>
                </div>
            ))}
        </div>


        {/* Modal */}
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white max-w-2xl w-full rounded-xl p-6 shadow-xl">
              <Dialog.Title className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-[var(--primary-color)]" /> Leave Application
              </Dialog.Title>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Leave Type</label>
                    <select className="w-full border rounded px-3 py-2 text-sm">
                      <option>Select type</option>
                      <option>Sick Leave</option>
                      <option>Casual Leave</option>
                      <option>Earned Leave</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Applying To</label>
                    <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700">
                      <FaUser className="text-gray-500" />
                      <span>John Doe</span>
                      <FaChevronDown className="text-gray-400 ml-auto" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">From Date</label>
                    <input type="date" className="w-full border rounded px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">To Date</label>
                    <input type="date" className="w-full border rounded px-3 py-2 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Contact Details</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Phone or email during leave"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Reason</label>
                  <textarea
                    className="w-full border rounded px-3 py-2 text-sm"
                    rows="3"
                    placeholder="Enter a reason"
                  ></textarea>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <FaPaperclip className="mr-2" />
                  <span>Attach File</span>
                  <span className="ml-4 text-xs text-gray-400">
                    File Types: pdf, xls, doc, txt, ppt, jpg, png
                  </span>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </Layout>
  );
}
