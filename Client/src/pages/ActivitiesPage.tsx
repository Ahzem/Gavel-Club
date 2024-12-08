import { motion } from 'framer-motion';
import { Calendar } from '../components/activities/Calendar';
import { Gallery } from '../components/activities/Gallery';
import { Workshops } from '../components/activities/Workshops';

export function ActivitiesPage() {
  return (
    <motion.div 
      className="activities-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="activities-hero">
        <motion.h1 
          className="activities-hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Our Activities
        </motion.h1>
      </section>

      <Calendar />
      <Gallery />
      <Workshops />
    </motion.div>
  );
}