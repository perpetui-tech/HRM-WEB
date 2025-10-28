"use client";

import Layout from "@/components/Layout";
import { FaCalendarAlt } from "react-icons/fa";

const holidays = [
  { date: "2025-01-01", name: "New Year's Day", type: "Public Holiday" },
  { date: "2025-01-26", name: "Republic Day", type: "National Holiday" },
  { date: "2025-03-17", name: "Holi", type: "Festival" },
  { date: "2025-08-15", name: "Independence Day", type: "National Holiday" },
  { date: "2025-10-02", name: "Gandhi Jayanti", type: "National Holiday" },
  { date: "2025-11-12", name: "Diwali", type: "Festival" },
];

export default function HolidayListPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaCalendarAlt className="text-[var(--primary-color)]" /> Holiday List
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {holidays.map((holiday, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 border-l-4 border-[var(--primary-color)]"
            >
              <p className="text-lg font-semibold text-gray-800">
                {holiday.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">{holiday.type}</p>
              <p className="text-sm text-gray-700 mt-2 font-medium">
                📅 {new Date(holiday.date).toDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
