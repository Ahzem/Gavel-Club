import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { MembershipPage } from "./pages/MembershipPage";
import { ContactPage } from "./pages/ContactPage";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import "./styles/hero.css";
import "./styles/pages/home.css";
import "./styles/pages/about.css";
import "./styles/pages/about-sections.css";
// import './styles/pages/contact.css';
// import './styles/pages/membership.css';
// import './styles/pages/activities.css';
import "./styles/components/header.css";
import "./styles/components/events.css";
import "./styles/components/button.css";
import "./styles/components/card.css";
import "./styles/components/avatar.css";
import "./styles/components/sheet.css";
import "./styles/components/navigation.css";

document.body.style.background =
  "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";

function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;
