import { useState, useEffect } from "react";
import { CalendarIcon, MapPinIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { eventsApi } from "../../services/api";
import { Event } from "../../lib/types";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export function Events() {
  const [showAll, setShowAll] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const DEFAULT_IMAGE = "/public-speaking.jpg";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const fetchedEvents = await eventsApi.getAllEvents();
        // Filter for upcoming events only
        const upcomingEvents = fetchedEvents
          .filter((event: Event) => new Date(event.date) >= new Date())
          .sort(
            (a: Event, b: Event) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        setEvents(upcomingEvents);
      } catch {
        setError("Failed to load events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter upcoming events
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Don't render section if no upcoming events and not loading
  if (!isLoading && upcomingEvents.length === 0) return null;

  // Limit to 3 events unless showAll is true
  const displayedEvents = showAll ? upcomingEvents : upcomingEvents.slice(0, 3);

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
          <p className="section__description">Check out our upcoming events</p>
        </motion.div>

        <div className="events__grid">
          {isLoading ? (
            <motion.div
              className="events__loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <LoadingSpinner />
            </motion.div>
          ) : error ? (
            <div className="events__error">{error}</div>
          ) : (
            displayedEvents.map((item, index) => (
              <motion.div
                key={item.id}
                className="event__wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="event-card">
                  <div
                    className="event-card__image"
                    style={{
                      backgroundImage: `url(${
                        typeof item.image === "string"
                          ? item.image
                          : item.image?.url || DEFAULT_IMAGE
                      })`,
                    }}
                  />
                  <div className="event-card__content-wrapper">
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
                    <h3 className="event-card__title">{item.title}</h3>
                    <div className="event-card__meta">
                      <span className="event-card__meta-item">
                        <CalendarIcon className="event-card__icon" />
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <span className="event-card__meta-item">
                        <MapPinIcon className="event-card__icon" />
                        {item.location}
                      </span>
                    </div>
                    <p className="event-card__description">
                      {item.description}
                    </p>
                    <button
                      onClick={() =>
                        (window.location.href = item.registrationUrl || "#")
                      }
                      className="event-card__button"
                    >
                      Learn More
                      <ArrowRightIcon className="event-card__button-icon" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {!isLoading && upcomingEvents.length > 3 && (
          <motion.div
            className="events__see-more"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="gallery-seemore__link"
            >
              {showAll ? "Show Less" : "See More Events"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
