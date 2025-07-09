"use client";

import { useState,useEffect } from "react";
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
import { callApi } from '../../lib/api';

export default function ProfileUpdate() {
  const [profileDetails, setProfileDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

   useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const testToken = "bcf4b18920f12116ac2b64bb0f58cc27c03534b6b43c0ffb0873296ae78b0dbd";
    if (!storedToken) {
      localStorage.setItem("token", testToken);
      setToken(testToken);
    } else {
      setToken(storedToken);
    }
  }, []);

  // Fetch profile
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await callApi("/my-profile", "GET", null, token);
        console.log('res', res);
        if (res.status === 1) {
          setProfileDetails(res.data);
        } else {
          console.warn("API returned:", res.message);
        }
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [token]);

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 text-[var(--text-color)] font-[var(--font)] font-[var(--font-weight)]">
        {/* Cover + Avatar */}
        <div
          className="relative rounded-xl h-32 sm:h-40 mb-20"
          style={{
            background: `linear-gradient(to right, oklch(0.696 0.17 162.48), oklch(0.696 0.15 172))`,
          }}
        >
          <div className="absolute bottom-[-2.5rem] left-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={profileDetails?.avatar || "/avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
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
              <div className="text-xs text-gray-500 mb-1">
                Profile Complete: <span className="font-semibold">70%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-[var(--primary-color)] w-[70%]"></div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid sm:grid-cols-2 gap-6">
            <FormInput label="Full Name" icon={<FaUser />} value={profileDetails?.name} />
            <FormInput label="Email" icon={<FaEnvelope />} value={profileDetails?.email} />
            <FormInput label="Phone" icon={<FaPhoneAlt />} value={profileDetails?.phone} />
            <FormInput
              label="Location"
              icon={<FaMapMarkerAlt />}
              value={`${profileDetails?.city}, ${profileDetails?.state}`}
            />
          </div>

          {/* Job Info */}
          <div className="grid sm:grid-cols-2 gap-6">
            <FormInput
              label="Employee ID"
              icon={<FaIdBadge />}
              value={profileDetails?.employee_id}
              readOnly
              bgGray
            />
            <FormInput
              label="Birth Date"
              icon={<FaCalendarAlt />}
              value={profileDetails?.birthdate}
              type="date"
            />
            <FormInput
              label="Designation"
              icon={<FaBriefcase />}
              value={profileDetails?.designation || "Employee"}
            />
            <div>
              <label className="block font-medium text-sm mb-1">Department</label>
              <select className="w-full border rounded px-3 py-2 text-sm" defaultValue="IT">
                <option>IT</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
            </div>
          </div>

          {/* Password Section */}
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
                <FormInput label="New Password" icon={<FaLock />} type="password" placeholder="New password" />
                <FormInput label="Confirm Password" type="password" placeholder="Confirm password" />
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

function FormInput({ label, icon, value = "", type = "text", readOnly = false, placeholder = "", bgGray = false }) {
  return (
    <div>
      <label className="block font-medium text-sm mb-1">{label}</label>
      <div className={`flex items-center border rounded px-3 py-2 text-sm ${bgGray ? "bg-gray-100" : ""}`}>
        {icon && <span className="mr-2 text-gray-400">{icon}</span>}
        <input
          type={type}
          className={`flex-1 outline-none ${bgGray ? "bg-transparent" : ""}`}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={() => {}}
        />
      </div>
    </div>
  );
}