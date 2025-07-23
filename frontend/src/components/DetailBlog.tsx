import { useParams } from "react-router-dom";
import { blogPosts } from "../data/blogs";

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Post Not Found</h2>
        <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 mt-10 sm:mt-20">
      <article className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-6">
            by {post.author} – {post.date}
          </p>
          
          {post.images[0] && (
            <img 
              src={post.images[0]} 
              alt={post.title} 
              className="w-full h-auto rounded-lg mb-6 object-cover"
              loading="lazy"
            />
          )}
          
          <div className="prose max-w-none text-gray-700 mb-6 whitespace-pre-line">
            {post.content}
          </div>
          
          {post.images[1] && (
            <img 
              src={post.images[1]} 
              alt="" 
              className="w-full h-auto rounded-lg object-cover"
              loading="lazy"
            />
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;