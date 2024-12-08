import { motion } from "framer-motion";

const leaders = [
  {
    name: "Prof. James Wilson",
    role: "Club Mentor",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    description: "Guiding the club with 15+ years of Toastmasters experience.",
  },
  {
    name: "Lisa Chen",
    role: "Vice President Education",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    description: "Dedicated to creating impactful educational programs.",
  },
  {
    name: "Alex Kumar",
    role: "Secretary",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    description: "Ensuring smooth club operations and communication.",
  },
];

export function Leadership() {
  return (
    <section className="leadership-section">
      <div className="leadership-section__container">
        <h2 className="leadership-section__title">Leadership Team</h2>
        <div className="leadership-section__grid">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              className="leader-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="leader-card__avatar-wrapper">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="leader-card__avatar"
                />
              </div>
              <h3 className="leader-card__name">{leader.name}</h3>
              <p className="leader-card__role">{leader.role}</p>
              <p className="leader-card__description">{leader.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
