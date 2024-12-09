import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { useState } from "react";
import { events } from "../../lib/data";
import { motion, AnimatePresence } from "framer-motion";

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDateEvents = events.filter(
    (event) =>
      date && new Date(event.date).toDateString() === date.toDateString()
  );

  return (
    <section className="calendar-section">
      <div className="calendar-section__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="calendar-grid"
        >
          <div className="calendar-card">
            <div className="calendar-header">
              <CalendarIcon className="calendar-header__icon" />
              <div className="calendar-header__content">
                <h2 className="calendar-header__title">Event Calendar</h2>
                <p className="calendar-header__subtitle">
                  Browse our upcoming events
                </p>
              </div>
            </div>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="calendar-component"
            />
          </div>

          <div className="calendar-events">
            {selectedDateEvents.length > 0 ? (
              <>
                <h3 className="calendar-events__title">
                  Events on {date?.toLocaleDateString()}
                </h3>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={date?.toString()}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="calendar-events__list"
                  >
                    {selectedDateEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        className="calendar-event-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <h4 className="calendar-event-card__title">
                          {event.title}
                        </h4>
                        <p className="calendar-event-card__description">
                          {event.description}
                        </p>
                        <div className="calendar-event-card__meta">
                          <span className="calendar-event-card__time">
                            <Clock size={16} />
                            {event.time}
                          </span>
                          <span className="calendar-event-card__location">
                            <MapPin size={16} />
                            {event.location}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <motion.div
                className="calendar-events__empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CalendarIcon className="calendar-events__empty-icon" />
                <h3 className="calendar-events__empty-title">
                  No Events Scheduled
                </h3>
                <p className="calendar-events__empty-text">
                  There are no events scheduled for {date?.toLocaleDateString()}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
