import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { BlogPost } from "../types/Blog";
import { ClapButton } from "../components/ClapButton";
import { MOCK_BLOGS } from "./BlogsPage"; // Import mock data

export function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find the blog post from mock data
  const post = MOCK_BLOGS.find((blog: BlogPost) => blog.slug === slug);

  const handleClap = (newCount: number) => {
    // Here you would update the backend
    console.log("Clapped:", newCount);
  };

  const handleShare = async (platform: "twitter" | "linkedin" | "copy") => {
    const url = window.location.href;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${post?.title}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        );
        break;
      case "copy":
        await navigator.clipboard.writeText(url);
        // You could show a toast notification here
        break;
    }
  };

  if (!post) {
    navigate("/blog");
    return null;
  }

  return (
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
              src={post.author.avatar}
              alt={post.author.name}
              className="blog-post__author-avatar"
            />
            <div>
              <h4>{post.author.name}</h4>
              <p>{post.author.title}</p>
            </div>
          </div>
          <div className="blog-post__info">
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
            <span>·</span>
            <span>{post.readTime} read</span>
          </div>
        </div>

        <h1 className="blog-post__title">{post.title}</h1>

        <div className="blog-post__tags">
          {post.tags?.map((tag: string) => (
            <span key={tag} className="blog-post__tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="blog-post__content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="blog-post__footer">
          <div className="blog-post__clap-container">
            <ClapButton initialCount={post.claps} onClap={handleClap} />
          </div>

          <div className="blog-post__share">
            <button
              onClick={() => handleShare("twitter")}
              className="share-button twitter"
            >
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="share-button linkedin"
            >
              Share on LinkedIn
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="share-button copy"
            >
              Copy Link
            </button>
          </div>

          <div className="blog-post__author">
            <img src={post.author.avatar} alt={post.author.name} />
            <div>
              <h4>{post.author.name}</h4>
              <p>{post.author.bio}</p>
              {post.author.social && (
                <div className="author-social">
                  {post.author.social.twitter && (
                    <a
                      href={post.author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  )}
                  {post.author.social.linkedin && (
                    <a
                      href={post.author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
