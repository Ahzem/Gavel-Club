import { motion } from 'framer-motion';
import { Award, Users, Mic2, Target } from 'lucide-react';

const benefits = [
  {
    title: 'Leadership Skills',
    description: 'Develop essential leadership qualities through hands-on experience',
    icon: Award,
  },
  {
    title: 'Communication',
    description: 'Master the art of public speaking and effective communication',
    icon: Mic2,
  },
  {
    title: 'Networking',
    description: 'Connect with like-minded individuals and build lasting relationships',
    icon: Users,
  },
  {
    title: 'Personal Growth',
    description: 'Achieve your personal and professional development goals',
    icon: Target,
  },
];

export function Benefits() {
  return (
    <section className="benefits-section">
      <div className="benefits-section__container">
        <motion.h2 
          className="benefits-section__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Member Benefits
        </motion.h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={benefit.title}
              className="benefit-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="benefit-card__icon-wrapper">
                <benefit.icon className="benefit-card__icon" />
              </div>
              <h3 className="benefit-card__title">{benefit.title}</h3>
              <p className="benefit-card__description">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}