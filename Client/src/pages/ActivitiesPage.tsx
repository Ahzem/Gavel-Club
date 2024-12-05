import { motion } from 'framer-motion';
import { Calendar } from '../components/activities/Calendar';
import { Gallery } from '../components/activities/Gallery';
import { Workshops } from '../components/activities/Workshops';

export function ActivitiesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Calendar />
      <Gallery />
      <Workshops />
    </motion.div>
  );
}