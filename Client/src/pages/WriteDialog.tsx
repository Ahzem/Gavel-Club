import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { RichTextEditor } from "./admin/RichTextEditor";
import { ImageUpload } from "./admin/ImageUpload";
import { blogService } from "../services/blogService";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

interface WriteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WriteDialog({ isOpen, onClose }: WriteDialogProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("draftBlog");
    return saved
      ? JSON.parse(saved)
      : {
          title: "",
          subtitle: "",
          content: "",
          author: {
            name: "",
            department: "",
            linkedin: "",
            imageUrl: "" as string | File,
          },
          coverImage: "" as string | File,
          status: "draft" as const,
        };
  });

  useEffect(() => {
    localStorage.setItem("draftBlog", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasAgreed) {
      toast.error("Please accept the declaration");
      return;
    }

    // Validate all required fields
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.author.name.trim() ||
      !formData.author.department.trim() ||
      !formData.author.linkedin.trim()
    ) {
      toast.error(
        "Please fill in all required fields (Name, Department, LinkedIn)"
      );
      return;
    }

    setIsSaving(true);
    try {
      await blogService.createBlogWithoutAuth({
        ...formData,
        status: "draft",
      });

      // Format the email data
      const emailData = {
        from_name: formData.author.name,
        from_department: formData.author.department || "Not specified",
        from_linkedin: formData.author.linkedin || "Not specified",
        blog_title: formData.title,
        blog_subtitle: formData.subtitle || "Not specified",
        submission_time: new Date().toLocaleString(),
        to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_FOR_BLOG,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Blog submitted for review successfully!");
      // Clear form and localStorage
      localStorage.removeItem("draftBlog");
      setFormData({
        title: "",
        subtitle: "",
        content: "",
        author: {
          name: "",
          department: "",
          linkedin: "",
          imageUrl: "",
        },
        coverImage: "",
        status: "draft" as const,
      });
      setHasAgreed(false);
      onClose();
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to submit blog. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="write-dialog-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="write-dialog">
            <div className="write-dialog__header">
              <h2>Write Blog</h2>
              <button
                title="Write Blog"
                onClick={onClose}
                className="write-dialog__close"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="write-dialog__content">
                <div className="form-field">
                  <label>Cover Image</label>
                  <ImageUpload
                    onImageChange={(file) => {
                      if (file instanceof File) {
                        setFormData((prev: typeof formData) => ({
                          ...prev,
                          coverImage: file,
                        }));
                      }
                    }}
                  />
                </div>

                <div className="form-field">
                  <label>Title</label>
                  <input
                    title="Title"
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev: typeof formData) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Subtitle</label>
                  <input
                    title="Subtitle"
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData((prev: typeof formData) => ({
                        ...prev,
                        subtitle: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="form-field">
                  <label>Content</label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content: string) =>
                      setFormData((prev: typeof formData) => ({
                        ...prev,
                        content,
                      }))
                    }
                  />
                </div>

                <div className="form-field-group">
                  <div className="form-field">
                    <label>Your Name</label>
                    <input
                      title="Your Name"
                      type="text"
                      value={formData.author.name}
                      onChange={(e) =>
                        setFormData((prev: typeof formData) => ({
                          ...prev,
                          author: { ...prev.author, name: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Department</label>
                    <input
                      title="Your Department"
                      type="text"
                      value={formData.author.department}
                      onChange={(e) =>
                        setFormData((prev: typeof formData) => ({
                          ...prev,
                          author: {
                            ...prev.author,
                            department: e.target.value,
                          },
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>LinkedIn Profile</label>
                    <input
                      title="Your LinkedIn Profile"
                      type="url"
                      value={formData.author.linkedin}
                      onChange={(e) =>
                        setFormData((prev: typeof formData) => ({
                          ...prev,
                          author: { ...prev.author, linkedin: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Your Photo</label>
                    <ImageUpload
                      onImageChange={(file) => {
                        if (file instanceof File) {
                          setFormData((prev: typeof formData) => ({
                            ...prev,
                            author: {
                              ...prev.author,
                              imageUrl: file,
                            },
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="write-dialog__declaration">
                <label className="declaration-checkbox">
                  <input
                    type="checkbox"
                    checked={hasAgreed}
                    onChange={(e) => setHasAgreed(e.target.checked)}
                  />
                  <span className="declaration-text">
                    I understand that once submitted, I cannot edit this blog
                    post directly. If changes are needed, I must contact the
                    admin through the club's contact section.
                  </span>
                </label>
              </div>

              <div className="write-dialog__actions">
                <button
                  type="button"
                  onClick={onClose}
                  className="button button--secondary"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button button--primary"
                  disabled={isSaving}
                >
                  {isSaving ? "Submitting..." : "Submit for Review"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
