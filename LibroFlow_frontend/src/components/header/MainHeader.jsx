import React from "react";
import { useAuth } from "../../contex/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const MainHeader = ({
  isAuth,
  handleSearch,
  handleSideBar,
  setAuthor,
  author,
}) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky  top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            {isAuth && (
              <button
                onClick={handleSideBar}
                className="p-2 rounded-xl -ml-4 text-gray-600 hover:bg-gray-100 transition xl:hidden"
              >
                <Menu size={22} />
              </button>
            )}

            <h1 className="text-3xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LibroFlow
            </h1>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <form onSubmit={handleSearch} className="relative w-full max-w-lg">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                type="text"
                placeholder="Search by author..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition"
              />
              {/* <button type="submit">s</button> */}
            </form>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {isAuth ? (
              <NavLink
                to={"/profile"}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-sm font-semibold shadow">
                  {isAdmin ? "A" : "U"}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  Profile
                </span>
              </NavLink>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:inline-flex px-4 py-2 text-lg font-semibold text-gray-600 hover:text-indigo-600 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by author..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition"
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
