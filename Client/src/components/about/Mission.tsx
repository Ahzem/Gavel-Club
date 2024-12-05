import { RocketIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function Mission() {
  return (
    <section className="">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <div className="">
            <RocketIcon className="" />
          </div>
          <h1 className="">Our Mission</h1>
          <p className="">
            To provide a supportive and positive learning experience in which members are
            empowered to develop communication and leadership skills, resulting in greater
            self-confidence and personal growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}