"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { FaCalendarAlt, FaMoneyCheckAlt, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

const payslips = [
  {
    id: 1,
    month: "June",
    year: 2025,
    netPay: "₹42,000",
    status: "Paid",
    file: "#",
  },
  {
    id: 2,
    month: "May",
    year: 2023,
    netPay: "₹41,800",
    status: "Paid",
    file: "#",
  },
  {
    id: 3,
    month: "April",
    year: 2025,
    netPay: "₹40,500",
    status: "Paid",
    file: "#",
  },
];

export default function SalaryListPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("");

  const filteredPayslips = payslips.filter((slip) => {
    return (
      slip.year.toString() === selectedYear &&
      (selectedMonth ? slip.month === selectedMonth : true)
    );
  });

  const years = ["2025", "2024", "2023"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaMoneyCheckAlt className="text-[var(--primary-color)]" />
            Salary Payslips
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-4 items-center mb-6">
          <div>
            <label className="text-sm font-medium block mb-1">Select Year</label>
            <select
              className="border rounded px-4 py-2 text-sm"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Select Month</label>
            <select
              className="border rounded px-4 py-2 text-sm"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">All</option>
              {months.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Payslip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPayslips.length ? (
  filteredPayslips.map((slip) => (
    <motion.div
      key={slip.id}
      className="bg-white rounded-2xl shadow border hover:shadow-lg transition p-5 relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full p-3">
            <FaCalendarAlt className="text-lg" />
          </div>
          <div>
            <h2 className="font-semibold text-base">
              {slip.month} {slip.year}
            </h2>
            <p className="text-xs text-gray-500">Monthly Payslip</p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${
            slip.status === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          <FaMoneyCheckAlt className="text-sm" />
          {slip.status}
        </div>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Net Pay:</span> {slip.netPay}
        </p>
        <p>
          <span className="font-medium">Generated On:</span>{" "}
          {`${slip.month} 05, ${slip.year}`}
        </p>
      </div>

      <a
        href={slip.file}
        className="absolute bottom-4 right-5 text-sm text-blue-600 hover:underline flex items-center gap-1"
      >
        <FaDownload /> Download
      </a>
    </motion.div>
  ))
            ) : (
                <p className="text-gray-500 col-span-full text-center">
                    No payslips found for the selected month/year.
                </p>
            )}
        </div>
      </div>
    </Layout>
  );
}
