import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is Gavel Club?",
    answer:
      "Gavel Club is a youth program of Toastmasters International that helps members develop communication and leadership skills through public speaking practice.",
  },
  {
    question: "How often do meetings take place?",
    answer:
      "We meet weekly on campus. Regular meetings are held every Wednesday from 4:30 PM to 6:30 PM.",
  },
  {
    question: "What are the membership fees?",
    answer:
      "The membership fee is [amount] per semester. This covers all club activities, materials, and access to educational resources.",
  },
  {
    question: "Can anyone join the club?",
    answer:
      "The club is open to all ITUM students. We welcome members from all academic years and departments.",
  },
  {
    question: "What happens at a typical meeting?",
    answer:
      "Meetings include prepared speeches, impromptu speaking sessions (Table Topics), speech evaluations, and various leadership roles practice.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="faq-section">
      <div className="faq-section__container">
        <motion.h2
          className="faq-section__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${
                activeIndex === index ? "faq-item--active" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="faq-item__question"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                {faq.question}
                <ChevronDown
                  className={`faq-item__icon ${
                    activeIndex === index ? "faq-item__icon--active" : ""
                  }`}
                />
              </button>
              <motion.div
                className="faq-item__answer"
                initial={false}
                animate={{ height: activeIndex === index ? "auto" : 0 }}
              >
                {faq.answer}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
