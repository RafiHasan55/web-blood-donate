import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";
import Loading from "./Loading";

export default function ContentManagementPage() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Loader state
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true); // Start loader
    axiosSecure
      .get(`/blogs?status=${filter}`)
      .then(({ data }) => {
        setBlogs(data);
        setLoading(false); // Stop loader
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false); // Stop loader even if error
      });
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
        <h2 className="text-2xl font-bold text-black">Blog Management</h2>
        <Link
          to="/dashboard/content-management/add-blog"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Add Blog
        </Link>
      </div>

      {/* Filter */}
      <div className="mb-4 text-black">
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

      {/* Loader */}
      {loading ? (
        <Loading></Loading>
      ) : (
        /* Blog Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-4 rounded shadow">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-lg text-black font-semibold mt-2">{blog.title}</h3>
              <p className="text-sm text-gray-500 capitalize mt-1">
                Status: {blog.status}
              </p>
              <div className="flex gap-3 mt-3 flex-wrap">
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600 cursor-pointer px-4 py-1 bg-blue-600 text-white rounded"
                >
                  View
                </button>
                <button
                  onClick={() => togglePublish(blog._id, blog.status)}
                  className="hover:border hover:bg-white hover:text-green-600 cursor-pointer px-4 py-1 bg-green-600 text-white rounded"
                >
                  {blog.status === "draft" ? "Publish" : "Unpublish"}
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="cursor-pointer hover:border hover:border-red-600 hover:bg-white hover:text-red-600  px-4 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setSelectedBlog(null)}
            >
              &times;
            </button>
            <img
              src={selectedBlog.thumbnail}
              alt={selectedBlog.title}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedBlog.title}</h2>
            <p className="text-sm text-gray-500 mb-4 capitalize">
              Status: {selectedBlog.status}
            </p>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
