import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { useState } from "react";
import { events } from "../../lib/data";
import { motion } from "framer-motion";

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
              className="calendar"
            />
          </div>

          <div className="calendar-events">
            <h3 className="calendar-events__title">
              Events on {date?.toDateString()}
            </h3>
            <div className="calendar-events__list">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    className="calendar-event-card"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="calendar-event-card__title">
                      {event.title}
                    </h4>
                    <p className="calendar-event-card__description">
                      {event.description}
                    </p>
                    <p className="calendar-event-card__location">
                      {event.location}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="calendar-events__empty">
                  No events scheduled for this date.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
