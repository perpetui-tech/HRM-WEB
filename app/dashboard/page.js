'use client';

import React from 'react';
import withAuth from '../../hoc/withAuth';
import Layout from '@/components/Layout';

import {
  FaUsers,
  FaClipboard,
  FaMoneyCheckAlt,
  FaCalendarAlt,
  FaFileAlt,
} from 'react-icons/fa';

const cardData = [
  {
    title: 'My Worklife',
    icon: <FaUsers className="text-2xl text-[var(--primary-color)]" />,
    description: 'View kudos and feedback shared across the organization.',
    link: '/worklife/list',
  },
  {
    title: 'To Do',
    icon: <FaClipboard className="text-2xl text-[var(--primary-color)]" />,
    description: 'Keep track of your assigned tasks and reviews.',
    link: '/todo/list',
  },
  {
    title: 'Salary',
    icon: <FaMoneyCheckAlt className="text-2xl text-[var(--primary-color)]" />,
    description: 'Check payslips, YTD reports and salary insights.',
    link: '/salary/list',
  },
  {
    title: 'Leave',
    icon: <FaCalendarAlt className="text-2xl text-[var(--primary-color)]" />,
    description: 'Apply for leave and check holiday calendars.',
    link: '/leave/calendar',
  },
  {
    title: 'Document Center',
    icon: <FaFileAlt className="text-2xl text-[var(--primary-color)]" />,
    description: 'Upload, view and manage important documents.',
    link: '/documents/list',
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
