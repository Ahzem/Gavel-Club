import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { useState, useEffect } from "react";
import { eventsApi } from "../../services/api";
import { Event } from "../../lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const fetchedEvents = await eventsApi.getAllEvents();
        setEvents(fetchedEvents);
      } catch (err) {
        setError("Failed to load events");
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events for selected date
  const selectedDateEvents = events.filter(
    (event) =>
      date && new Date(event.date).toDateString() === date.toDateString()
  );

  // Get all dates that have events for calendar highlighting
  const eventDates = events.map((event) => new Date(event.date));

  return (
    <section className="calendar-section">
      <div className="calendar-section__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="calendar-grid"
        >
          {/* Calendar always visible */}
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
              modifiers={{
                hasEvent: (date) =>
                  eventDates.some(
                    (eventDate) =>
                      eventDate.toDateString() === date.toDateString()
                  ),
              }}
              modifiersClassNames={{
                hasEvent: "calendar__day--has-event",
              }}
            />
          </div>

          {/* Events section with loading state */}
          <div className="calendar-events">
            {isLoading ? (
              <motion.div
                key="loading-state"
                className="calendar-events__loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <LoadingSpinner />
              </motion.div>
            ) : error ? (
              <div className="calendar-section__error">Error: {error}</div>
            ) : selectedDateEvents.length > 0 ? (
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
                    {selectedDateEvents.map((event, index) => (
                      <motion.div
                        key={`${event.date}-${event.title}-${index}`}
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
                          <div className="calendar-event-card__time-location">
                            <span className="calendar-event-card__time">
                              <Clock size={16} />
                              {event.time}
                            </span>
                            <span className="calendar-event-card__location">
                              <MapPin size={16} />
                              {event.location}
                            </span>
                          </div>
                          {event.registrationUrl && (
                            <a
                              href={event.registrationUrl}
                              className="calendar-event-card__register"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Register Now
                            </a>
                          )}
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
