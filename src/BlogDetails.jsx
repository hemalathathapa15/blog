import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

function BlogDetails({ blogs, updateLikes, likes, comments, addComment }) {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id.toString() === id);
  const [newComment, setNewComment] = useState("");

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl text-red-500">Blog not found 😢</h1>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-11/12 md:w-3/5 lg:w-2/5 bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-2xl font-bold">{blog.title}</h1>
        <p className="mt-4 text-gray-700">{blog.content}</p>
        {blog.image && <img src={blog.image} alt="Blog" className="mt-4 w-full h-auto rounded-lg" />}

        <div className="mt-6 flex items-center space-x-4">
          <button onClick={() => updateLikes(blog.id)} className="text-red-500 font-semibold">
            ❤️ {likes[blog.id] || 0}
          </button>
        </div>

        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold">Comments</h3>
          {comments[id] && comments[id].length > 0 ? (
            <ul className="mt-2 space-y-2">
              {comments[id].map((comment, index) => (
                <li key={index} className="bg-gray-200 p-2 rounded-lg">{comment}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No comments yet. Be the first!</p>
          )}

          <div className="mt-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={() => {
                if (newComment.trim()) {
                  addComment(id, newComment);
                  setNewComment("");
                }
              }}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Post Comment
            </button>
          </div>
        </div>

        <Link to="/" className="mt-6 block text-blue-500 hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}

BlogDetails.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateLikes: PropTypes.func.isRequired,
  likes: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default BlogDetails;