'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  FaHome, FaUsers, FaClipboard, FaSignOutAlt,
  FaMoneyCheckAlt, FaCalendarAlt, FaFileAlt,
  FaPlus, FaList, FaChevronDown, FaChevronRight
} from 'react-icons/fa';

import { AppConfig } from '../lib/config';
import { useState } from 'react';

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', AppConfig.themeColor);
    root.style.setProperty('--background-color', AppConfig.themeBackground);
    root.style.setProperty('--text-color', AppConfig.textColor);
    root.style.setProperty('--font', AppConfig.fontFamily);
    root.style.setProperty('--font-weight', AppConfig.fontWeight);
  }, []);

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const AccordionSection = ({ label, icon: Icon, links }) => (
    <div>
      <button
        onClick={() => toggleSection(label)}
        className="w-full flex items-center justify-between px-3 py-2 font-medium text-[var(--text-color)] hover:text-[var(--primary-color)]"
      >
        <span className="flex items-center gap-2">
          <Icon /> {label}
        </span>
        {openSections[label] ? <FaChevronDown /> : <FaChevronRight />}
      </button>
      {openSections[label] && (
        <div className="ml-6 mt-1 flex flex-col gap-1 text-sm">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 hover:text-[var(--primary-color)]"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside className="w-64 h-screen fixed bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] shadow border-r z-50 flex flex-col">
        <div className="p-5 border-b">
            <div className="flex items-center gap-3 mb-4">
                <img src={AppConfig.smLogo} alt="Logo" className="w-10 h-10 object-contain" />
                <span className="text-lg font-bold text-[var(--primary-color)]">{AppConfig.companyName}</span>
            </div>
            <div className="flex items-center gap-3">
                <img src={AppConfig.logo} alt="User" className="w-10 h-10 rounded-full border object-cover" />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">Hi, User</span>
                    <Link href="/profile" className="text-xs text-[var(--primary-color)] hover:underline">View My Info</Link>
                </div>
            </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-3 text-sm sidebar-scroll">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 hover:text-[var(--primary-color)]">
            <FaHome /> Dashboard
            </Link>

            <AccordionSection
            label="My Worklife"
            icon={FaUsers}
            links={[
                { href: "/worklife/add", icon: <FaPlus />, label: "Kudos" },
                { href: "/worklife/list", icon: <FaList />, label: "Feedback" },
            ]}
            />
            <AccordionSection
            label="To Do"
            icon={FaClipboard}
            links={[
                { href: "/todo/add", icon: <FaPlus />, label: "Tasks" },
                { href: "/todo/list", icon: <FaList />, label: "Review" },
            ]}
            />
            <AccordionSection
            label="Salary"
            icon={FaMoneyCheckAlt}
            links={[
                { href: "/salary/add", icon: <FaPlus />, label: "Payslip" },
                { href: "/salary/list", icon: <FaList />, label: "YTD Reports" },
            ]}
            />
            <AccordionSection
            label="Leave"
            icon={FaCalendarAlt}
            links={[
                { href: "/leave/apply", icon: <FaPlus />, label: "Leave Apply" },
                { href: "/leave/calendar", icon: <FaList />, label: "Leave Calendar" },
            ]}
            />
            <AccordionSection
            label="Document Center"
            icon={FaFileAlt}
            links={[
                { href: "/documents/add", icon: <FaPlus />, label: "Add" },
                { href: "/documents/list", icon: <FaList />, label: "List View" },
            ]}
            />
            <Link href="/logout" className="flex items-center gap-3 text-red-500 px-3 py-2 rounded hover:bg-red-100">
            <FaSignOutAlt /> Sign Out
            </Link>
        </nav>
    </aside>
  );
};

export default Sidebar;
