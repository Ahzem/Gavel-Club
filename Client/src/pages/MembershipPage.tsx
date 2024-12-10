import { motion } from "framer-motion";
import { Benefits } from "../components/membership/Benefits";
import { JoinProcess } from "../components/membership/JoinProcess";
import { FAQ } from "../components/membership/FAQ";

const APPLICATION_STATUS = {
  isOpen: true,
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdctGsNgsBv22Arq5WuqJ2mg_hRNNwf866p164mVxllIiSSaw/viewform?embedded=true",
  closeDate: "2024-06-30",
};

export function MembershipPage() {
  return (
    <motion.div
      className="membership-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="membership-hero">
        <div className="membership-hero__container">
          <motion.h1
            className="membership-hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join Our Community
          </motion.h1>
          <motion.p
            className="membership-hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Become a member of ITUM Gavel Club and embark on a journey of
            personal growth and leadership development.
          </motion.p>
        </div>
      </section>

      <Benefits />
      <JoinProcess />

      <section className="membership-form">
        <div className="membership-form__container">
          {APPLICATION_STATUS.isOpen ? (
            <motion.div
              className="membership-form__wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="membership-form__status membership-form__status--open">
                Applications are now open!
              </div>
              <iframe
                title="Membership Application Form"
                src={APPLICATION_STATUS.formUrl}
                className="membership-form__iframe"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
              >
                Loading...
              </iframe>
            </motion.div>
          ) : (
            <motion.div
              className="membership-form__status membership-form__status--closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Applications are currently closed</h3>
              <p>
                Next intake will open on{" "}
                {new Date(APPLICATION_STATUS.closeDate).toLocaleDateString()}
              </p>
            </motion.div>
          )}
        </div>
      </section>
      <FAQ />
    </motion.div>
  );
}
