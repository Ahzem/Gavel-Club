import { events } from "../../lib/data";
import { CalendarIcon, MapPinIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";

export function Events() {
  return (
    <section className="section events">
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 className="section__title">Upcoming Events</motion.h2>
          <motion.div className="events__decorative-line" />
        </motion.div>
        <div className="events__grid">
          {events.map((item, index) => (
            <motion.div
              key={`${events}-item-${item.id || index}`}
              className="event__wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="event-card">
                <div
                  className="event-card__image"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="event-card__content-wrapper">
                  <div className="event-card__header">
                    <div className="event-card__date-badge">
                      <span className="event-card__date-day">
                        {new Date(item.date).getDate()}
                      </span>
                      <span className="event-card__date-month">
                        {new Date(item.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>

                  <h3 className="event-card__title">{item.title}</h3>

                  <div className="event-card__meta">
                    <div className="event-card__meta-item">
                      <CalendarIcon className="event-card__icon" />
                      {new Date(item.date).toLocaleString("default", {
                        weekday: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="event-card__meta-item">
                      <MapPinIcon className="event-card__icon" />
                      {item.location}
                    </div>
                  </div>

                  <p className="event-card__description">{item.description}</p>

                  <div className="event-card__footer">
                    <a href="#" className="event-card__button">
                      Learn More
                      <ArrowRightIcon className="event-card__button-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
