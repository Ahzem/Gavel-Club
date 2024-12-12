import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { teamApi } from "../../services/api";
import { useState, useEffect } from "react";


interface TeamMember {
  _id: string;
  name: string;
  position: string;
  thoughts?: string;
  image?: {
    url: string;
    publicId: string;
  };
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const members = await teamApi.getAllMembers();
        // Filter members with thoughts
        const membersWithTestimonials = members.filter(
          (member: TeamMember) =>
            member.thoughts && member.thoughts.trim() !== ""
        );
        setTestimonials(membersWithTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) return null;
  return (
    <section className="section testimonials">
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section__title">What Our Members Say</h2>
          <p className="section__description">
            Real stories from our community members
          </p>
        </motion.div>
        <div className="testimonials__grid">
          {testimonials.map((item, index) => (
            <motion.div
              key={`${testimonials}-item-${item._id || index}`}
              className="testimonial__wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="testimonial-card">
                <Quote className="testimonial-card__quote" />
                <div className="testimonial-card__content">
                  <p className="testimonial-card__text">{item.thoughts}</p>
                </div>
                <div className="testimonial-card__header">
                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">
                      <img src={item.image?.url} alt={item.name} />
                      <div>{item.name[0]}</div>
                    </div>
                    <div className="testimonial-card__info">
                      <p className="testimonial-card__name">{item.name}</p>
                      <p className="testimonial-card__role">{item.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
