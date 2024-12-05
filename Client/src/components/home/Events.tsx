import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { events } from '../../lib/data';
import { CalendarIcon, MapPinIcon, ArrowRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="event__wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="event-card">
                <div 
                  className="event-card__image" 
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="event-card__content-wrapper">
                  <CardHeader>
                    <div className="event-card__date-badge">
                      <span className="event-card__date-day">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="event-card__date-month">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                    <CardTitle className="event-card__title">{event.title}</CardTitle>
                    <CardDescription className="event-card__meta">
                      <div className="event-card__meta-item">
                        <CalendarIcon className="event-card__icon" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="event-card__meta-item">
                        <MapPinIcon className="event-card__icon" />
                        {event.location}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="event-card__description">{event.description}</p>
                    <button className="event-card__button">
                      Learn More
                      <ArrowRightIcon className="event-card__button-icon" />
                    </button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}