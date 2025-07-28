import { useEffect, useState } from "react";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";

export default function ContentManagementPage() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/blogs?status=${filter}`)
      .then(({ data }) => setBlogs(data));
  }, [filter]);

  const togglePublish = async (id, currentStatus) => {
    const newStatus = currentStatus === "draft" ? "published" : "draft";
    await axiosSecure.patch(`/blogs/${id}/status`, { status: newStatus });
    setBlogs((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
    );
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this blog?")) {
      await axiosSecure.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Link
          to="/dashboard/content-management/add-blog"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Add Blog
        </Link>
      </div>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded shadow">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
            <p className="text-sm text-gray-500 capitalize mt-1">
              Status: {blog.status}
            </p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => togglePublish(blog._id, blog.status)}
                className="px-4 py-1 bg-green-600 text-white rounded"
              >
                {blog.status === "draft" ? "Publish" : "Unpublish"}
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
