import { Header } from "./Header";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export function Layout({ children, hideNav }: LayoutProps) {
  return (
    <div className="layout">
      {!hideNav && <Header />}
      <motion.main
        className="layout__main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      {!hideNav && <Footer />}
    </div>
  );
}
