import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const milestones = [
  {
    year: '2018',
    title: 'Club Foundation',
    description: 'Established as the first Gavel Club at ITUM. A group of passionate students came together with the vision of creating a platform for developing communication and leadership skills. Under the guidance of experienced Toastmasters, the club was chartered with its inaugural batch of 20 members, marking the beginning of a transformative journey in public speaking and personal development at ITUM.',
  },
  {
    year: '2020',
    title: 'Virtual Transformation',
    description: "Successfully adapted to online meetings during the pandemic. In response to unprecedented challenges, the club swiftly transitioned to virtual meetings, implementing innovative online speech delivery methods and digital evaluation techniques. This adaptation not only maintained the club's momentum but also expanded its reach, allowing members to continue their growth journey from the safety of their homes.",
  },
  {
    year: '2022',
    title: 'Excellence Award',
    description: 'Recognized for outstanding club performance. The club received prestigious recognition for maintaining exceptional educational standards, consistent membership growth, and innovative program delivery. This achievement reflected the dedication of both members and leadership in creating an environment that nurtures effective communication and leadership development. The award ceremony celebrated numerous success stories of members who had transformed from hesitant speakers to confident leaders.',
  },
  {
    year: '2024',
    title: 'Growing Strong',
    description: 'Celebrating years of fostering leadership and communication skills. The club has now evolved into a cornerstone of personal development at ITUM, with over 100 alumni who have gone on to achieve remarkable success in their careers. Our expanded program now includes specialized workshops, inter-university competitions, and mentorship initiatives. The club continues to innovate and adapt, setting new standards for youth leadership development.',
  },
];

export function History() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="history-section">
      <div className="history-section__container">
        <h2 className="history-section__title">Our Journey</h2>
        <div className="history-timeline">
          {milestones.map((milestone, index) => (
            <div key={milestone.year} className="history-timeline__item">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="history-timeline__year">{milestone.year}</div>
                <div className="history-timeline__content">
                  <button 
                    className="history-timeline__milestone-button"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    <h3 className="history-timeline__milestone">{milestone.title}</h3>
                    <ChevronDown
                      className={`history-timeline__icon ${
                        expandedIndex === index ? "history-timeline__icon--active" : ""
                      }`}
                    />
                  </button>
                  <motion.div
                    className="history-timeline__description"
                    initial={false}
                    animate={{ height: expandedIndex === index ? "auto" : "1.6em" }}
                  >
                    {milestone.description}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}