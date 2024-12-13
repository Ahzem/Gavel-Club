import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactInfo() {
  return (
    <section className="contact-info">
      <h2 className="contact-info__title">Contact Information</h2>
      <div className="contact-info__grid">
        <motion.div
          className="contact-info__item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="contact-info__icon-wrapper">
            <MapPin className="contact-info__icon" />
          </div>
          <div className="contact-info__content">
            <h3 className="contact-info__label">Address</h3>
            <p className="contact-info__text">
              Institute of Technology, University of Moratuwa
              <br />
              Diyagama, Homagama
              <br />
              Sri Lanka
            </p>
          </div>
        </motion.div>

        <motion.div
          className="contact-info__item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="contact-info__icon-wrapper">
            <Mail className="contact-info__icon" />
          </div>
          <div className="contact-info__content">
            <h3 className="contact-info__label">Email</h3>
            <p className="contact-info__text">gavelndt.official@gmail.com </p>
          </div>
        </motion.div>

        <motion.div
          className="contact-info__item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="contact-info__icon-wrapper">
            <Phone className="contact-info__icon" />
          </div>
          <div className="contact-info__content">
            <h3 className="contact-info__label">Phone</h3>
            <p className="contact-info__text">+94 11 2XXX XXX</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
