import { Clock, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

const workshops = [
  {
    id: "1",
    title: "Prepared Speech Workshop",
    description:
      "Develop and deliver structured speeches on chosen topics. Learn speech crafting, body language, and vocal variety. Perfect for both beginners and experienced speakers looking to refine their skills.",
    time: "Every Tuesday, 5:00 PM",
    location: "Room 201, ITUM Main Building",
    capacity: "Unlimited participants",
  },
  {
    id: "2",
    title: "Table Topics Session",
    description:
      "Master the art of impromptu speaking through our Table Topics sessions. Enhance quick thinking and confidence by responding to unexpected questions and scenarios in 1-2 minutes.",
    time: "Every Thursday, 4:30 PM",
    location: "Conference Hall, ITUM",
    capacity: "Unlimited participants",
  },
  {
    id: "3",
    title: "Round Robin Speaking",
    description:
      "Participate in our dynamic Round Robin sessions where everyone gets a chance to speak on rotating topics. Great for practicing quick responses and building confidence in a supportive environment.",
    time: "Every Wednesday, 3:00 PM",
    location: "Room 105, ITUM Main Building",
    capacity: "Unlimited participants",
  },
];

export function Workshops() {
  return (
    <section className="workshops-section">
      <div className="workshops-section__container">
        <h2 className="workshops-section__title">Educational Meetings</h2>
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
