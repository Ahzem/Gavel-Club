import { useState } from "react";
import { Plus, Search, Trash2, Edit2, Image, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "./ImageUpload";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  captureDate: string;
}

export function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    alt: "",
    captureDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/gallery", {
        method: selectedImage ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save image");

      const savedImage = await response.json();
      setImages((prev) =>
        selectedImage
          ? prev.map((img) => (img.id === selectedImage.id ? savedImage : img))
          : [...prev, savedImage]
      );

      handleCloseForm();
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedImage(null);
    setFormData({
      alt: "",
      captureDate: new Date().toISOString().split("T")[0],
    });
  };

  const filteredImages = images.filter((image) =>
    image.alt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="gallery-management">
      <div className="gallery-management__header">
        <div className="gallery-management__filters">
          <div className="gallery-management__search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search images..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button
          className="gallery-management__add-btn"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={20} />
          Add Image
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="gallery-form-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="gallery-form">
              <div className="gallery-form__header">
                <h2>{selectedImage ? "Edit Image" : "Add New Image"}</h2>
                <button
                  className="gallery-form__close"
                  onClick={handleCloseForm}
                  title="Close"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="gallery-form__content">
                <div className="gallery-form__grid">
                  <div className="events-form__field events-form__field--full">
                    <label>Upload Image</label>
                    <p className="gallery-form__help-text">
                      Recommended size: 1200x800px (3:2)
                    </p>
                    <ImageUpload
                      onImageChange={(file) =>
                        setFormData((prev) => ({
                          ...prev,
                          src: file || undefined
                        }))
                      }
                    />
                  </div>

                  <div className="events-form__field">
                    <label>Alt Text</label>
                    <input
                      type="text"
                      value={formData.alt}
                      onChange={(e) =>
                        setFormData({ ...formData, alt: e.target.value })
                      }
                      placeholder="Describe the image"
                      required
                    />
                  </div>

                  <div className="events-form__field">
                    <label>Capture Date</label>
                    <input
                      type="date"
                      value={formData.captureDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          captureDate: e.target.value,
                        })
                      }
                      required
                      placeholder="Capture Date"
                    />
                  </div>

                  <div className="events-form__actions events-form__field--full">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="button button--secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button button--primary">
                      {selectedImage ? "Save Changes" : "Add Image"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredImages.length > 0 ? (
        <div className="gallery-management__grid">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              className="gallery-management__item"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src={image.src} alt={image.alt} />
              <div className="gallery-management__item-overlay">
                <h3>{image.alt}</h3>
                <p>{new Date(image.captureDate).toLocaleDateString()}</p>
                <div className="gallery-management__item-actions">
                  <button
                    onClick={() => {
                      setSelectedImage(image);
                      setFormData(image);
                      setIsFormOpen(true);
                    }}
                    title="Edit image"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    title="Delete image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="gallery-management__empty">
          <Image size={48} />
          <h3>No images found</h3>
          <p>Start by adding some images to the gallery</p>
        </div>
      )}
    </div>
  );
}
