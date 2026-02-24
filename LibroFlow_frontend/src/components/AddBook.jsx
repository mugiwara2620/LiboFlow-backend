import React, { useState } from "react";
import axios from "axios";
import SideBar from "./side-bar/SideBar";
import AdminHeader from "./header/AdminHeader";
import { BookOpen, UploadCloud, X } from "lucide-react";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handelVideImage = () => {
    setSelectedFile(null);
    setPreview(null);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");

      const multipartData = new FormData();

      multipartData.append("title", formData.title);
      multipartData.append("author", formData.author);
      multipartData.append("pages", formData.pages);
      multipartData.append("description", formData.description);

      if (selectedFile) {
        multipartData.append("file", selectedFile);
      }
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/book/add",
        multipartData,
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

      setSelectedFile(null);
      setPreview(null);
    } catch (err) {
      setMessage({
        type: "error",
        text: "An error occurred while adding the book.",
      });
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

        <main className="flex-1 p-6 flex justify-center items-start">
          <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-md p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <BookOpen className="text-indigo-600" size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-indigo-600">
                  Add New Book
                </h2>
                <p className="text-gray-500 text-sm">
                  Enter the book details and upload a cover image.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Book Cover
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-all">
                  {preview ? (
                    <div className="rounded-lg bg-black/20 relative">
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto h-40   rounded-lg"
                      />
                      <div
                        onClick={handelVideImage}
                        className="absolute right-0.5 top-0.5 bg-red-500 rounded-2xl"
                      >
                        <X size={28} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <UploadCloud size={32} />
                      <span>Click to upload or drag image</span>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileUpload"
                    required
                  />
                  {selectedFile === null && (
                    <label
                      htmlFor="fileUpload"
                      className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-all"
                    >
                      {" "}
                      Choose Image{" "}
                    </label>
                  )}
                </div>
              </div>

              {/* Title & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  name={"title"}
                  value={formData.title}
                  onChange={handleChange}
                  label="Book Title"
                />

                <FloatingInput
                  name={"author"}
                  value={formData.author}
                  onChange={handleChange}
                  label={"Author Name"}
                />
              </div>

              <FloatingInput
                type="number"
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                label="Page Count"
              />

              <FloatingTextarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                label="Book Description"
              />

              {message.text && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-white transition ${
                  loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
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
const FloatingInput = ({ name, value, onChange, label, type = "text" }) => {
  const [focused, setFocused] = React.useState(false);

  const hasValue = value !== null && value !== undefined && value !== "";

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        min={type === "number" ? "0" : undefined}
        className={`w-full px-4 pt-6 pb-2 border rounded-xl outline-none transition-all
          focus:ring-2 focus:ring-indigo-500
          ${type === "number" ? "appearance-none" : ""}
        `}
      />

      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none
          ${
            focused || hasValue
              ? "top-1 text-xs text-indigo-600"
              : "top-4 text-gray-500"
          }
        `}
      >
        {label}
      </label>

      {/* Hide number arrows (Chrome, Safari, Edge) */}
      {type === "number" && (
        <style>
          {`
            input[type=number]::-webkit-outer-spin-button,
            input[type=number]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            input[type=number] {
              -moz-appearance: textfield;
            }
          `}
        </style>
      )}
    </div>
  );
};
const FloatingTextarea = ({ name, value, onChange, label, rows = 4 }) => {
  const [focused, setFocused] = React.useState(false);

  const hasValue = value !== null && value !== undefined && value !== "";

  return (
    <div className="relative">
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        className="w-full px-4 pt-6 pb-2 border rounded-xl outline-none transition-all
                   focus:ring-2 focus:ring-indigo-500 resize-none"
      />

      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none
          ${
            focused || hasValue
              ? "top-1 text-xs text-indigo-600"
              : "top-4 text-gray-500"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
};
export default AddBook;
