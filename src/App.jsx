import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddBlog from "./AddBlog";
import BlogDetails from "./BlogDetails";
import { useState, useEffect } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};

    setBlogs(storedBlogs);
    setLikes(storedLikes);
    setComments(storedComments);
  }, []);

  const updateLikes = (id) => {
    const updatedLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
    setLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
  };

  const addComment = (id, comment) => {
    const updatedComments = { ...comments, [id]: [...(comments[id] || []), comment] };
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home blogs={blogs} updateLikes={updateLikes} likes={likes} />} />
        <Route path="/add-blog" element={<AddBlog setBlogs={setBlogs} />} />
        <Route path="/blog/:id" element={<BlogDetails blogs={blogs} likes={likes} updateLikes={updateLikes} comments={comments} addComment={addComment} />} />
      </Routes>
    </Router>
  );
}

export default App;