import { useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";

const galleryImages = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80",
    alt: "Public Speaking Workshop",
    date: "2024-12-15",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80",
    alt: "Leadership Summit",
    date: "2024-12-01",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80",
    alt: "Networking Event",
    date: "2024-12-25",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80",
    alt: "Award Ceremony",
    date: "2024-13-21",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80",
    alt: "Networking Event",
    date: "2024-12-15",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80",
    alt: "Award Ceremony",
    date: "2024-12-23",
  },
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80",
    alt: "Public Speaking Workshop",
    date: "2024-12-15",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80",
    alt: "Leadership Summit",
    date: "2024-12-01",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80",
    alt: "Networking Event",
    date: "2024-12-25",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80",
    alt: "Award Ceremony",
    date: "2024-13-21",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80",
    alt: "Networking Event",
    date: "2024-12-15",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80",
    alt: "Award Ceremony",
    date: "2024-12-23",
  },
];

export function Gallery() {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedImages = isExpanded
    ? galleryImages
    : galleryImages.slice(0, 6);

  const toggleGallery = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="gallery-section">
      <div className="gallery-section__container">
        <h2 className="gallery-section__title">Event Gallery</h2>
        <div className="gallery-grid">
          {displayedImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="gallery-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="gallery-card__image-wrapper">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="gallery-card__image"
                  />
                  <div className="gallery-card__overlay">
                    <div className="gallery-card__content">
                      <h3 className="gallery-card__title">{image.alt}</h3>
                      <div className="gallery-card__date">
                        <FiCalendar className="gallery-card__icon" />
                        <span>{new Date(image.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </motion.div>
          ))}
        </div>
        {galleryImages.length > 6 && (
          <motion.div
            className="gallery-seemore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button onClick={toggleGallery} className="gallery-seemore__link">
              {isExpanded ? "Show Less" : "See More"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
