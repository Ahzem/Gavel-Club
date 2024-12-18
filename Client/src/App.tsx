import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import React, { useEffect } from "react";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { MembershipPage } from "./pages/MembershipPage";
import { ContactPage } from "./pages/ContactPage";
import { BlogsPage } from "./pages/BlogsPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { AdminLogin } from "./pages/AdminLogin";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import emailjs from "@emailjs/browser";
import "./index.css";
import "./styles/hero.css";
import "./styles/pages/home.css";
import "./styles/pages/about.css";
import "./styles/pages/about-sections.css";
import "./styles/pages/membership-sections.css";
import "./styles/pages/contacts.css";
import "./styles/pages/membership.css";
import "./styles/pages/activities.css";
import "./styles/pages/blog.css";
import "./styles/pages/footer.css";
import "./styles/pages/AdminLogin.css";
import "./styles/components/header.css";
import "./styles/components/claps.css";
import "./styles/components/events.css";
import "./styles/components/button.css";
import "./styles/components/card.css";
import "./styles/components/avatar.css";
import "./styles/components/sheet.css";
import "./styles/components/navigation.css";
import "./styles/components/team-section.css";
import "./styles/components/testimonials-section.css";
import "./styles/pages/admin-dashboard.css";
import "./styles/components/admin/events-management.css";
import "./styles/components/admin/image-upload.css";
import "./styles/components/admin/membership-management.css";
import "./styles/components/special-event.css";
import "./styles/components/admin/TeamManagement.css";
import "./styles/components/admin/BlogsManagement.css";
import "./styles/components/admin/GalleryManagement.css";
import "./styles/components/admin/special-event-management.css";

document.body.style.background =
  "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/adminlogin");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
}

function App() {
  useEffect(() => {
    const initEmailJS = () => {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!publicKey) {
        console.error("EmailJS public key is missing");
        return;
      }
      try {
        emailjs.init(publicKey);
        console.log("EmailJS initialized successfully");
      } catch (error) {
        console.error("Failed to initialize EmailJS:", error);
      }
    };

    initEmailJS();
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin routes without Header/Footer */}
          <Route
            path="/admin/*"
            element={
              <Layout hideNav>
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </Layout>
            }
          />

          {/* Regular routes with Header/Footer */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/activities" element={<ActivitiesPage />} />
                  <Route path="/membership" element={<MembershipPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/blog" element={<BlogsPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/adminlogin" element={<AdminLogin />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
