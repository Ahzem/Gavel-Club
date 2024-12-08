import { RocketIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function Mission() {
  return (
    <section className="mission-section">
      <div className="mission-section__container">
        <motion.div
          className="mission-section__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mission-section__icon-wrapper">
            <RocketIcon className="mission-section__icon" />
          </div>
          <h2 className="mission-section__title">Our Mission</h2>
          <p className="mission-section__text">
            To provide a supportive and positive learning experience in which members are
            empowered to develop communication and leadership skills, resulting in greater
            self-confidence and personal growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}