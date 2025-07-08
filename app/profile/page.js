"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaIdBadge,
  FaCalendarAlt,
  FaBriefcase,
  FaLock,
  FaCamera,
} from "react-icons/fa";

export default function ProfileUpdate() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 text-[var(--text-color)] font-[var(--font)] font-[var(--font-weight)]">
        {/* Cover + Avatar */}
        <div className="relative rounded-xl h-32 sm:h-40 mb-20" style={{
            background: `linear-gradient(to right, oklch(0.696 0.17 162.48), oklch(0.696 0.15 172))`,
        }}>
          <div className="absolute bottom-[-2.5rem] left-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow-md">
                <FaCamera className="text-gray-700 text-sm" />
                <input type="file" hidden />
              </label>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form className="bg-white p-6 rounded-xl shadow-md space-y-8 -mt-16">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Edit Profile</h1>
              <p className="text-sm text-gray-500">Keep your info up to date</p>
            </div>
            {/* Progress Bar */}
            <div className="w-32 sm:w-52">
              <div className="text-xs text-gray-500 mb-1">Profile Complete: <span className="font-semibold">70%</span></div>
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-[var(--primary-color)] w-[70%]"></div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-sm mb-1">Full Name</label>
              <div className="flex items-center border rounded px-3 py-2 text-sm">
                <FaUser className="mr-2 text-gray-400" />
                <input type="text" className="flex-1 outline-none" defaultValue="John Doe" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">Email</label>
              <div className="flex items-center border rounded px-3 py-2 text-sm">
                <FaEnvelope className="mr-2 text-gray-400" />
                <input type="email" className="flex-1 outline-none" defaultValue="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">Phone</label>
              <div className="flex items-center border rounded px-3 py-2 text-sm">
                <FaPhoneAlt className="mr-2 text-gray-400" />
                <input type="text" className="flex-1 outline-none" defaultValue="+91 9876543210" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">Location</label>
              <div className="flex items-center border rounded px-3 py-2 text-sm">
                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                <input type="text" className="flex-1 outline-none" defaultValue="Kolkata, India" />
              </div>
            </div>
          </div>

          {/* Job Info */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-sm mb-1">Employee ID</label>
              <div className="flex items-center border rounded px-3 py-2 text-sm bg-gray-100">
                <FaIdBadge className="mr-2 text-gray-400" />
                <input type="text" className="flex-1 outline-none bg-transparent" value="EMP1023" readOnly />
              </div>
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">Joining Date</label>
              <div className="flex items-center border rounded px-3 py-2 text-sm">
                <FaCalendarAlt className="mr-2 text-gray-400" />
                <input type="date" className="flex-1 outline-none" defaultValue="2023-01-01" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">Designation</label>
              <div className="flex items-center border rounded px-3 py-2 text-sm">
                <FaBriefcase className="mr-2 text-gray-400" />
                <input type="text" className="flex-1 outline-none" defaultValue="Frontend Engineer" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">Department</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>IT</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
            </div>
          </div>

          {/* Change Password Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showPassword ? "Hide Password Fields" : "Change Password"}
            </button>

            {showPassword && (
              <div className="mt-4 grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-sm mb-1">New Password</label>
                  <div className="flex items-center border rounded px-3 py-2 text-sm">
                    <FaLock className="mr-2 text-gray-400" />
                    <input type="password" className="flex-1 outline-none" placeholder="New password" />
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-sm mb-1">Confirm Password</label>
                  <input type="password" className="w-full border rounded px-3 py-2 text-sm" placeholder="Confirm password" />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              type="submit"
              className="bg-[var(--primary-color)] text-white px-6 py-2 rounded hover:opacity-90 text-sm"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
