// AboutPage.tsx
import { motion } from 'framer-motion';
import { Mission } from '../components/about/Mission';
import { History } from '../components/about/History'; 
import { Leadership } from '../components/about/Leadership';
import { Values } from '../components/about/Values';

export function AboutPage() {
  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="about-page__hero">
        <motion.h1 
          className="about-page__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          About Us
        </motion.h1>
      </section>

      <Mission />
      <Values />
      <History />
      <Leadership />
    </motion.div>
  );
}