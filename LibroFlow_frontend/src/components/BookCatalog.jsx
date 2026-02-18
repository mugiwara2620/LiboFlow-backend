import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Book as BookIcon,
  User as UserIcon,
  Loader2,
  AlertCircle,
} from "lucide-react";

function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Initial Load: Fetch all books
  useEffect(() => {
    fetchAllBooks();
  }, []);
  const token = localStorage.getItem("token");
  const fetchAllBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8080/api/v1/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Accessing response.data.data because your backend wraps it in ApiResponse
      setBooks(response.data.data);
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "No books available in the library yet."
          : "Failed to load books.",
      );
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // 2. Search Logic: Fetch by Author
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchAllBooks();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/book/author/${searchTerm}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      setBooks(response.data.data);
    } catch (err) {
      console.log(err);
      setError(`No books found for author: "${searchTerm}"`);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header & Search Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Library Catalog
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Discover your next favorite read
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="relative w-full md:w-96 group"
          >
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by author..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-500 font-bold animate-pulse">
              Browsing the shelves...
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 text-red-500 rounded-full mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{error}</h3>
            <button
              onClick={fetchAllBooks}
              className="mt-4 text-indigo-600 font-bold hover:underline"
            >
              Show all books
            </button>
          </div>
        ) : (
          /* Book Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="group bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <BookIcon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <UserIcon size={14} />
                  <span className="text-sm font-semibold">{book.author}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                    {book.pages} Pages
                  </span>
                  <button className="text-indigo-600 font-bold text-sm hover:text-indigo-800">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCatalog;
