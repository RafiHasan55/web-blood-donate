import { useState } from "react";

import JoditEditor from "jodit-react";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

export default function AddBlogPage() {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axiosSecure.post(
      `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
      formData
    );
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !thumbnail || !content) return alert("All fields required");

    const imageURL = await handleImageUpload(thumbnail);

    await axiosSecure.post("/blogs", {
      title,
      thumbnail: imageURL,
      content,
    });

    navigate("/dashboard/content-management");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full"
        />
        <JoditEditor value={content} onChange={setContent} />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
