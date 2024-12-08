import { motion } from 'framer-motion';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';
import { MapLocation } from '../components/contact/MapLocation';

export function ContactPage() {
  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="contact-hero">
        <motion.div 
          className="contact-hero__container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="contact-hero__title">Get in Touch</h1>
          <p className="contact-hero__description">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>
      </section>
      
      <div className="contact-section">
        <div className="contact-section__container">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      
      <MapLocation />
    </motion.div>
  );
}