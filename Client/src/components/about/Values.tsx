import { Award, Heart, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    id: 1,
    icon: Award,
    title: "Excellence",
    description: "Striving for the highest standards in everything we do.",
  },
  {
    id: 2,
    icon: Heart,
    title: "Integrity",
    description: "Acting with honesty and transparency in all interactions.",
  },
  {
    id: 3,
    icon: Users,
    title: "Community",
    description: "Fostering a supportive and inclusive environment.",
  },
  {
    id: 4,
    icon: Zap,
    title: "Innovation",
    description: "Embracing new ideas and approaches to learning.",
  },
];

export function Values() {
  return (
    <section className="values-section">
      <div className="values-section__container">
        <h2 className="values-section__title">Our Values</h2>
        <div className="values-section__grid">
          {values.map((value, index) => (
            <div className="values-card" key={value.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="values-card__icon-wrapper">
                  <value.icon className="values-card__icon" />
                </div>
                <h3 className="values-card__title">{value.title}</h3>
                <p className="values-card__text">{value.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
