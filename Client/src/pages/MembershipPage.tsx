import { motion } from 'framer-motion';
import { Benefits } from '../components/membership/Benefits';
import { JoinProcess } from '../components/membership/JoinProcess';
import { FAQ } from '../components/membership/FAQ';

export function MembershipPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="">
        <div className="">
          <h1 className="">
            Join Our Community
          </h1>
          <p className="">
            Become a member of ITUM Gavel Club and embark on a journey of personal growth and leadership development.
          </p>
        </div>
      </section>
      <Benefits />
      <JoinProcess />
      <FAQ />
    </motion.div>
  );
}