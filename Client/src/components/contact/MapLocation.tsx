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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1665.6829472525303!2d79.99326209735912!3d6.808236434626187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24e1a4acef3e7%3A0xb2ef9c84206274fc!2sInstitute%20of%20Technology%2C%20University%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1734084966536!5m2!1sen!2slk"
            width="100%"
            height="100%"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            {...(HTMLIFrameElement.prototype.loading !== undefined ? { loading: "lazy" } : {})}
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
