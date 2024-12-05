import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const steps = [
  {
    id: 1,
    title: 'Submit Application',
    description: 'Fill out the online membership application form with your details.',
  },
  {
    id: 2,
    title: 'Attend Orientation',
    description: 'Join our orientation session to learn about club activities and expectations.',
  },
  {
    id: 3,
    title: 'Complete Registration',
    description: 'Pay the membership fee and complete necessary documentation.',
  },
  {
    id: 4,
    title: 'Begin Your Journey',
    description: 'Start attending meetings and participating in club activities.',
  },
];

export function JoinProcess() {
  return (
    <section className="">
      <div className="">
        <h2 className="">How to Join</h2>
        <div className="">
          {steps.map((step) => (
            <Card key={step.id}>
              <CardHeader>
                <Badge variant="secondary" className="">
                  Step {step.id}
                </Badge>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}