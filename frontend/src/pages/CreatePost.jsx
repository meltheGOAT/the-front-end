import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreatePost = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [premium, setPremium] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Route protection logic here
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("premium", premium);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: formData,
      });
      console.log(token);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || "An error occurred.");
      }

      // Redirect to home page on successful post creation
      navigate("/");
    } catch (error) {
      setError(error.message); // Set error message to be displayed to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error message */}
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter the title"
          title="Enter the title of the post"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        {/* Content Input */}
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          placeholder="Enter the content"
          title="Enter the content of the post"
          value={content}
          onChange={e => setContent(e.target.value)}
        ></textarea>

        {/* Premium Checkbox */}
        <label htmlFor="premium">
          <input
            type="checkbox"
            id="premium"
            checked={premium}
            onChange={e => setPremium(e.target.checked)}
          />
          Premium
        </label>

        {/* Image Upload */}
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          onChange={e => setImage(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating Post..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
