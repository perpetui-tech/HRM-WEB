'use client';

import {React, useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import SwiperSlider from '../components/SwiperSlider';
import Header from '../components/Header';
import '../app/globals.css';

export default function Index() {
  const imageUrls = [
    'https://ismailvtl-images-project.vercel.app/cloud-storage.png',
    'https://ismailvtl-images-project.vercel.app/startup-launch.png',
    'https://ismailvtl-images-project.vercel.app/cloud-storage.png',
  ];

  const router = useRouter(); 
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = typeof window !== 'undefined' && localStorage.getItem('authToken');
    if (token) {
      router.replace('/dashboard');
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  useEffect(() => {
    router.prefetch('/dashboard');
  }, [router]);

  if (checkingAuth) return null;

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      console.log('Logging in with:', { email, password });
      localStorage.setItem('authToken', '456454465465')
      // Simulate async login
      setTimeout(() => {
        router.replace('/dashboard');
      }, 100);

      // ✅ If using real API call, place router.replace after success
      /*
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      localStorage.setItem('authToken', data.token)
      if (response.ok) {
        alert('Login successful!');
        router.replace('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
      */

    } catch (error) {
      console.error('Login Error:', error);
      alert('Something went wrong during login.');
    }
  };


  const onForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter your email to receive reset instructions.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Password reset link sent!');
      } else {
        alert(data.message || 'Failed to send reset link.');
      }
    } catch (error) {
      console.error('Forgot Password Error:', error);
      alert('Something went wrong while sending reset link.');
    }
  };


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

            <form className="space-y-5" onSubmit={onLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <span></span>
                 <button
                  onClick={onForgotPassword}
                  className="text-blue-600 hover:underline"
                  type="button"
                >
                  Forgot password?
                </button>
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
