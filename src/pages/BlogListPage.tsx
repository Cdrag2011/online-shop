import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

const BlogListPage: React.FC = () => {
  useEffect(() => {
    document.title = "Blog Neo Tech Shop – Sfaturi și noutăți";
  }, []);

  return (
    <div className="pt-28 px-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog Neo Tech Shop</h1>
      <p className="text-gray-300 mb-8">
        Sfaturi practice, explicații și noutăți din lumea lubrifianților și
        filtrării.
      </p>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block bg-slate-800/70 hover:bg-slate-800 rounded-2xl p-5 transition"
          >
            <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
            <p className="text-xs text-gray-400 mb-2">
              Publicat la {post.createdAt}
            </p>
            <p className="text-gray-300 text-sm">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;
