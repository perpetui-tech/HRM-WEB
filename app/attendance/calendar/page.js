"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dialog } from "@headlessui/react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
  FaRegClock,
  FaUmbrellaBeach,
  FaSun,
} from "react-icons/fa";
import Layout from "@/components/Layout";
import withAuth from "@/hoc/withAuth";

// Generate dummy grouped attendance data
const generateAttendance = (year, month) => {
  const today = new Date();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const data = {
    present: [],
    absent: [],
    leave: [],
    holiday: [],
    halfday: [],
  };

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const key = date.toISOString().split("T")[0];
    const weekday = date.getDay();

    if (isCurrentMonth && date > today) continue;
    if (!isCurrentMonth && date < today) continue;

    if (weekday === 0 || weekday === 6) {
      data.holiday.push(key);
    } else if (!isCurrentMonth) {
      data[i % 2 === 0 ? "leave" : "holiday"].push(key);
    } else {
      if (i % 5 === 0) data.leave.push(key);
      else if (i % 4 === 0) data.halfday.push(key);
      else if (i % 3 === 0) data.absent.push(key);
      else data.present.push(key);
    }
  }

  return data;
};

// Convert grouped data to flat key-value pair
const flattenMarkedDates = (grouped) => {
  const flat = {};
  Object.entries(grouped).forEach(([status, dates]) => {
    dates.forEach((date) => {
      flat[date] = status;
    });
  });
  return flat;
};

