import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Award, Users, Mic2, Target } from 'lucide-react';

const benefits = [
  {
    title: 'Leadership Skills',
    description: 'Develop essential leadership qualities through hands-on experience',
    icon: Award,
  },
  {
    title: 'Communication',
    description: 'Master the art of public speaking and effective communication',
    icon: Mic2,
  },
  {
    title: 'Networking',
    description: 'Connect with like-minded individuals and build lasting relationships',
    icon: Users,
  },
  {
    title: 'Personal Growth',
    description: 'Achieve your personal and professional development goals',
    icon: Target,
  },
];

export function Benefits() {
  return (
    <section className="">
      <div className="">
        <h2 className="">
          Member Benefits
        </h2>
        <div className="">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardHeader>
                <benefit.icon className="" />
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}