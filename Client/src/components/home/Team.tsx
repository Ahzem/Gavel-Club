import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CardContent, CardHeader, CardTitle } from '../ui/card';
import { teamMembers } from '../../lib/data';
import { motion } from 'framer-motion';

export function Team() {
  return (
    <section className="section">
      <div className="section__container">
        <motion.div 
          className="section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section__title">Our Team</h2>
          <p className="section__description">
            Meet the dedicated individuals who make it all possible
          </p>
        </motion.div>
        <div className="team__grid">
          {teamMembers.map((item, index) => (
            <motion.div
              key={`${teamMembers}-item-${item.id || index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="team-card">
                <CardHeader>
                  <div className="team-card__header">
                    <Avatar className="team-card__avatar">
                      <AvatarImage src={item.image} alt={item.name} />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="team-card__info">
                      <CardTitle className="team-card__name">{item.name}</CardTitle>
                      <p className="team-card__role">{item.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="team-card__bio">{item.bio}</p>
                </CardContent>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}