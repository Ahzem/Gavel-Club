import { useEffect, useState } from "react";
import { Plus, Search, Trash2, Edit2, Image, X, Filter, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "./ImageUpload";
import { useAuth } from "../../context/AuthContext";

interface GalleryImage {
  _id: string;
  src: {
    url: string;
    publicId: string;
  };
  alt: string;
  captureDate: string;
}

interface GalleryFormData extends Partial<GalleryImage> {
  file?: File;
}
export function GalleryManagement() {
  const { token } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  // const [search, setSearch] = useState("");
  const [formData, setFormData] = useState<GalleryFormData>({
    alt: "",
    captureDate: new Date().toISOString().split("T")[0],
  });
  const [filters, setFilters] = useState({
    search: "",
    dateRange: "all",
    sortBy: "newest",
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/gallery");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("alt", formData.alt || "");
    form.append("captureDate", formData.captureDate || "");

    if (!selectedImage && formData.file) {
      form.append("image", formData.file);
    }

    try {
      const url = selectedImage
        ? `/api/gallery/${selectedImage._id}`
        : "/api/gallery";

      const method = selectedImage ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          ...(selectedImage && { "Content-Type": "application/json" }),
          Authorization: `Bearer ${token}`,
        },
        body: selectedImage
          ? JSON.stringify({
              alt: formData.alt,
              captureDate: formData.captureDate,
            })
          : form,
      });

      if (!response.ok) throw new Error("Failed to save image");

      fetchImages();
      handleCloseForm();
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete image");

      fetchImages();
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
      file: undefined,
    });
  };

  const getFilteredImages = () => {
    return images
      .filter((image) => {
        const matchesSearch = image.alt
          .toLowerCase()
          .includes(filters.search.toLowerCase());

        if (filters.dateRange === "all") return matchesSearch;

        const imageDate = new Date(image.captureDate);
        const today = new Date();

        switch (filters.dateRange) {
          case "thisMonth":
            return (
              matchesSearch &&
              imageDate.getMonth() === today.getMonth() &&
              imageDate.getFullYear() === today.getFullYear()
            );
          case "thisYear":
            return (
              matchesSearch && imageDate.getFullYear() === today.getFullYear()
            );
          case "lastYear":
            return (
              matchesSearch &&
              imageDate.getFullYear() === today.getFullYear() - 1
            );
          default:
            return matchesSearch;
        }
      })
      .sort((a, b) => {
        if (filters.sortBy === "newest") {
          return (
            new Date(b.captureDate).getTime() -
            new Date(a.captureDate).getTime()
          );
        } else {
          return (
            new Date(a.captureDate).getTime() -
            new Date(b.captureDate).getTime()
          );
        }
      });
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="gallery-management">
      <div className="gallery-management__header">
        <div className="gallery-management__title">
          <h2>Gallery Management</h2>
          <p className="gallery-management__subtitle">
            Manage and organize your gallery images
          </p>
        </div>
        <button
          className="gallery-management__add-btn"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={20} /> Add Image
        </button>
      </div>
      <div className="gallery-management__filters">
        <div className="gallery-management__search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by image description..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>

        <div className="gallery-management__filter-group">
          <Filter size={20} />
          <select
            title="Date Range"
            value={filters.dateRange}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, dateRange: e.target.value }))
            }
            className="gallery-management__select"
          >
            <option value="all">All Time</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
            <option value="lastYear">Last Year</option>
          </select>

          <Calendar size={20} />
          <select
            title="Sort by"
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
            }
            className="gallery-management__select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
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
                      currentImage={selectedImage?.src.url}
                      onImageChange={(file) => {
                        if (file instanceof File) {
                          setFormData((prev) => ({
                            ...prev,
                            file: file,
                          }));
                        } else if (typeof file === "object" && "url" in file) {
                          setFormData((prev) => ({
                            ...prev,
                            src: file,
                          }));
                        }
                      }}
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
              key={image._id}
              className="gallery-management__item"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src={image.src.url} alt={image.alt} />
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
                    onClick={() => handleDelete(image._id)}
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
