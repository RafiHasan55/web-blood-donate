import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BlogStatusPieChart = ({ blogs = [] }) => {
  // count data safely
  const totalBlogs = blogs.length || 0;
  const publishedBlogs =
    blogs.filter((blog) => blog.status === "published").length || 0;
  const draftBlogs =
    blogs.filter((blog) => blog.status === "draft").length || 0;

  const blogStatusData = [
    { name: "Published Blogs", value: publishedBlogs, color: "#10B981" },
    { name: "Draft Blogs", value: draftBlogs, color: "#F59E0B" },
    { name: "Total Blogs", value: totalBlogs, color: "#3B82F6" },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-black">Blog Status Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={blogStatusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {blogStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BlogStatusPieChart;
