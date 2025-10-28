"use client";

import { useState, useEffect } from "react";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/Layout";
import {
  FaClock,
  FaCalendarAlt,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { AppConfig } from "@/lib/config";
import axios from 'axios';

export default withAuth(function CheckInOutPage({ auth = {} }) {
  const [status, setStatus] = useState('not_checked_in');
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [duration, setDuration] = useState('');
  const [history, setHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError('');
      const today = new Date();
      const todayDate = today.toISOString().slice(0, 10);

      if (AppConfig.IS_DEV_MODE) {
        const dummyData = [
          {
            date: new Date(today.setDate(today.getDate() - 1)).toISOString().slice(0, 10),
            attendance: {
              check_in: '09:10:00',
              check_out: '17:05:00',
            },
          },

          {
            date: new Date(today.setDate(today.getDate() - 2)).toISOString().slice(0, 10),
            attendance: {
              check_in: '09:10:00',
              check_out: '17:05:00',
            },
          },

          {
            date: new Date(today.setDate(today.getDate() - 3)).toISOString().slice(0, 10),
            attendance: {
              check_in: '09:10:00',
              check_out: '17:05:00',
            },
          },

          {
            date: new Date(today.setDate(today.getDate() - 2)).toISOString().slice(0, 10),
            attendance: {
              check_in: '09:10:00',
              check_out: '17:05:00',
            },
          },

          {
            date: new Date(today.setDate(today.getDate() - 3)).toISOString().slice(0, 10),
            attendance: {
              check_in: '09:10:00',
              check_out: '17:05:00',
            },
          },

          {
            date: new Date(today.setDate(today.getDate() - 2)).toISOString().slice(0, 10),
            attendance: {
              check_in: '09:10:00',
              check_out: '17:05:00',
            },
          },

          {
            date: new Date(today.setDate(today.getDate() - 3)).toISOString().slice(0, 10),
            attendance: {
              check_in: '09:10:00',
              check_out: '17:05:00',
            },
          },

          {
            date: new Date(today.setDate(today.getDate() - 2)).toISOString().slice(0, 10),
            attendance: {
              check_in: '09:10:00',
              check_out: '17:05:00',
            },
          },

          {
            date: new Date(today.setDate(today.getDate() - 3)).toISOString().slice(0, 10),
            attendance: {
              check_in: '09:10:00',
              check_out: '17:05:00',
            },
          },
        ];
        setHistory(dummyData);

        const todayEntry = dummyData.find(d => d.date === todayDate);
        if (!todayEntry) {
          setStatus('not_checked_in');
        } else if (todayEntry.attendance?.check_in && !todayEntry.attendance?.check_out) {
          setStatus('checked_in');
          setCheckInTime(todayEntry.attendance.check_in);
        } else {
          setStatus('checked_out');
          setCheckInTime(todayEntry.attendance.check_in);
          setCheckOutTime(todayEntry.attendance.check_out);
        }

      } else {
        const formData = new FormData();
        formData.append('filter_month', String(new Date().getMonth() + 1).padStart(2, '0'));
        formData.append('filter_year', String(new Date().getFullYear()));

        const { data: json } = await axios.post(`${AppConfig.API_BASE_URL}Auth/check-in`, formData, {
          headers: { Authorization: `Bearer ${auth.api_token}` },
        });

        if (json.status_code === 1) {
          const data = json.data.previos_attendance_list || [];
          setHistory(data);

          const todayEntry = data.find(d => d.date === todayDate);
          if (!todayEntry) {
            setStatus('not_checked_in');
          } else if (todayEntry.attendance?.check_in && !todayEntry.attendance?.check_out) {
            setStatus('checked_in');
            setCheckInTime(todayEntry.attendance.check_in);
          } else {
            setStatus('checked_out');
            setCheckInTime(todayEntry.attendance.check_in);
            setCheckOutTime(todayEntry.attendance.check_out);
          }
        } else {
          setError(json.message || 'Unable to load attendance history');
          setHistory([]);
          setStatus('not_checked_in');
        }
      }
    } catch (err) {
      console.error('Attendance Fetch Error:', err);
      setError(err.message || 'Failed to fetch attendance');
      setHistory([]);
      setStatus('not_checked_in');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;

    const updateDuration = () => {
      if (status === "checked_in" && checkInTime) {
        const today = new Date().toISOString().split("T")[0];
        const checkInDate = new Date(`${today}T${checkInTime}`);

        if (!isNaN(checkInDate)) {
          const now = new Date();
          const diff = now - checkInDate;
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setDuration(`${hours}h ${mins}m`);
        } else {
          setDuration("--");
        }
      } else {
        setDuration("--");
      }
    };

    updateDuration(); // run immediately
    interval = setInterval(updateDuration, 60000); // update every minute

    return () => clearInterval(interval);
  }, [checkInTime, status]);



  const handleCheckIn = () => {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 8);

    setStatus("checked_in");
    setCheckInTime(time);
    setCheckOutTime(null);

    const updatedHistory = [...history];
    const todayIndex = updatedHistory.findIndex(item => item.date === today);

    if (todayIndex >= 0) {
      updatedHistory[todayIndex].attendance.check_in = time;
      updatedHistory[todayIndex].attendance.check_out = null;
    } else {
      updatedHistory.unshift({
        date: today,
        attendance: {
          check_in: time,
          check_out: null,
        },
      });
    }
    setHistory(updatedHistory);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 8);

    setStatus("checked_out");
    setCheckOutTime(time);

    const updatedHistory = [...history];
    const todayIndex = updatedHistory.findIndex(item => item.date === today);

    if (todayIndex >= 0) {
      updatedHistory[todayIndex].attendance.check_out = time;
    } else {
      updatedHistory.unshift({
        date: today,
        attendance: {
          check_in: null,
          check_out: time,
        },
      });
    }
    setHistory(updatedHistory);
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FaClock className="text-[var(--primary-color)]" /> Attendance Dashboard
              </h1>
              <p className="text-sm text-gray-500">Today’s check-in overview</p>
            </div>

            <div className="flex gap-4">
              {status === "not_checked_in" && (
                <button onClick={handleCheckIn} className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg flex items-center gap-2">
                  <FaSignInAlt /> Check In
                </button>
              )}
              {status === "checked_in" && (
                <button onClick={handleCheckOut} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 flex items-center gap-2">
                  <FaSignOutAlt /> Check Out
                </button>
              )}
              {status === "checked_out" && (
                <span className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg flex items-center gap-2">
                  Checked Out
                </span>
              )}
            </div>
          </div>

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
                value: currentTime?.toLocaleTimeString() || "--",
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
                value:
                  checkInTime && !isNaN(new Date(`1970-01-01T${checkInTime}`).getTime())
                    ? new Date(`1970-01-01T${checkInTime}`).toLocaleTimeString()
                    : "--",
              },
              {
                icon: "🔒",
                label: "Check-out Time",
                value:
                  checkOutTime && !isNaN(new Date(`1970-01-01T${checkOutTime}`).getTime())
                    ? new Date(`1970-01-01T${checkOutTime}`).toLocaleTimeString()
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

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <FaCalendarAlt /> Attendance History
            </h2>

            {/* Scrollable container */}
            <div className="max-h-[300px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {history.length > 0 ? (
                  history.map((item, i) => {
                    const dateObj = new Date(item.date);
                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                    const day = dateObj.getDate();
                    const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                    const year = dateObj.getFullYear();

                    const isCheckedIn = !!item.attendance?.check_in;
                    const isCheckedOut = !!item.attendance?.check_out;
                    const status = isCheckedIn
                      ? isCheckedOut
                        ? "Checked Out"
                        : "Checked In"
                      : "Absent";

                    const statusStyles = {
                      "Checked Out": "border-l-4 border-green-500",
                      "Checked In": "border-l-4 border-yellow-500",
                      "Absent": "border-l-4 border-red-500",
                    };

                    const statusColor =
                      status === "Checked Out"
                        ? "text-green-600"
                        : status === "Checked In"
                        ? "text-yellow-600"
                        : "text-red-600";

                    return (
                      <div
                        key={i}
                        className={`rounded-xl shadow-sm p-4 bg-white flex flex-col justify-between ${statusStyles[status]}`}
                      >
                        {/* Date Badge and Status */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex flex-col items-center justify-center shadow text-[11px]">
                              <span className="uppercase font-semibold text-gray-500">{month}</span>
                              <span className="text-base font-bold text-gray-800 leading-none">{day}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-800">
                              {dayName}
                            </div>
                          </div>
                          <div className={`text-xs font-semibold px-2 py-1 rounded ${statusColor}`}>
                            {status}
                          </div>
                        </div>

                        {/* Check-In and Check-Out */}
                        <div className="flex justify-between text-sm text-gray-600 font-medium mb-2">
                          <span>🕒 {item.attendance?.check_in || "--"}</span>
                          <span>➡️ {item.attendance?.check_out || "--"}</span>
                        </div>

                        {/* Footer Date */}
                        <div className="text-xs text-gray-400 text-right">
                          {`${day} ${month} ${year}`}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="col-span-3 text-center text-gray-400 italic">
                    No attendance records found
                  </p>
                )}
              </div>
            </div>
          </div>

        </main>
      </div>
    </Layout>
  );
});