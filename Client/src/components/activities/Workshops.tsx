import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Clock, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const workshops = [
  {
    id: '1',
    title: 'Public Speaking Fundamentals',
    description: 'Master the basics of effective public speaking',
    time: 'Every Tuesday, 5:00 PM',
    location: 'Room 201, ITUM Main Building',
    capacity: '20 participants',
  },
  {
    id: '2',
    title: 'Leadership Workshop Series',
    description: 'Develop essential leadership skills through practical exercises',
    time: 'Every Thursday, 4:30 PM',
    location: 'Conference Hall, ITUM',
    capacity: '25 participants',
  },
  {
    id: '3',
    title: 'Impromptu Speaking Practice',
    description: 'Enhance your ability to think and speak on your feet',
    time: 'Every Wednesday, 3:00 PM',
    location: 'Room 105, ITUM Main Building',
    capacity: '15 participants',
  },
];

export function Workshops() {
  return (
    <section className="">
      <div className="">
        <h2 className="">Regular Workshops</h2>
        <div className="">
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{workshop.title}</CardTitle>
                  <CardDescription>{workshop.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="">
                    <div className="">
                      <Clock className="" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="">
                      <MapPin className="" />
                      <span>{workshop.location}</span>
                    </div>
                    <div className="">
                      <Users className="" />
                      <span>{workshop.capacity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}