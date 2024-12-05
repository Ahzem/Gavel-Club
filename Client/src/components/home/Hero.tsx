import { SITE_CONFIG } from '../../lib/constants';
import { Button } from '../ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="hero">
      <motion.div 
        className="hero__bg"
        style={{ opacity }}
      >
        <motion.img
          className="hero__bg-image"
          src="/images/hero-bg.jpg" // Add your image path
          alt=""
          style={{ y: backgroundY }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <div className="hero__bg-overlay" />
      </motion.div>

      <div className="hero__container">
        <motion.div 
          className="hero__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1 
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Welcome to {SITE_CONFIG.name}
          </motion.h1>
          <motion.p 
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Empowering voices, building leaders at the Institute of Technology, University of Moratuwa
          </motion.p>
          <motion.div 
            className="hero__buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button variant="secondary">Join Us</Button>
            <Button variant="outline">Learn More</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}