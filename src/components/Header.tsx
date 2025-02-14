import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const Header: React.FC = () => {
  // Track mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  // Track the current user (or null if logged out)
  const [user, setUser] = useState<FirebaseUser | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle user logout
  const handleLogout = async (): Promise<void> => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-500">Task Management</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contact
            </a>
          </div>

          {/* User Profile / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold uppercase">
                    {user.displayName ? user.displayName.charAt(0) : 'U'}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium transition-colors"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2">
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </a>
              <div className="border-t border-gray-200 pt-2 space-y-2">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="w-full text-left px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium transition-colors"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
