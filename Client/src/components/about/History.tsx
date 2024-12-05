import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2018',
    title: 'Club Foundation',
    description: 'Established as the first Gavel Club at ITUM.',
  },
  {
    year: '2020',
    title: 'Virtual Transformation',
    description: 'Successfully adapted to online meetings during the pandemic.',
  },
  {
    year: '2022',
    title: 'Excellence Award',
    description: 'Recognized for outstanding club performance.',
  },
  {
    year: '2024',
    title: 'Growing Strong',
    description: 'Celebrating years of fostering leadership and communication skills.',
  },
];

export function History() {
  return (
    <section className="">
      <div className="">
        <h2 className="">Our Journey</h2>
        <div className="">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="">
                  <div className="">{milestone.year}</div>
                  <h3 className="">{milestone.title}</h3>
                  <p className="">{milestone.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}