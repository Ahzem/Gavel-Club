import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { teamApi } from "../../services/api";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  year: string;
  image?: {
    url: string;
    publicId: string;
  };
}

export function Leadership() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const fetchedMembers = await teamApi.getAllMembers();
        setMembers(fetchedMembers);
      } catch {
        setError("Failed to fetch team members");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Group members by year and sort years in descending order
  const groupedMembers = members.reduce((acc, member) => {
    const year = member.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  const sortedYears = Object.keys(groupedMembers).sort(
    (a, b) => Number(b) - Number(a)
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="leadership-section">
      <div className="leadership-section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="leadership-section__title">Leadership Team</h2>
          <p className="leadership-section__subtitle">
            Meet the dedicated individuals who make it all possible
          </p>
        </motion.div>

        {sortedYears.map((year) => (
          <motion.div
            key={year}
            className="leadership-section__year-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="leadership-section__year">Team {year}</h3>
            <div className="leadership-section__grid">
              {groupedMembers[year].map((member, index) => (
                <motion.div
                  key={member._id}
                  className="leader-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="leader-card__avatar-wrapper">
                    <img
                      src={member.image?.url || "/placeholder.png"}
                      alt={member.name}
                      className="leader-card__avatar"
                    />
                  </div>
                  <h3 className="leader-card__name">{member.name}</h3>
                  <p className="leader-card__role">{member.position}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
