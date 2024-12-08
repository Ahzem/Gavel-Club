import { Clock, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

const workshops = [
  {
    id: "1",
    title: "Public Speaking Fundamentals",
    description: "Master the basics of effective public speaking",
    time: "Every Tuesday, 5:00 PM",
    location: "Room 201, ITUM Main Building",
    capacity: "20 participants",
  },
  {
    id: "2",
    title: "Leadership Workshop Series",
    description:
      "Develop essential leadership skills through practical exercises",
    time: "Every Thursday, 4:30 PM",
    location: "Conference Hall, ITUM",
    capacity: "25 participants",
  },
  {
    id: "3",
    title: "Impromptu Speaking Practice",
    description: "Enhance your ability to think and speak on your feet",
    time: "Every Wednesday, 3:00 PM",
    location: "Room 105, ITUM Main Building",
    capacity: "15 participants",
  },
];

export function Workshops() {
  return (
    <section className="workshops-section">
      <div className="workshops-section__container">
        <h2 className="workshops-section__title">Regular Workshops</h2>
        <div className="workshops-grid">
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              className="workshop-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="workshop-card__header">
                <h3 className="workshop-card__title">{workshop.title}</h3>
                <p className="workshop-card__description">
                  {workshop.description}
                </p>
              </div>
              <div className="workshop-meta">
                <div className="workshop-meta__item">
                  <Clock className="workshop-meta__icon" />
                  <span>{workshop.time}</span>
                </div>
                <div className="workshop-meta__item">
                  <MapPin className="workshop-meta__icon" />
                  <span>{workshop.location}</span>
                </div>
                <div className="workshop-meta__item">
                  <Users className="workshop-meta__icon" />
                  <span>{workshop.capacity}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
