'use client';

import React from 'react';
import withAuth from '../../hoc/withAuth';
import Layout from '@/components/Layout';
import {
  FaUserClock,
  FaUmbrellaBeach,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaFolderOpen,
  FaHeart,
  FaClipboardList,
} from 'react-icons/fa';

const cardData = [
  {
    title: 'Attendance',
    icon: <FaUserClock className="text-2xl text-[var(--primary-color)]" />,
    description: 'Check-in/out and view your attendance calendar.',
    link: '/checkin',
  },
  {
    title: 'Leave',
    icon: <FaUmbrellaBeach className="text-2xl text-[var(--primary-color)]" />,
    description: 'Apply for leave and see holiday lists.',
    link: '/leave/apply',
  },
  {
    title: 'Expense',
    icon: <FaMoneyBillWave className="text-2xl text-[var(--primary-color)]" />,
    description: 'Submit expense claims and track approvals.',
    link: '/expense/claims',
  },
  {
    title: 'Salary',
    icon: <FaMoneyCheckAlt className="text-2xl text-[var(--primary-color)]" />,
    description: 'Download payslips and view YTD reports.',
    link: '/salary/list',
  },
  {
    title: 'Document Center',
    icon: <FaFolderOpen className="text-2xl text-[var(--primary-color)]" />,
    description: 'Upload and manage your important documents.',
    link: '/documents/list',
  },
  {
    title: 'My Worklife',
    icon: <FaHeart className="text-2xl text-[var(--primary-color)]" />,
    description: 'Give kudos and share feedback with peers.',
    link: '/worklife/list',
  },
  {
    title: 'To Do',
    icon: <FaClipboardList className="text-2xl text-[var(--primary-color)]" />,
    description: 'View and review your pending tasks.',
    link: '/todo/list',
  },
];

const DashboardLayout = () => {
  return (
    <Layout>
      <main className="w-full min-h-screen bg-[var(--background-color)] p-6 text-[var(--text-color)] font-[var(--font)] font-[var(--font-weight)]">
        {/* Welcome Box */}
        <div className="bg-white shadow-md rounded-2xl p-8 max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl font-bold mb-2 text-[var(--primary-color)]">Welcome!</h1>
          <p className="text-gray-600 text-base">
            You’ve successfully logged in. This section is protected and only accessible to authenticated users.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {cardData.map((card, index) => (
            <a
              key={index}
              href={card.link}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:ring-1 hover:ring-[var(--primary-color)] transition-all duration-300 group"
            >
              <div className="mb-4 flex items-center justify-between">
                {card.icon}
                <span className="text-sm text-[var(--primary-color)] group-hover:underline">Go →</span>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </a>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default withAuth(DashboardLayout);