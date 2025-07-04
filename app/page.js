'use client';

import React from 'react';
import SwiperSlider from '../components/SwiperSlider';
import Header from '../components/Header';
import '../app/globals.css';

export default function Index() {
  const imageUrls = [
    'https://ismailvtl-images-project.vercel.app/cloud-storage.png',
    'https://ismailvtl-images-project.vercel.app/startup-launch.png',
    'https://ismailvtl-images-project.vercel.app/cloud-storage.png',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content: Login + Slider */}
      <div className="flex flex-1 min-h-0">
        {/* Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8 py-12">
          <div className="w-full max-w-md">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold mb-2">MAATRA.hR</h1>
              <p className="text-gray-600">Hello there!</p>
            </div>

            <form className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <span></span>
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="hidden md:flex md:w-1/2 h-full">
          <SwiperSlider urls={imageUrls} />
        </div>
      </div>
    </div>
  );
}
