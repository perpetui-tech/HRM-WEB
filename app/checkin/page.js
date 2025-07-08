"use client";

import { useState, useEffect } from "react";
import withAuth from "@/hoc/withAuth";
import { cn } from "@/lib/utils";
import Layout from "@/components/Layout";
import {
  FaClock,
  FaCalendarAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserClock,
} from "react-icons/fa";
import { AppConfig } from "@/lib/config";

const fetchAttendanceHistory = async () => {
  return [
    { date: "2025-07-08", checkIn: "09:01 AM", checkOut: "06:02 PM" },
    { date: "2025-07-07", checkIn: "09:15 AM", checkOut: "06:00 PM" },
    { date: "2025-07-06", checkIn: "09:10 AM", checkOut: "05:58 PM" },
  ];
};

export default withAuth(function CheckInOutPage() {
  const [status, setStatus] = useState("not_checked_in");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [duration, setDuration] = useState("");
  const [history, setHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const loadHistory = async () => {
    const data = await fetchAttendanceHistory();
    setHistory(data);
  };

  useEffect(() => {
    let interval;
    if (status === "checked_in" && checkInTime) {
      interval = setInterval(() => {
        const diff = new Date() - new Date(checkInTime);
        const hours = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        setDuration(`${hours}h ${mins}m`);
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [checkInTime, status]);

  const handleCheckIn = async () => {
    const now = new Date().toISOString();
    setStatus("checked_in");
    setCheckInTime(now);
    loadHistory();
  };

  const handleCheckOut = async () => {
    const now = new Date().toISOString();
    setStatus("checked_out");
    setCheckOutTime(now);
    loadHistory();
  };

  return (
    <Layout>
      <div
        className="w-full min-h-screen"
        style={{
          background: AppConfig.backgroundImage
            ? `url(${AppConfig.backgroundImage}) no-repeat center center / cover`
            : AppConfig.themeBackground,
          color: AppConfig.textColor,
          fontFamily: AppConfig.font,
          fontWeight: AppConfig.fontWeight,
        }}
      >
        <main className="w-full p-4 sm:p-6 text-[var(--text-color)] font-[var(--font)] font-[var(--font-weight)]">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FaClock className="text-[var(--primary-color)]" /> Attendance
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">Today’s check-in overview</p>
            </div>

            {/* Check-in/out actions */}
            <div className="flex gap-4">
              {status === "not_checked_in" && (
                <button
                  onClick={handleCheckIn}
                  className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg flex items-center gap-2"
                >
                  <FaSignInAlt /> Check In
                </button>
              )}
              {status === "checked_in" && (
                <button
                  onClick={handleCheckOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 flex items-center gap-2"
                >
                  <FaSignOutAlt /> Check Out
                </button>
              )}
              {status === "checked_out" && (
                <span className="text-green-600 font-semibold flex items-center gap-2">
                  ✅ Checked Out
                </span>
              )}
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: "📍",
                label: "Location",
                value: "India",
              },
              {
                icon: "⏱️",
                label: "Current Time",
                value: currentTime.toLocaleTimeString(),
              },
              {
                icon:
                  status === "checked_in"
                    ? "🟢"
                    : status === "checked_out"
                    ? "✅"
                    : "⏳",
                label: "Status",
                value:
                  status === "not_checked_in"
                    ? "Not Checked In"
                    : status === "checked_in"
                    ? "Checked In"
                    : "Checked Out",
              },
              {
                icon: "🔓",
                label: "Check-in Time",
                value: checkInTime
                  ? new Date(checkInTime).toLocaleTimeString()
                  : "--",
              },
              {
                icon: "🔒",
                label: "Check-out Time",
                value: checkOutTime
                  ? new Date(checkOutTime).toLocaleTimeString()
                  : "--",
              },
              {
                icon: "⏳",
                label: "Duration",
                value: duration || "--",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 shadow-md flex items-start gap-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-semibold text-gray-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Attendance History */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <FaCalendarAlt /> Attendance History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">
                      Check-In
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">
                      Check-Out
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {history.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">{item.checkIn}</td>
                      <td className="px-4 py-2">{item.checkOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
});
