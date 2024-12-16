import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { BlogPost } from "../types/Blog";
import { blogService } from "../services/blogService";
import { ClapButton } from "../components/ClapButton";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { Twitter, Linkedin, Copy, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { WriteDialog } from "./WriteDialog";

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWriteDialogOpen, setIsWriteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;

      try {
        const blog = await blogService.getBlogBySlug(slug);
        setPost(blog);
      } catch (err) {
        setError("Failed to load blog post");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleClap = async () => {
    if (!post) return;

    try {
      const updatedBlog = await blogService.updateClaps(post._id);
      setPost(updatedBlog);
    } catch {
      toast.error("Failed to update claps");
    }
  };

  const handleShare = (platform: string) => {
    const currentUrl = window.location.href;
    const title = post?.title || "Check out this blog post!";

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            currentUrl
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            currentUrl
          )}&quote=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            currentUrl
          )}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(currentUrl);
        // Optionally show a toast notification that the link was copied
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="blog-post__loading">
        <LoadingSpinner />
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post__error">
        <h2>Error</h2>
        <p>{error || "Blog post not found"}</p>
      </div>
    );
  }

  return (
    <>
      <motion.article
        className="blog-post"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="blog-post__cover"
        />

        <div className="blog-post__container">
          <div className="blog-post__meta">
            <div className="blog-post__author">
              <img
                src={post.author.imageUrl}
                alt={post.author.name}
                className="blog-post__author-avatar"
              />
              <div>
                <h4>{post.author.name}</h4>
                <p>{post.author.department}</p>
              </div>
            </div>
            <div className="blog-post__info">
              <time>{new Date(post.publishedDate).toLocaleDateString()}</time>
            </div>
          </div>

          <h1 className="blog-post__title">{post.title}</h1>
          <h2 className="blog-post__subtitle">{post.subtitle}</h2>

          <div
            className="blog-post__content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="blog-post__footer">
            <div className="blog-post__clap-container">
              <ClapButton initialCount={post.claps} onClap={handleClap} />
            </div>

            <div className="blog-post__author-details-and-share">
              <div className="blog-post__share">
                <button
                  onClick={() => handleShare("twitter")}
                  className="share-button twitter"
                  title="Share on Twitter"
                >
                  <Twitter size={20} />
                  <div className="share-button-text">Share on Twitter</div>
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="share-button linkedin"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={20} />
                  <div className="share-button-text">Share on LinkedIn</div>
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="share-button copy"
                  title="Copy Link"
                >
                  <Copy size={20} />
                  <div className="share-button-text">Copy Link</div>
                </button>
              </div>
              <div className="blog-post__author-bio">
                <img
                  src={post.author.imageUrl}
                  alt={post.author.name}
                  className="blog-post__author-avatar"
                />
                <div className="blog-post__author-info">
                  <h4>{post.author.name}</h4>
                  <p>{post.author.department}</p>
                  <a
                    href={post.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={16} /> Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
      <WriteDialog
        isOpen={isWriteDialogOpen}
        onClose={() => setIsWriteDialogOpen(false)}
      />

      <motion.button
        className="write-blog-button"
        onClick={() => setIsWriteDialogOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Edit3 size={24} />
        <span className="write-blog-button__text">Write Blog</span>
      </motion.button>
    </>
  );
}
