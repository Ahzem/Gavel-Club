import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CardContent, CardHeader } from '../ui/card';
import { testimonials } from '../../lib/data';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function Testimonials() {
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
              key={`${testimonials}-item-${item.id || index}`}
              className="testimonial__wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="testimonial-card">
                <Quote className="testimonial-card__quote" />
                <CardContent className="testimonial-card__content">
                  <p className="testimonial-card__text">{item.content}</p>
                </CardContent>
                <CardHeader className="testimonial-card__header">
                  <div className="testimonial-card__author">
                    <Avatar className="testimonial-card__avatar">
                      <AvatarImage src={item.image} alt={item.name} />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="testimonial-card__info">
                      <p className="testimonial-card__name">{item.name}</p>
                      <p className="testimonial-card__role">{item.role}</p>
                    </div>
                  </div>
                </CardHeader>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}