import { motion } from "framer-motion";

export function SpecialEvent() {
  return (
    <section className="special-event">
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section__title">10th Anniversary Celebration</h2>
          <p className="section__description">
            A milestone event that brought our community together
          </p>
        </motion.div>

        <div className="special-event__content">
          <motion.div
            className="special-event__column"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="special-event__image-wrapper">
              <img
                src="/blog/public-speaking-2.jpg"
                alt="Event celebration"
                className="special-event__image"
              />
            </div>
            <p className="special-event__text">
              Our grand celebration brought together over 500 members, alumni,
              and supporters for an unforgettable evening of reflection,
              connection, and inspiration. Our grand celebration brought together over 500 members, alumni,
              and supporters for an unforgettable evening of reflection,
              connection, and inspiration. 
            </p>
          </motion.div>

          <motion.div
            className="special-event__column"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="special-event__text">
              The evening featured keynote speeches from industry leaders,
              interactive workshops, and a showcase of our community's
              achievements over the decade. The evening featured keynote speeches from industry leaders,
              interactive workshops, and a showcase of our community's
              achievements over the decade.
            </p>
            <div className="special-event__image-wrapper">
              <img
                src="/blog/public-speaking-2.jpg"
                alt="Workshop session"
                className="special-event__image"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
