import { SITE_CONFIG } from "../../lib/constants";
import { motion } from "framer-motion";
import heroBrand from '../../assets/gavel2.png';

export function Hero() {

  return (
    <section className="hero">
      <div className="hero__container">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="hero__title-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="hero__title">
              <span>Empowering</span>
              <span>Future Leaders</span>
            </h1>
          </motion.div>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Join us in shaping tomorrow's technology leaders at the Institute of
            Technology, University of Moratuwa
          </motion.p>
          <motion.div
            className="hero__buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              className="hero__button hero__button--join"
              onClick={() => (window.location.href = "/join")}
            >
              Join Now
            </button>
            <button
              className="hero__button hero__button--learn"
              onClick={() => (window.location.href = "/about")}
            >
              Watch Video
            </button>
          </motion.div>
          <motion.div
            className="hero__branding"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={heroBrand}
              alt={SITE_CONFIG.name}
              className="hero__logo"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
