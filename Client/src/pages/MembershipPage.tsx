import { motion } from "framer-motion";
import { Benefits } from "../components/membership/Benefits";
import { JoinProcess } from "../components/membership/JoinProcess";
import { FAQ } from "../components/membership/FAQ";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useEffect, useState } from "react";
import { membershipApi } from "../services/api";

export function MembershipPage() {
  const [config, setConfig] = useState({
    isOpen: true,
    formUrl: "",
    closeDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await membershipApi.getConfig();
        setConfig(data);
        setError(null);
      } catch (err) {
        setError(
          "Unable to load membership information. Please try again later."
        );
        console.error("Failed to fetch membership config:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const renderFormContent = () => {
    if (isLoading) {
      return (
        <motion.div
          className="membership-form__loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingSpinner />
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          className="membership-form__error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="membership-form__status membership-form__status--error">
            <h3>Error</h3>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="membership-form__retry-btn"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      );
    }

    return config.isOpen ? (
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
          src={config.formUrl}
          className="membership-form__iframe"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        />
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
          {new Date(config.closeDate).toLocaleDateString()}
        </p>
      </motion.div>
    );
  };

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
        <div className="membership-form__container">{renderFormContent()}</div>
      </section>
      
      <FAQ />
    </motion.div>
  );
}
