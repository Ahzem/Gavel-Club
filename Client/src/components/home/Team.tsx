import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="team-card">
                <CardHeader>
                  <div className="team-card__header">
                    <Avatar className="team-card__avatar">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="team-card__info">
                      <CardTitle className="team-card__name">{member.name}</CardTitle>
                      <p className="team-card__role">{member.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="team-card__bio">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}