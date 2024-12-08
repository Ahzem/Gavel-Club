import { motion } from "framer-motion";
import { SITE_CONFIG } from "../../lib/constants";
import logowithname from "../../assets/logowithname.png";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <motion.div 
          className="hero__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
              <span>Empowering</span>
              <span>Future Leaders</span>
          </motion.h1>

          <motion.p 
            className="hero__description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {SITE_CONFIG.description}
          </motion.p>

          <motion.div 
            className="hero__buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <img
              src={logowithname}
              alt={SITE_CONFIG.name}
              className="hero__logo__with__name"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}