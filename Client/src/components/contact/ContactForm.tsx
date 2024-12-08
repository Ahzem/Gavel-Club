import { motion } from "framer-motion";

export function ContactForm() {
  return (
    <motion.div 
      className="contact-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="contact-form__title">Send us a message</h2>
      <form className="contact-form__form">
        <div className="contact-form__group">
          <label className="contact-form__label" htmlFor="name">Name</label>
          <input 
            id="name" 
            className="contact-form__input"
            placeholder="Your name" 
          />
        </div>
        <div className="contact-form__group">
          <label className="contact-form__label" htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            className="contact-form__input"
            placeholder="Your email" 
          />
        </div>
        <div className="contact-form__group">
          <label className="contact-form__label" htmlFor="message">Message</label>
          <textarea
            id="message"
            className="contact-form__textarea"
            placeholder="Type your message here"
            rows={6}
          />
        </div>
        <button type="submit" className="contact-form__button">
          Send Message
        </button>
      </form>
    </motion.div>
  );
}