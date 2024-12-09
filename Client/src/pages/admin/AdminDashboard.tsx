import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "lucide-react";
import {
  Calendar,
  Users,
  FileText,
  MessageSquare,
  Phone,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { EventsManagement } from "./EventsManagement";

const DASHBOARD_ITEMS = [
  {
    id: "events",
    label: "Events",
    icon: Calendar,
  },
  {
    id: "team",
    label: "Team Members",
    icon: Users,
  },
  {
    id: "blogs",
    label: "Blog Posts",
    icon: FileText,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: MessageSquare,
  },
  {
    id: "contact",
    label: "Contact Info",
    icon: Phone,
  },
];

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("events");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend to clear the cookie
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear local auth state
      logout(); // This calls AuthContext.logout()

      // Navigate to login
      navigate("/adminlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.div
      className="admin-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="admin-dashboard__sidebar">
        <div className="admin-dashboard__logo">
          <Layout className="admin-dashboard__logo-icon" />
          <span>Admin Panel</span>
        </div>

        <nav className="admin-dashboard__nav">
          {DASHBOARD_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`admin-dashboard__nav-item ${
                activeSection === item.id
                  ? "admin-dashboard__nav-item--active"
                  : ""
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="admin-dashboard__nav-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="admin-dashboard__logout" onClick={handleLogout}>
          <LogOut className="admin-dashboard__logout-icon" />
          <span>Logout</span>
        </button>
      </div>

      <div className="admin-dashboard__content">
        <header className="admin-dashboard__header">
          <h1>
            {DASHBOARD_ITEMS.find((item) => item.id === activeSection)?.label}
          </h1>
        </header>

        <main className="admin-dashboard__main">
          {/* Content will be conditionally rendered based on activeSection */}
          {activeSection === 'events' && <EventsManagement />}
        </main>
      </div>
    </motion.div>
  );
}
