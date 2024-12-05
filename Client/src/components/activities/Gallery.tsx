import { AspectRatio } from '../ui/aspect-ratio';
import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';

const galleryImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80',
    alt: 'Public Speaking Workshop',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80',
    alt: 'Leadership Summit',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80',
    alt: 'Networking Event',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80',
    alt: 'Award Ceremony',
  },
];

export function Gallery() {
  return (
    <section className="">
      <div className="">
        <h2 className="">Event Gallery</h2>
        <div className="">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="">
                <CardContent className="">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className=""
                    />
                  </AspectRatio>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}