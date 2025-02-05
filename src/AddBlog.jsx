import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function AddBlog({ setBlogs }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const saveBlogsToLocalStorage = (blogs) => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please enter both title and content.");
      return;
    }

    const newBlog = {
      id: Date.now(),
      title,
      content,
      image,
    };

    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const updatedBlogs = [newBlog, ...storedBlogs];

    setBlogs(updatedBlogs);
    saveBlogsToLocalStorage(updatedBlogs);

    navigate("/"); // Redirect to home after adding
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Write Your Blog ✍️</h2>
      <form className="w-11/12 md:w-3/5 lg:w-2/5 bg-white shadow-md p-6 rounded-lg" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter blog title"
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Write your blog content..."
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 mb-4 border border-gray-300 rounded-lg" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Publish Blog
        </button>
      </form>
    </div>
  );
}

AddBlog.propTypes = {
  setBlogs: PropTypes.func.isRequired,
};

export default AddBlog;