export default withAuth(function AttendanceCalendar() {
  const [submittedData, setSubmittedData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});
  const [modal, setModal] = useState({ open: false, type: "", date: "" });
  const [form, setForm] = useState({
    check_in_time: "",
    check_out_time: "",
    reason: "",
    compOffFor: "",
  });

  useEffect(() => {
    const today = new Date();
    const grouped = generateAttendance(today.getFullYear(), today.getMonth());
    setMarkedDates(flattenMarkedDates(grouped));
  }, []);

  const handleMonthChange = ({ activeStartDate }) => {
    const year = activeStartDate.getFullYear();
    const month = activeStartDate.getMonth();
    const grouped = generateAttendance(year, month);
    setMarkedDates(flattenMarkedDates(grouped));
  };

  const handleDateClick = (date) => {
    const key = date.toLocaleDateString("en-CA");
    const status = markedDates[key];
    if (!status) return;

    setSelectedDate(date);

    if (status === "absent") {
      setModal({ open: true, type: "regularize", date: key });
    } else if (["present", "leave", "holiday"].includes(status)) {
      setModal({ open: true, type: "compOff", date: key });
    } else {
      setModal({ open: true, type: "leave", date: key });
    }
  };

  const tileContent = ({ date }) => {
    const key = date.toISOString().split("T")[0];
    const status = markedDates[key];
    if (!status) return null;

    const icons = {
      present: <FaCheckCircle className="text-green-600 text-xs mt-1" />,
      leave: <FaUmbrellaBeach className="text-blue-500 text-xs mt-1" />,
      holiday: <FaSun className="text-yellow-500 text-xs mt-1" />,
      absent: <FaTimesCircle className="text-red-500 text-xs mt-1" />,
      halfday: <FaRegClock className="text-orange-500 text-xs mt-1" />,
    };

    return icons[status] || null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      date: modal.date,
      type: modal.type,
      status: markedDates[modal.date],
      ...form,
    };

    setSubmittedData(payload);
    setModal({ open: false, type: "", date: "" });
    setForm({
      check_in_time: "",
      check_out_time: "",
      reason: "",
      compOffFor: "",
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaCalendarAlt className="text-[var(--primary-color)]" /> Attendance Calendar
        </h1>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <FaCheckCircle className="text-green-600" />
            <span>Present</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaTimesCircle className="text-red-500" />
            <span>Absent / Not Logged In</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaUmbrellaBeach className="text-blue-500" />
            <span>Leave</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaSun className="text-yellow-500" />
            <span>Holiday (Sun/Sat)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaRegClock className="text-orange-500" />
            <span>Half Day</span>
          </div>
        </div>

        {/* Calendar & Activity Section */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6 items-start">
          {/* Calendar Card */}
          <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <FaCalendarAlt className="text-[var(--primary-color)]" />
              My Attendance - {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
            </h2>
            <Calendar
              onClickDay={handleDateClick}
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={tileContent}
              onActiveStartDateChange={handleMonthChange}
              tileClassName={({ date }) => {
                const key = date.toLocaleDateString("en-CA");
                const selectedKey = selectedDate.toLocaleDateString("en-CA");
                return selectedKey === key ? "selected-date" : "";
              }}
            />
          </div>

          {/* Attendance Activity Card */}
          <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 min-h-[400px]">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <FaPlus className="text-[var(--primary-color)]" />
              Attendance Activity
            </h2>
            
            {modal.date || submittedData ? (
              <div className="text-sm space-y-3 text-gray-700 leading-relaxed">
                <p>
                  <span className="font-semibold">📅 Date:</span>{" "}
                  {modal.date || submittedData?.date}
                </p>
                <p>
                  <span className="font-semibold">📝 Action Type:</span>{" "}
                  {modal.type
                    ? modal.type === "leave"
                      ? "Leave Application"
                      : modal.type === "regularize"
                      ? "Regularization"
                      : modal.type === "compOff"
                      ? "Comp-Off"
                      : "-"
                    : submittedData?.type}
                </p>
                <p>
                  <span className="font-semibold">📌 Status:</span>{" "}
                  <span className="capitalize">
                    {modal.date ? markedDates[modal.date] : submittedData?.status}
                  </span>
                </p>

                {/* Show form submission details */}
                {submittedData && (
                  <div className="pt-3 border-t border-gray-200 space-y-2 text-sm">
                    {submittedData.check_in_time && (
                      <p>
                        <span className="font-medium">Check-In:</span>{" "}
                        {submittedData.check_in_time}
                      </p>
                    )}
                    {submittedData.check_out_time && (
                      <p>
                        <span className="font-medium">Check-Out:</span>{" "}
                        {submittedData.check_out_time}
                      </p>
                    )}
                    {submittedData.compOffFor && (
                      <p>
                        <span className="font-medium">Comp-Off For:</span>{" "}
                        {submittedData.compOffFor}
                      </p>
                    )}
                    {submittedData.reason && (
                      <p>
                        <span className="font-medium">Reason:</span>{" "}
                        {submittedData.reason}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500 text-sm italic">
                Click a date on the calendar to view or apply attendance action.
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        <Dialog open={modal.open} onClose={() => setModal({ open: false, type: "", date: "" })} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaPlus className="text-[var(--primary-color)]" />
              Apply for {modal.type === "leave" ? "Leave" : modal.type === "regularize" ? "Regularization" : "Comp Off"}
            </Dialog.Title>
            <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
              <div>
                <label className="block font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={modal.date || ""}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {modal.type === "regularize" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Check-In</label>
                    <input
                      name="check_in_time"
                      type="time"
                      onChange={handleChange}
                      value={form.check_in_time || ""}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Check-Out</label>
                    <input
                      name="check_out_time"
                      type="time"
                      onChange={handleChange}
                      value={form.check_out_time || ""}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
              )}

              {modal.type === "compOff" && (
                <div>
                  <label className="block font-medium mb-1">Apply Comp-Off For (future date)</label>
                  <input
                    type="date"
                    name="compOffFor"
                    value={form.compOffFor || ""}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-xs text-gray-500">Choose a working day or leave day.</p>
                </div>
              )}

              <div>
                <label className="block font-medium mb-1">Reason</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  name="reason"
                  value={form.reason || ""}
                  onChange={handleChange}
                  placeholder="Write your reason here"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModal({ open: false, type: "", date: "" })}
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
});
