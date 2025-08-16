import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";

export default function PublicBlogPage() {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    axiosSecure.get("/blogs?status=published").then(({ data }) => {
      setBlogs(data);
      setFilteredBlogs(data);
    });
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [search, blogs]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">📝 Our Blogs</h2>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by blog title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* Blog List */}
      {filteredBlogs.length === 0 ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-56 object-cover rounded-t-2xl"
              />
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{blog.title}</h3>
                  <p className="text-gray-600 mb-5 line-clamp-3">
                    {blog.content.replace(/<[^>]+>/g, "")}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition self-start"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal View */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full rounded-lg p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              &times;
            </button>
            <img
              src={selectedBlog.thumbnail}
              alt={selectedBlog.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-3">{selectedBlog.title}</h2>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
