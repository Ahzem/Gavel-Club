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
    <section className="history-section">
      <div className="history-section__container">
        <h2 className="history-section__title">Our Journey</h2>
        <div className="history-timeline">
          {milestones.map((milestone, index) => (
            <div className="history-timeline__item">
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="history-timeline__year">{milestone.year}</div>
              <div className="history-timeline__content">
                <h3 className="history-timeline__milestone">{milestone.title}</h3>
                <p className="history-timeline__description">{milestone.description}</p>
              </div>
            </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}