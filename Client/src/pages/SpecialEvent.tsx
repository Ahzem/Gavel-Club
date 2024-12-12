import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { specialEventApi } from "../services/api";

interface SpecialEventData {
  image1: { url: string };
  image2: { url: string };
  text1: string;
  text2: string;
}

export function SpecialEvent() {
  const [specialEvent, setSpecialEvent] = useState<SpecialEventData | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await specialEventApi.getSpecialEvent();
        setSpecialEvent(data);
      } catch (error) {
        console.error("Failed to fetch special event:", error);
      }
    }
    fetchData();
  }, []);

  if (!specialEvent) return null;

  return (
    <section className="special-event">
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section__title">Special Event</h2>
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
                src={specialEvent.image1.url}
                alt="Special event first image"
                className="special-event__image"
              />
            </div>
            <p className="special-event__text">{specialEvent.text1}</p>
          </motion.div>

          <motion.div
            className="special-event__column"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="special-event__text">{specialEvent.text2}</p>
            <div className="special-event__image-wrapper">
              <img
                src={specialEvent.image2.url}
                alt="Special event second image"
                className="special-event__image"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
