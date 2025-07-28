import { useState } from "react";

import JoditEditor from "jodit-react";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import axios from "axios";

export default function AddBlogPage() {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=4a60f895140cf46487e8e313affd0ebb`,
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
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setThumbnail(file);
          }}
          className="w-full"
        />

        <JoditEditor value={content} onChange={setContent} />
        <button
          className="bg-red-600 text-white px-6 py-2 rounded"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
