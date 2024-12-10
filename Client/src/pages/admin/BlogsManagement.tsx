import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Share2,
  ThumbsUp,
  Calendar,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RichTextEditor } from "./RichTextEditor";
// import { Editor } from "@tiptap/core";
import { ImageUpload } from "./ImageUpload";

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    department: string;
    email: string;
    imageUrl: string;
  };
  coverImage: string;
  publishedDate: string;
  status: "draft" | "published";
  claps: number;
  slug: string;
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export function BlogsManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    date: "all",
  });

  const [formData, setFormData] = useState<Partial<Blog> & { content: string }>(
    {
      title: "",
      subtitle: "",
      content: "",
      author: {
        name: "",
        email: "",
        department: "",
        imageUrl: "",
      },
      coverImage: "",
      publishedDate: new Date().toISOString().split("T")[0],
      status: "draft",
      claps: 0,
    }
  );

  // Save draft when closing form
  useEffect(() => {
    const saveDraft = () => {
      if (formData.title || formData.content) {
        localStorage.setItem("blogDraft", JSON.stringify(formData));
      }
    };

    window.addEventListener("beforeunload", saveDraft);
    return () => window.removeEventListener("beforeunload", saveDraft);
  }, [formData]);

  // Load draft when opening form
  useEffect(() => {
    if (isFormOpen) {
      const draft = localStorage.getItem("blogDraft");
      if (draft && !selectedBlog) {
        setFormData(JSON.parse(draft));
      }
    }
  }, [isFormOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blogData = {
        ...formData,
        slug: generateSlug(formData.title || ""),
      };

      const response = await fetch("/api/blogs", {
        method: selectedBlog ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) throw new Error("Failed to save blog");

      const savedBlog = await response.json();
      setBlogs((prev) =>
        selectedBlog
          ? prev.map((b) => (b.id === selectedBlog.id ? savedBlog : b))
          : [...prev, savedBlog]
      );

      handleCloseForm();
      localStorage.removeItem("blogDraft");
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedBlog(null);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === "all" || blog.status === filters.status;
    const matchesDate = !filters.date || blog.publishedDate === filters.date;
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="blogs-management">
      <div className="blogs-management__header">
        <div className="blogs-management__filters">
          <div className="blogs-management__search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search blogs..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <select
            title="Filter by status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="blogs-management__filter"
          >
            <option value="all">All Status</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
          </select>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="blogs-management__filter"
            placeholder="Filter by date"
          />
          <button
            className="events-management__add-btn"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus size={20} />
            Add New Blog
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="blog-form-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="blog-form">
              <h2>{selectedBlog ? "Edit Blog" : "Create New Blog"}</h2>

              <form onSubmit={handleSubmit}>
                <div className="blog-form__grid">
                  <div className="blog-form__field blog-form__field--full">
                    <label>Cover Image</label>
                    <p className="blog-form__help-text">
                      Recommended size: 1200x630px (16:9)
                    </p>
                    <ImageUpload
                      onImageChange={(file) =>
                        setFormData((prev) => ({
                          ...prev,
                          coverImage: file ? URL.createObjectURL(file) : "",
                        }))
                      }
                    />
                  </div>

                  <div className="blog-form__field">
                    <label>Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      required
                      placeholder="Enter blog title"
                    />
                  </div>

                  <div className="blog-form__field">
                    <label>Subtitle</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subtitle: e.target.value,
                        }))
                      }
                      placeholder="Optional"
                    />
                  </div>

                  <div className="blog-form__field blog-form__field--full">
                    <label>Content</label>
                    <RichTextEditor
                      value={formData.content}
                      onChange={(content) =>
                        setFormData((prev) => ({ ...prev, content }))
                      }
                    />
                  </div>

                  <div className="blog-form__author-section">
                    <h3>Author Details</h3>
                    <div className="blog-form__author-grid">
                      <div className="blog-form__field--group">
                        <div className="blog-form__field">
                          <label>Name</label>
                          <input
                            type="text"
                            value={formData.author?.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                author: {
                                  ...prev.author!,
                                  name: e.target.value,
                                },
                              }))
                            }
                            required
                            placeholder="e.g. John Doe"
                          />
                        </div>

                        <div className="blog-form__field">
                          <label>Department</label>
                          <input
                            type="text"
                            value={formData.author?.department}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                author: {
                                  ...prev.author!,
                                  department: e.target.value,
                                },
                              }))
                            }
                            required
                            placeholder="e.g. Marketing, Engineering"
                          />
                        </div>

                        <div className="blog-form__field">
                          <label>Email</label>
                          <input
                            type="email"
                            value={formData.author?.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                author: {
                                  ...prev.author!,
                                  email: e.target.value,
                                },
                              }))
                            }
                            required
                            placeholder="e.g. example@email.com"
                          />
                        </div>
                      </div>
                      <div className="blog-form__field">
                        <label>Author Image</label>
                        <p> Recommended size: 200x200px or Square Image</p>
                        <ImageUpload
                          onImageChange={(file) =>
                            setFormData((prev) => ({
                              ...prev,
                              author: {
                                ...prev.author!,
                                imageUrl: file ? URL.createObjectURL(file) : "",
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="blog-form__actions blog-form__field--full">
                    <button
                      type="button"
                      className="button button--secondary"
                      onClick={handleCloseForm}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button button--primary">
                      {formData.status === "draft"
                        ? "Save as Draft"
                        : "Publish"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="blogs-management__list">
        {filteredBlogs.length > 0 ? (
          <div className="blogs-grid">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="blog-card__cover"
                />
                <div className="blog-card__content">
                  <h3 className="blog-card__title">{blog.title}</h3>
                  <p className="blog-card__subtitle">{blog.subtitle}</p>

                  <div className="blog-card__meta">
                    <div className="blog-card__author">
                      <img
                        src={blog.author.imageUrl}
                        alt={blog.author.name}
                        className="blog-card__author-img"
                      />
                      <div className="blog-card__author-info">
                        <span>{blog.author.name}</span>
                        <small>{blog.author.department}</small>
                      </div>
                    </div>

                    <div className="blog-card__stats">
                      <span className="blog-card__date">
                        <Calendar size={16} />
                        {new Date(blog.publishedDate).toLocaleDateString()}
                      </span>
                      <span className="blog-card__claps">
                        <ThumbsUp size={16} />
                        {blog.claps}
                      </span>
                    </div>
                  </div>

                  <div className="blog-card__actions">
                    <button
                      onClick={() => {
                        setSelectedBlog(blog);
                        setFormData(blog);
                        setIsFormOpen(true);
                      }}
                      className="blog-card__action-btn"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      title="Delete blog"
                      onClick={() => {
                        if (window.confirm("Delete this blog?")) {
                          // Handle delete
                        }
                      }}
                      className="blog-card__action-btn blog-card__action-btn--delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/blog/${blog.slug}`
                        );
                      }}
                      className="blog-card__action-btn"
                      title="Copy share link"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="events-management__empty blog-form__field--full">
            <FileText size={48} />
            <h3>No blogs found</h3>
            <p>Start by creating a new blog post</p>
          </div>
        )}
      </div>
    </div>
  );
}
