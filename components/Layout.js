'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      {/* Toggle Button on Mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        ☰
      </button>

      {/* Sidebar with mobile toggle support */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 p-6 ml-0 lg:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
