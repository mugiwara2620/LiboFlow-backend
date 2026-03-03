import React from "react";
import { useAuth } from "../../contex/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const BookCover = ({ book, fetchAllBooks, idx }) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const deleteBook = async (author, title) => {
    await axiosInstance.delete(
      `http://localhost:8080/api/v1/admin/book/delete/${author}/${title}`,
    );
    await fetchAllBooks();
  };

  return (
    <div
      key={idx}
      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Cover */}
      <div className="aspect-[3/4] group w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
        {!book.image ? (
          <BookOpen
            size={36}
            className="text-indigo-200 group-hover:opacity-20 transition-opacity"
          />
        ) : (
          <img
            src={`data:image/png;base64,${book.image}`}
            className="object-cover w-full h-full"
          />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-indigo-600/90 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300 p-4">
          <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold uppercase hover:bg-indigo-50 transition">
            Borrow
          </button>

          {isAdmin && (
            <button
              onClick={() => deleteBook(book.author, book.title)}
              className="w-full py-2 bg-red-500 text-white rounded-lg text-xs font-bold uppercase hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
        </div>

        {/* Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-md text-xs font-bold text-indigo-600 border border-indigo-100 shadow-sm group-hover:hidden">
          {book.pages} Pages
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-15">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-md line-clamp-1 group-hover:text-indigo-600 transition">
            {book.title}
          </h3>
          <p className="text-xs text-gray-500 truncate uppercase tracking-wide">
            {book.author}
          </p>
        </div>

        <button
          onClick={() => navigate(`/book/${book.id}`)}
          className="text-sm font-semibold text-indigo-600 hover:underline ml-3 whitespace-nowrap"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default BookCover;
