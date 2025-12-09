import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} – Blog Neo Tech Shop`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="pt-32 text-center text-white">
        Articolul nu a fost găsit.{" "}
        <Link to="/blog" className="text-yellow-400 underline">
          Înapoi la blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 max-w-3xl mx-auto text-white">
      <Link to="/blog" className="text-sm text-yellow-400 underline">
        ← Înapoi la blog
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">
        {post.title}
      </h1>
      <p className="text-xs text-gray-400 mb-6">
        Publicat la {post.createdAt}
      </p>

      <div className="prose prose-invert max-w-none text-gray-100">
        {post.content}
      </div>
    </div>
  );
};

export default BlogPostPage;
