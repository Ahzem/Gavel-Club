import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { BlogPost } from "../types/Blog";
import { ClapButton } from "../components/ClapButton";

export function BlogPostPage() {
  const { slug } = useParams();
  // In a real app, fetch the blog post data based on the slug
  const post: BlogPost | undefined = {}; // Replace with actual data fetching

  const handleClap = (newCount: number) => {
    // Here you would update the backend
    console.log("Clapped:", newCount);
  };

  if (!post) return <div>Blog post not found</div>;

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
        <h1 className="blog-post__title">{post.title}</h1>
        <div className="blog-post__meta">
          <div className="blog-post__author">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="blog-post__author-avatar"
            />
            <span>{post.author.name}</span>
          </div>
          <time className="blog-post__date">
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
        </div>
        <div className="blog-post__content">
          <div className="blog-post__clap-container">
            <ClapButton initialCount={post.claps} onClap={handleClap} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </motion.article>
  );
}
