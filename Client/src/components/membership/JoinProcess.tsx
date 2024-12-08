import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: 'Submit Application',
    description: 'Fill out the online membership application form with your details.',
  },
  {
    id: 2,
    title: 'Attend Orientation',
    description: 'Join our orientation session to learn about club activities and expectations.',
  },
  {
    id: 3,
    title: 'Complete Registration',
    description: 'Pay the membership fee and complete necessary documentation.',
  },
  {
    id: 4,
    title: 'Begin Your Journey',
    description: 'Start attending meetings and participating in club activities.',
  },
];

export function JoinProcess() {
  return (
    <section className="join-section">
      <div className="join-section__container">
        <motion.h2 
          className="join-section__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          How to Join
        </motion.h2>
        <div className="join-timeline">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              className="join-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="join-step__number">{step.id}</div>
              <div className="join-step__content">
                <h3 className="join-step__title">{step.title}</h3>
                <p className="join-step__description">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}