import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';

const leaders = [
  {
    name: 'Prof. James Wilson',
    role: 'Club Mentor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    description: 'Guiding the club with 15+ years of Toastmasters experience.',
  },
  {
    name: 'Lisa Chen',
    role: 'Vice President Education',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    description: 'Dedicated to creating impactful educational programs.',
  },
  {
    name: 'Alex Kumar',
    role: 'Secretary',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
    description: 'Ensuring smooth club operations and communication.',
  },
];

export function Leadership() {
  return (
    <section className="">
      <div className="">
        <h2 className="">Leadership Team</h2>
        <div className="">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="">
                  <div className="">
                    <Avatar className="">
                      <AvatarImage src={leader.image} alt={leader.name} />
                      <AvatarFallback>{leader.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="">{leader.name}</h3>
                    <p className="">{leader.role}</p>
                    <p className="">{leader.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}