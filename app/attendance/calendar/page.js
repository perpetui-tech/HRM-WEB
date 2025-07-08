"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Layout from "@/components/Layout";
import AttendanceActivity from "@/app/attendance/activity";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
} from "react-icons/fa";
import { Dialog } from "@headlessui/react";

export default function AttendanceCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modal, setModal] = useState({ open: false, type: "", date: "" });

  const markedDates = {
    "2025-07-08": "present",
    "2025-07-07": "absent",
    "2025-07-06": "present",
  };

  const handleDateClick = (date) => {
    const key = date.toISOString().split("T")[0];
    const status = markedDates[key];
    if (status === "present") {
      setModal({ open: true, type: "compOff", date: key });
    } else if (status === "absent") {
      setModal({ open: true, type: "regularize", date: key });
    } else {
      setModal({ open: true, type: "leave", date: key });
    }
  };

  const tileContent = ({ date }) => {
    const key = date.toISOString().split("T")[0];
    const status = markedDates[key];
    if (status === "present") return <FaCheckCircle className="text-green-500 text-xs mt-1" />;
    if (status === "absent") return <FaTimesCircle className="text-red-500 text-xs mt-1" />;
    return null;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaCalendarAlt className="text-[var(--primary-color)]" /> Attendance Calendar
        </h1>

        {/* Grid layout: Calendar + Attendance Activity side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Calendar
              onClickDay={handleDateClick}
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={tileContent}
            />
          </div>

          {/* Listing Panel */}
        {/* Attendance Activity */}
        <AttendanceActivity />
        </div>

        {/* Modal */}
        <Dialog open={modal.open} onClose={() => setModal({ open: false })} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <Dialog.Title className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaPlus className="text-[var(--primary-color)]" />
                Apply for {modal.type === "leave" ? "Leave" : modal.type === "regularize" ? "Regularization" : "Comp Off"}
              </Dialog.Title>
              <form className="space-y-4 text-sm">
                <div>
                  <label className="block font-medium mb-1">Date</label>
                  <input
                    type="text"
                    value={modal.date || ""}
                    readOnly
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                {modal.type === "regularize" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-1">Check-In</label>
                      <input type="time" className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Check-Out</label>
                      <input type="time" className="w-full border rounded px-3 py-2" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block font-medium mb-1">Reason</label>
                  <textarea
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                    placeholder="Write your reason here"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModal({ open: false })}
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
      </div>
    </Layout>
  );
}
