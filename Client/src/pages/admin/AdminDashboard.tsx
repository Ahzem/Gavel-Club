import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, UserPlus } from "lucide-react";
import {
  Calendar,
  Users,
  FileText,
  ImageIcon,
  Star,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { EventsManagement } from "./EventsManagement";
import { SITE_CONFIG } from "../../lib/constants";
import { MembershipManagement } from "./MembershipManagement";
import { TeamManagement } from "./TeamManagement";
import { BlogsManagement } from "./BlogsManagement";
import { GalleryManagement } from "./GalleryManagement";
import { SpecialEventManagement } from "./SpecialEventManagement";

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
    id: "membership",
    label: "Applications",
    icon: UserPlus,
  },
  {
    id: "blogs",
    label: "Blog Posts",
    icon: FileText,
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: ImageIcon,
  },
  {
    id: "special",
    label: "Special Event",
    icon: Star,
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
          <img
            src="/logo.png"
            alt="Club Logo"
            className="admin-dashboard__logo-img"
          />
          <div className="admin-dashboard__logo-text">
            <span className="admin-dashboard__logo-title">
              {SITE_CONFIG.name}
            </span>
            <span className="admin-dashboard__logo-subtitle">Admin Panel</span>
          </div>
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

        <div className="admin-dashboard__footer">
          <button className="admin-dashboard__logout" onClick={handleLogout}>
            <LogOut className="admin-dashboard__logout-icon" />
            <span>Logout</span>
          </button>

          <div className="admin-dashboard__developer">
            <div className="admin-dashboard__developer-links">
              <a
                href="https://github.com/Ahzem"
                target="_blank"
                rel="noopener noreferrer"
                className="admin-dashboard__developer-link"
              >
                <Github size={14} />
              </a>
              <a
                href="mailto:muhammadhahzem1422@gmail.com"
                className="admin-dashboard__developer-link"
              >
                <Mail size={14} />
              </a>
            </div>
            <span className="admin-dashboard__developer-text">
              Developed by Ahzem
            </span>
          </div>
        </div>
      </div>

      <div className="admin-dashboard__content">
        <header className="admin-dashboard__header">
          <h1>
            {DASHBOARD_ITEMS.find((item) => item.id === activeSection)?.label}
          </h1>
        </header>

        <main className="admin-dashboard__main">
          {/* Content will be conditionally rendered based on activeSection */}
          {activeSection === "events" && <EventsManagement />}
          {activeSection === "membership" && <MembershipManagement />}
          {activeSection === "team" && <TeamManagement />}
          {activeSection === "blogs" && <BlogsManagement />}
          {activeSection === "gallery" && <GalleryManagement />}
          {activeSection === "special" && <SpecialEventManagement />}
        </main>
      </div>
    </motion.div>
  );
}
