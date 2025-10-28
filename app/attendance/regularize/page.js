"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import {
  FaCalendarCheck,
  FaClock,
  FaTimes,
  FaPaperclip,
  FaUserClock,
} from "react-icons/fa";
import { Dialog } from "@headlessui/react";

export default function RegularizationRequest() {
  const [absents] = useState([
    { date: "2025-07-07", status: "Absent" },
    { date: "2025-07-06", status: "Missed Check-in" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [form, setForm] = useState({
    date: "",
    checkIn: "",
    checkOut: "",
    reason: "",
  });

  const openModal = (date) => {
    setSelectedDate(date);
    setForm({ ...form, date });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setForm({ date: "", checkIn: "", checkOut: "", reason: "" });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
    closeModal();
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaCalendarCheck className="text-[var(--primary-color)]" /> Attendance Regularization
        </h1>

        {/* Absent Card Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {absents.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between border-l-4 border-yellow-400"
            >
              <div>
                <p className="text-gray-600 text-sm mb-1">Date</p>
                <h2 className="text-lg font-semibold text-gray-800">{item.date}</h2>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <FaUserClock className="text-yellow-500" />
                  <span>{item.status}</span>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => openModal(item.date)}
                  className="text-sm text-white bg-[var(--primary-color)] hover:bg-opacity-90 px-4 py-2 rounded-full transition"
                >
                  Regularize
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 space-y-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={closeModal}
              >
                <FaTimes />
              </button>
              <Dialog.Title className="text-lg font-semibold text-gray-800 mb-2">
                Regularize: {selectedDate}
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Check-In Time</label>
                    <input
                      type="time"
                      name="checkIn"
                      value={form.checkIn}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Check-Out Time</label>
                    <input
                      type="time"
                      name="checkOut"
                      value={form.checkOut}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Reason</label>
                  <textarea
                    name="reason"
                    rows="3"
                    value={form.reason}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Explain the reason"
                  ></textarea>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <FaPaperclip className="mr-2" />
                  <span>Attach Supporting Document</span>
                  <span className="ml-4 text-xs text-gray-400">
                    File Types: pdf, jpg, png
                  </span>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-[var(--primary-color)] text-white px-6 py-2 rounded hover:shadow-md text-sm"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm"
                    onClick={closeModal}
                  >
                    Cancel
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
