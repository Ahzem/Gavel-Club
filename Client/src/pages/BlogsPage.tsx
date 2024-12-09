import { motion } from "framer-motion";
import { BlogPost } from "../types/Blog";
import { Link } from "react-router-dom";

const MOCK_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 10,
  },
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking-2.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john-2.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 20,
  },
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 30,
  },
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 24,
  },
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 15,
  },
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 12,
  },
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 8,
  },
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 5,
  },
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 3,
  },
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 1,
  },
  {
    id: "1",
    title: "Getting Started with Public Speaking",
    slug: "getting-started-with-public-speaking",
    excerpt:
      "Learn the fundamentals of public speaking and how to overcome stage fright. This comprehensive guide will help you take your first steps...",
    content: "Full content here...",
    coverImage: "/blog/public-speaking.jpg",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-03-20",
    claps: 0,
  },
];

export function BlogsPage() {
  return (
    <motion.div
      className="blogs-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="blogs-hero">
        <div className="blogs-hero__container">
          <motion.h1
            className="blogs-hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Gavel Blog
          </motion.h1>
          <motion.p
            className="blogs-hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Explore our collection of articles about public speaking,
            leadership, and communication
          </motion.p>
        </div>
      </section>

      <div className="blogs-grid">
        {MOCK_BLOGS.map((blog) => (
          <motion.article
            key={blog.id}
            className="blog-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="blog-card__image"
            />
            <div className="blog-card__content">
              <h2 className="blog-card__title">{blog.title}</h2>
              <p className="blog-card__excerpt">{blog.excerpt}</p>
              <div className="blog-card__meta">
                <div className="blog-card__author">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="blog-card__author-avatar"
                  />
                  <span>{blog.author.name}</span>
                </div>
                <time className="blog-card__date">
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </time>
              </div>
              <div className="blog-card__footer">
                <div className="blog-card__claps">
                  <svg
                    className="blog-card__clap-icon"
                    viewBox="-549 338 100.1 125"
                  >
                    <path d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z" />
                    <path d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9" />
                  </svg>
                  {blog.claps}
                </div>
                <Link
                  to={`/blog/${blog.slug}`}
                  className="blog-card__read-more"
                >
                  Read More
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
