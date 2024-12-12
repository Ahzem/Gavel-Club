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
import { ImageUpload } from "./ImageUpload";
import { blogService } from "../../services/blogService";
import { toast } from "sonner";
import { Blog, BlogFormData } from "../../types/Blog";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

interface FormState {
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    email: string;
    department: string;
    imageUrl: string | File;
  };
  coverImage: string | File;
  publishedDate: string;
  status: "draft" | "published";
  claps: number;
}

export function BlogsManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    date: "",
  });

  const [formData, setFormData] = useState<FormState>({
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
  });
  const [shouldSearch, setShouldSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const fetchedBlogs = await blogService.getBlogs({
          status: filters.status,
          search: filters.search,
        });
        setBlogs(fetchedBlogs);
      } catch {
        toast.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [filters.status, filters.search]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        // Only include filters if shouldSearch is true
        const fetchedBlogs = await blogService.getBlogs(
          shouldSearch
            ? {
                status: filters.status !== "all" ? filters.status : undefined,
                search: filters.search || undefined,
              }
            : undefined
        );
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [shouldSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
    setShouldSearch(true);
  };

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

  const clearForm = () => {
    setFormData({
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
    });
    localStorage.removeItem("blogDraft");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const blogData: BlogFormData = {
        title: formData.title,
        subtitle: formData.subtitle,
        content: formData.content,
        author: {
          name: formData.author.name,
          department: formData.author.department,
          email: formData.author.email,
          imageUrl: formData.author.imageUrl,
        },
        coverImage: formData.coverImage,
        status: formData.status,
      };

      const savedBlog = selectedBlog
        ? await blogService.updateBlog(selectedBlog._id, blogData)
        : await blogService.createBlog(blogData);

      setBlogs((prev) =>
        selectedBlog
          ? prev.map((b) => (b._id === selectedBlog._id ? savedBlog : b))
          : [...prev, savedBlog]
      );

      clearForm();
      handleCloseForm();
      localStorage.removeItem("blogDraft");
      toast.success(
        selectedBlog ? "Blog updated successfully" : "Blog created successfully"
      );
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog");
    } finally {
      setIsSaving(false);
    }
  };

  // if (isLoading) {
  //   return <div className="blogs-management__loading">Loading blogs...</div>;
  // }

  const handleStatusChange = async (
    blog: Blog,
    newStatus: "draft" | "published"
  ) => {
    try {
      const updatedBlog = await blogService.updateBlogStatus(
        blog._id,
        newStatus
      );
      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? updatedBlog : b))
      );
      toast.success(
        `Blog ${
          newStatus === "published" ? "published" : "unpublished"
        } successfully`
      );
    } catch {
      toast.error("Failed to update blog status");
    }
  };

  const handleDelete = async (blog: Blog) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await blogService.deleteBlog(blog._id);
      setBlogs((prev) => prev.filter((b) => b._id !== blog._id));
      toast.success("Blog deleted successfully");
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedBlog(null);
    clearForm();
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchTerm = filters.search.toLowerCase().trim();
    const matchesSearch =
      searchTerm === "" ||
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.subtitle.toLowerCase().includes(searchTerm) ||
      blog.content.toLowerCase().includes(searchTerm);

    const matchesStatus =
      filters.status === "all" || blog.status === filters.status;

    const matchesDate =
      !filters.date ||
      new Date(blog.publishedDate).toISOString().split("T")[0] === filters.date;

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
              onChange={handleSearch}
            />
          </div>
          <select
            title="Filter by status"
            value={filters.status}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, status: e.target.value }));
              setShouldSearch(true);
            }}
            className="blogs-management__filter"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, date: e.target.value }));
              setShouldSearch(true);
            }}
            className="blogs-management__filter"
            placeholder="Filter by date"
          />
          <button
            title="Add New Blog"
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
                      onImageChange={(file) => {
                        if (file instanceof File || typeof file === "string") {
                          setFormData((prev) => ({
                            ...prev,
                            coverImage: file,
                          }));
                        }
                      }}
                      currentImage={
                        typeof formData.coverImage === "string"
                          ? formData.coverImage
                          : undefined
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
                        <p className="blog-form__help-text">
                          {" "}
                          Recommended size: 200x200px or Square Image
                        </p>
                        <ImageUpload
                          onImageChange={(file) => {
                            if (
                              file instanceof File ||
                              typeof file === "string"
                            ) {
                              setFormData((prev) => ({
                                ...prev,
                                author: {
                                  ...prev.author,
                                  imageUrl: file,
                                },
                              }));
                            }
                          }}
                          currentImage={
                            typeof formData.author.imageUrl === "string"
                              ? formData.author.imageUrl
                              : undefined
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="blog-form__field blog-form__field--full">
                    <label>Status</label>
                    <select
                      title="Select status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as "draft" | "published",
                        }))
                      }
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="blog-form__actions blog-form__field--full">
                    <button
                      title="Cancel"
                      type="button"
                      className="button button--secondary"
                      onClick={handleCloseForm}
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      title="Save as Draft or Publish"
                      type="submit"
                      className="button button--primary"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <span />
                          {formData.status === "draft"
                            ? "Saving..."
                            : "Publishing..."}
                        </>
                      ) : formData.status === "draft" ? (
                        "Save as Draft"
                      ) : (
                        "Publish"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="blogs-grid">
        {isLoading ? (
          <div className="blogs-management__loading-container">
            <LoadingSpinner />
          </div>
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog._id} className="blog-card">
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
                    title="Edit Blog"
                    onClick={() => {
                      setSelectedBlog(blog);
                      setFormData({
                        ...blog,
                        coverImage: blog.coverImage || "",
                        author: {
                          ...blog.author,
                          imageUrl: blog.author.imageUrl || "",
                        },
                      });
                      setIsFormOpen(true);
                    }}
                    className="blog-card__action-btn"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    title="Delete Blog"
                    onClick={() => handleDelete(blog)}
                    className="blog-card__action-btn blog-card__action-btn--delete"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    title="Publish/Unpublish Blog"
                    onClick={() =>
                      handleStatusChange(
                        blog,
                        blog.status === "draft" ? "published" : "draft"
                      )
                    }
                    className="blog-card__action-btn"
                  >
                    {blog.status === "draft" ? "Publish" : "Unpublish"}
                  </button>
                  <button
                    title="Copy Link"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/blog/${blog.slug}`
                      );
                      toast.success("Link copied to clipboard");
                    }}
                    className="blog-card__action-btn"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="blogs-management__empty ">
            <FileText size={48} />
            <h3>No Blogs Found</h3>
            <p>There are no blogs matching your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
