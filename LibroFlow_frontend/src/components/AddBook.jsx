import React, { useState } from "react";
import axios from "axios";
import SideBar from "./side-bar/SideBar";
import AdminHeader from "./header/AdminHeader";
import { BookOpen } from "lucide-react";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: "",
    description: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/book/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage({
        type: "success",
        text: response.data.message || "Book added successfully!",
      });

      setFormData({
        title: "",
        author: "",
        pages: "",
        description: "",
      });
    } catch (err) {
      const errorMsg =
        err.message === "Request failed with status code 403"
          ? "You do not have permission to add a book."
          : "An error occurred while adding the book.";

      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col w-full">
        <AdminHeader
          children="Add New Book"
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-10 flex justify-center">
          <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <BookOpen className="text-indigo-600" size={22} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600">
                  Add New Book
                </h2>
                <p className="text-gray-500 text-sm sm:text-base">
                  Enter the details to expand the library collection.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title + Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Book Title
                  </label>
                  <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="e.g. The Great Gatsby"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author Name
                  </label>
                  <input
                    required
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="e.g. F. Scott Fitzgerald"
                  />
                </div>
              </div>

              {/* Pages */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Page Count
                </label>
                <input
                  required
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="e.g. 180"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="Brief summary of the book..."
                />
              </div>

              {/* Message */}
              {message.text && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-indigo-200"
                }`}
              >
                {loading ? "Processing..." : "Register Book"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddBook;
