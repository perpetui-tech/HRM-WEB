"use client";

import { useState,useEffect } from "react";
import withAuth from "@/hoc/withAuth";
import { AppConfig } from "@/lib/config";
import Layout from "@/components/Layout";
import { Dialog } from "@headlessui/react";
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

export default withAuth(function CheckInOutPage({ auth = {} }){
  const [leaveList, setLeaveList] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState("apply");
  const IS_DEV_MODE = AppConfig.IS_DEV_MODE;

  const [form, setForm] = useState({
    leave_type: "",
    applying_to: "HR",
    from_date: "",
    to_date: "",
    contact: "",
    reason: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeave = {
      from: form.from_date,
      to: form.to_date,
      type: form.leave_type,
      contact: form.contact,
      reason: form.reason,
      file: form.file,
      applying_to: form.applying_to,
    };

    if (IS_DEV_MODE) {
      setLeaveData((prev) =>
        prev.map((category) => {
          if (category.title.includes("Pending")) {
            return {
              ...category,
              data: [...category.data, newLeave],
            };
          }
          return category;
        })
      );

      // Reset form and close modal
      setForm({
        leave_type: "",
        applying_to: "John Doe",
        from_date: "",
        to_date: "",
        contact: "",
        reason: "",
        file: null,
      });
      setModalOpen(false);
    } else {
      // const formData = new FormData();
      // for (const key in form) formData.append(key, form[key]);
      // await axios.post('/api/leave-apply', formData, { headers: { Authorization: `Bearer ${token}` } });
    }
  };


  useEffect(() => {
    const fetchLeaves = async () => {
      if (IS_DEV_MODE) {
        setLeaveData([
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
        ]);
      } else {
        try {
          const endpoints = [
            { key: "pending", title: "⏳ Pending Approvals", bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800" },
            { key: "approved", title: "✅ Approved Leaves", bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
            { key: "rejected", title: "❌ Rejected Leaves", bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
            { key: "upcoming", title: "📅 Upcoming Leaves", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
          ];

          const responses = await Promise.all(
            endpoints.map(async (endpoint) => {
              const res = await fetch(`/api/leave-data?type=${endpoint.key}`); // Replace with real endpoint
              const json = await res.json();
              return {
                ...endpoint,
                data: json?.data || [],
              };
            })
          );

          setLeaveData(responses);
        } catch (err) {
          console.error("Failed to load leave data", err);
        }
      }
    };

    fetchLeaves();
  }, []);

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
          {leaveData.map((category, idx) => (
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
                    <span className="text-xs inline-block mt-1 px-2 py-0.5 bg-gray-200 rounded-full text-gray-600">
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Leave Type</label>
                    <select
                      name="leave_type"
                      className="w-full border rounded px-3 py-2 text-sm"
                      value={form.leave_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Casual Leave">Casual Leave</option>
                      <option value="Earned Leave">Earned Leave</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Applying To</label>
                    <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700">
                      <FaUser className="text-gray-500" />
                      <span>{form.applying_to}</span>
                      <FaChevronDown className="text-gray-400 ml-auto" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">From Date</label>
                    <input
                      type="date"
                      name="from_date"
                      className="w-full border rounded px-3 py-2 text-sm"
                      value={form.from_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">To Date</label>
                    <input
                      type="date"
                      name="to_date"
                      className="w-full border rounded px-3 py-2 text-sm"
                      value={form.to_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Contact Details</label>
                  <input
                    type="text"
                    name="contact"
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="Phone or email during leave"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Reason</label>
                  <textarea
                    name="reason"
                    className="w-full border rounded px-3 py-2 text-sm"
                    rows="3"
                    value={form.reason}
                    onChange={handleChange}
                    placeholder="Enter a reason"
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1 flex items-center gap-2 text-sm text-gray-700">
                    <FaPaperclip className="text-[var(--primary-color)]" />
                    Attach Document
                  </label>
                  <div className="relative border border-dashed border-gray-300 rounded-md p-4 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.xls,.doc,.txt,.ppt,.jpg,.png"
                    />
                    <p className="text-center">Click or drag file to upload</p>
                    <p className="text-xs text-center text-gray-400 mt-1">
                      Accepted: PDF, Excel, Word, Text, PPT, JPG, PNG
                    </p>
                  </div>
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
});
