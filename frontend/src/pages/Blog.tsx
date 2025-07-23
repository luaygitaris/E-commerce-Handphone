import { blogPosts } from "../data/blogs";
import { Link } from "react-router-dom";

const BlogPage = () => {
  return (
    <div className="mt-20 px-24 py-10 flex gap-12">
      <div className="w-1/4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 mb-6 border border-gray-300 rounded"
        />
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Handphone</li>
            <li>Accessories</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 w-3/4">
        {blogPosts.map(post => (
          <div key={post.id} className="border p-4 rounded shadow-sm">
            <img src={post.thumbnail} className="mb-4 rounded" alt={post.title} />
            <p className="text-sm text-gray-400">
              {post.category} – {post.date}
            </p>
            <h2 className="text-lg font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="text-blue-600 font-medium">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
