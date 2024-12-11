import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AspectRatio } from "../ui/aspect-ratio";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { GalleryImage } from "../../lib/types";
import { FiCalendar } from "react-icons/fi";

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/gallery");
      if (!response.ok) throw new Error("Failed to fetch gallery images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayedImages = isExpanded ? images : images.slice(0, 6);

//   return (
//     <section className="gallery-section">
//       <div className="gallery-section__container">
//         <h2 className="gallery-section__title">Event Gallery</h2>
//         <div className="gallery-grid">
//           {displayedImages.map((image, index) => (
//             <motion.div
//               key={image._id}
//               className="gallery-card"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="gallery-card__image-wrapper">
//                 <AspectRatio ratio={16 / 9}>
//                   <img
//                     src={image.src.url}
//                     alt={image.alt}
//                     className="gallery-card__image"
//                   />
//                   <div className="gallery-card__overlay">
//                     <div className="gallery-card__content">
//                       <h3 className="gallery-card__title">{image.alt}</h3>
//                       <div className="gallery-card__date">
//                         <FiCalendar className="gallery-card__icon" />
//                         <span>
//                           {new Date(image.captureDate).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </AspectRatio>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         {images.length > 6 && (
//           <motion.div
//             className="gallery-seemore"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <button onClick={toggleGallery} className="gallery-seemore__link">
//               {isExpanded ? "Show Less" : "See More"}
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// }


return (
  <section className="gallery-section">
    <div className="gallery-section__container">
      <h2 className="gallery-section__title">Event Gallery</h2>
      <p className="gallery-section__subtitle">
        Capturing moments from our memorable events and activities
      </p>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="gallery-grid">
            {displayedImages.map((image, index) => (
            <motion.div
            key={image._id}
            className="gallery-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="gallery-card__image-wrapper">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={image.src.url}
                  alt={image.alt}
                  className="gallery-card__image"
                />
                <div className="gallery-card__overlay">
                  <div className="gallery-card__content">
                    <h3 className="gallery-card__title">{image.alt}</h3>
                    <div className="gallery-card__date">
                      <FiCalendar className="gallery-card__icon" />
                      <span>
                        {new Date(image.captureDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </motion.div>
            ))}
          </div>
          {images.length > 6 && (
            <motion.div
              className="gallery-seemore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button onClick={() => setIsExpanded(!isExpanded)} className="gallery-seemore__link">
                {isExpanded ? "Show Less" : "See More"}
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  </section>
);
}