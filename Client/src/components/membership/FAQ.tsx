import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const faqs = [
  {
    question: 'What is Gavel Club?',
    answer: 'Gavel Club is a youth program of Toastmasters International that helps members develop communication and leadership skills through public speaking practice.',
  },
  {
    question: 'How often do meetings take place?',
    answer: 'We meet weekly on campus. Regular meetings are held every Wednesday from 4:30 PM to 6:30 PM.',
  },
  {
    question: 'What are the membership fees?',
    answer: 'The membership fee is [amount] per semester. This covers all club activities, materials, and access to educational resources.',
  },
  {
    question: 'Can anyone join the club?',
    answer: 'The club is open to all ITUM students. We welcome members from all academic years and departments.',
  },
  {
    question: 'What happens at a typical meeting?',
    answer: 'Meetings include prepared speeches, impromptu speaking sessions (Table Topics), speech evaluations, and various leadership roles practice.',
  },
];

export function FAQ() {
  return (
    <section className="">
      <div className="">
        <h2 className="">
          Frequently Asked Questions
        </h2>
        <div className="">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}