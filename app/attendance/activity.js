import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const attendanceData = [
  {
    date: "2025-07-08",
    status: "Present",
    statusType: "present",
    details: "Marked present via system auto check-in.",
  },
  {
    date: "2025-07-07",
    status: "Absent (Regularization Pending)",
    statusType: "absent",
    details: "User submitted regularization request at 10:30AM.",
  },
  {
    date: "2025-07-06",
    status: "Present (Comp Off Applied)",
    statusType: "compoff",
    details: "User applied for comp off on weekend duty.",
  },
];

export default function AttendanceActivity() {
  const [expanded, setExpanded] = useState(null);

  const getBadgeColor = (type) => {
    switch (type) {
      case "present":
        return "bg-green-100 text-green-700";
      case "absent":
        return "bg-red-100 text-red-700";
      case "compoff":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Attendance Activity</h2>
      <ul className="space-y-3 text-sm">
        {attendanceData.map((item, idx) => (
          <li
            key={idx}
            className="border rounded px-4 py-3 shadow-sm bg-gray-50 hover:bg-gray-100 transition"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <div className="text-gray-700 font-medium">{item.date}</div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getBadgeColor(
                    item.statusType
                  )}`}
                >
                  {item.status}
                </span>
                {expanded === idx ? (
                  <FaChevronUp className="text-gray-400 text-xs" />
                ) : (
                  <FaChevronDown className="text-gray-400 text-xs" />
                )}
              </div>
            </div>

            {expanded === idx && (
              <div className="mt-3 text-gray-600 text-sm border-t pt-3">
                {item.details}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
