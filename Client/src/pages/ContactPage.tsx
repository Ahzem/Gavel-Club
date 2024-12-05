import { motion } from 'framer-motion';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';
import { MapLocation } from '../components/contact/MapLocation';

export function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="">
        <div className="container">
          <h1 className="">
            Get in Touch
          </h1>
          <p className="">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>
      <div className="">
        <div className="">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      <MapLocation />
    </motion.div>
  );
}