import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaHome,
  FaUserClock,
  FaSignInAlt,
  FaCalendarAlt,
  FaEdit,
  FaUmbrellaBeach,
  FaRegCalendarCheck,
  FaPlus,
  FaMoneyBillWave,
  FaReceipt,
  FaList,
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaChartLine,
  FaFolderOpen,
  FaUpload,
  FaFileAlt,
  FaHeart,
  FaThumbsUp,
  FaCommentDots,
  FaClipboardList,
  FaTasks,
  FaClipboardCheck,
  FaSignOutAlt,FaTimes ,FaChevronRight ,FaChevronDown 
} from 'react-icons/fa';
import { AppConfig } from '../lib/config';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', AppConfig.themeColor);
    root.style.setProperty('--background-color', AppConfig.themeBackground);
    root.style.setProperty('--text-color', AppConfig.textColor);
    root.style.setProperty('--font', AppConfig.fontFamily);
    root.style.setProperty('--font-weight', AppConfig.fontWeight);
  }, []);

  const router = useRouter();

  useEffect(() => {
    // Apply CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary-color', AppConfig.themeColor);
    root.style.setProperty('--background-color', AppConfig.themeBackground);
    root.style.setProperty('--text-color', AppConfig.textColor);
    root.style.setProperty('--font', AppConfig.fontFamily);
    root.style.setProperty('--font-weight', AppConfig.fontWeight);

    // Prefetch important routes
    router.prefetch('/dashboard');
    router.prefetch('/checkin');
    router.prefetch('/attendance/calendar');
    router.prefetch('/attendance/regularize');
    router.prefetch('/leave/apply');
    router.prefetch('/holiday/list');
    router.prefetch('/expense/claims');
    router.prefetch('/salary/payslips');
    router.prefetch('/salary/list');
    router.prefetch('/documents/add');
    router.prefetch('/documents/list');
    router.prefetch('/worklife/add');
    router.prefetch('/worklife/list');
    router.prefetch('/todo/add');
    router.prefetch('/todo/list');
  }, [router]);

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
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[var(--primary-color)/10] hover:text-[var(--primary-color)]"
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
    <aside
      className={`fixed top-0 left-0 h-full bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] shadow-lg z-50 w-64 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Close Button for Mobile */}
      <div className="lg:hidden flex justify-end p-3">
        <button onClick={toggleSidebar} className="text-green text-lg">
          <FaTimes />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="p-5 border-b">
        <div className="flex items-center gap-3 mb-4 bg-[#0e1738]">
          <Image
            src={AppConfig.logo}
            alt="Logo"
            width={150}
            height={150}
            color='black'
            className="w-80 h-15 object-contain"
            priority
          />
          {/* <span className="text-lg font-bold text-[var(--primary-color)]">
            {AppConfig.companyName}
          </span> */}
        </div>
        <div className="flex items-center gap-3">
          <img src={AppConfig.logo} alt="User" className="w-10 h-10 rounded-full border object-cover" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Hi, User</span>
            <Link href="/profile" className="text-xs text-[var(--primary-color)] hover:underline">
              View My Info
            </Link>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-3 text-sm sidebar-scroll">
        {/* Dashboard */}
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[var(--primary-color)/10] hover:text-[var(--primary-color)]">
          <FaHome /> Dashboard
        </Link>

        {/* Attendance */}
        <AccordionSection
          label="Attendance"
          icon={FaUserClock}
          links={[
            { href: "/checkin", icon: <FaSignInAlt />, label: "Check-in/Check-out" },
            { href: "/attendance/calendar", icon: <FaCalendarAlt />, label: "Attendance Calendar" },
            { href: "/attendance/regularize", icon: <FaEdit />, label: "Regularization Request" },
          ]}
        />

        {/* Leave */}
        <AccordionSection
          label="Leave"
          icon={FaUmbrellaBeach}
          links={[
            { href: "/leave/apply", icon: <FaPlus />, label: "Leave Apply" },
            { href: "/holiday/list", icon: <FaPlus />, label: "Holiday Lists" },
          ]}
        />

        {/* Expense */}
        <AccordionSection
          label="Expense"
          icon={FaMoneyBillWave}
          links={[
            { href: "/expense/claims", icon: <FaReceipt />, label: "Expense Apply" },
          ]}
        />

        {/* Salary */}
        <AccordionSection
          label="Salary"
          icon={FaMoneyCheckAlt}
          links={[
            { href: "/salary/payslips", icon: <FaFileInvoiceDollar />, label: "Payslip" },
            { href: "/salary/list", icon: <FaChartLine />, label: "YTD Reports" },
          ]}
        />

        {/* Document Center */}
        <AccordionSection
          label="Document Center"
          icon={FaFolderOpen}
          links={[
            { href: "/documents/add", icon: <FaUpload />, label: "Add" },
            { href: "/documents/list", icon: <FaFileAlt />, label: "List View" },
          ]}
        />

        {/* My Worklife */}
        <AccordionSection
          label="My Worklife"
          icon={FaHeart}
          links={[
            { href: "/worklife/add", icon: <FaThumbsUp />, label: "Kudos" },
            { href: "/worklife/list", icon: <FaCommentDots />, label: "Feedback" },
          ]}
        />

        {/* To Do */}
        <AccordionSection
          label="To Do"
          icon={FaClipboardList}
          links={[
            { href: "/todo/add", icon: <FaTasks />, label: "Tasks" },
            { href: "/todo/list", icon: <FaClipboardCheck />, label: "Review" },
          ]}
        />

        {/* Sign Out */}
        <Link href="/logout" className="flex items-center gap-3 text-red-500 px-3 py-2 rounded hover:bg-red-100">
          <FaSignOutAlt /> Sign Out
        </Link>
      </nav>

    </aside>
  );
};

export default Sidebar;
