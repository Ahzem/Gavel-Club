import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useState } from 'react';
import { events } from '../../lib/data';
import { motion } from 'framer-motion';

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDateEvents = events.filter(
    (event) => date && new Date(event.date).toDateString() === date.toDateString()
  );

  return (
    <section className="">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <div className="">
            <Card className="">
              <CardHeader>
                <div className="">
                  <CalendarIcon className="" />
                  <CardTitle>Event Calendar</CardTitle>
                </div>
                <CardDescription>Browse our upcoming events</CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className=""
                />
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader>
                <CardTitle>Events on {date?.toDateString()}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="">
                    {selectedDateEvents.map((event) => (
                      <div key={event.id} className="">
                        <h3 className="">{event.title}</h3>
                        <p className="">{event.description}</p>
                        <p className="">{event.location}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="">No events scheduled for this date.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}