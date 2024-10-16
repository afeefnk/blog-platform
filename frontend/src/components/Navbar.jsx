import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AutthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl">
          Blogging Platform
        </Link>
        <div>
          <Link to="/" className="mr-10">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/create" className="mr-10">
                Create Post
              </Link>
              <Link to="/myblogs" className="mr-10">
                My Blogs
              </Link>
              <button onClick={logout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-10">
                Login
              </Link>
              <Link to="/register" className="mr-10">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
