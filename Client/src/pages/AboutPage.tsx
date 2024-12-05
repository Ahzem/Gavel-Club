import { motion } from 'framer-motion';
import { Mission } from '../components/about/Mission';
import { History } from '../components/about/History';
import { Leadership } from '../components/about/Leadership';
import { Values } from '../components/about/Values';

export function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Mission />
      <History />
      <Values />
      <Leadership />
    </motion.div>
  );
}