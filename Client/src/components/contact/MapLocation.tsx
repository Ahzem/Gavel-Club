import { motion } from "framer-motion";

export function MapLocation() {
  return (
    <section className="map-section">
      <div className="map-section__container">
        <motion.h2 
          className="map-section__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Location
        </motion.h2>
        <motion.div 
          className="map-section__frame"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.575240103597!2d80.03775661477226!3d6.821593095078777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2523b05555555%3A0x546c34cd99431088!2sInstitute%20of%20Technology%20University%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1680429124025!5m2!1sen!2slk"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}