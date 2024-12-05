import { Award, Heart, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for the highest standards in everything we do.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Acting with honesty and transparency in all interactions.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Fostering a supportive and inclusive environment.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Embracing new ideas and approaches to learning.",
  },
];

export function Values() {
  return (
    <section className="">
      <div className="">
        <h2 className="">Our Values</h2>
        <div className="">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="">
                  <div className="">
                    <value.icon className="" />
                  </div>
                  <h3 className="">{value.title}</h3>
                  <p className="">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
