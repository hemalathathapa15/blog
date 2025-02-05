import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Home({ blogs, updateLikes, likes }) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <nav className="bg-black text-white w-full p-4 shadow-lg flex justify-between items-center">
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold">Welcome to the world of blogs!</h1>
        </div>
        {/* Add Blog button with "+" icon */}
        <Link to="/add-blog" className="text-white flex items-center px-4 py-2 rounded-lg hover:bg-gray-700">
          <span className="mr-2 text-lg font-bold">+</span> {/* "+" icon */}
          Add Blog
        </Link>
      </nav>

      <div className="w-11/12 md:w-3/5 lg:w-2/5 mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Recent Blogs</h2>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available. Start writing!</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow-md rounded-lg p-5 mb-6">
              <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.content.slice(0, 50)}...</p>
              {blog.image && (
                <img src={blog.image} alt="Blog" className="mt-4 w-full h-40 object-cover rounded-lg" />
              )}
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => updateLikes(blog.id)}
                  className="text-red-500 font-semibold"
                >
                  ❤️ {likes[blog.id] || 0}
                </button>
                <Link to={`/blog/${blog.id}`} className="text-blue-500 hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

Home.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateLikes: PropTypes.func.isRequired,
  likes: PropTypes.object.isRequired,
};

export default Home;
