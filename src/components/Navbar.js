import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, UploadIcon, UsersIcon, CollectionIcon, UserIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Home Link */}
        <Link href="/">
          <span className="text-white text-3xl font-bold cursor-pointer hover:text-indigo-300">
            MemeHub
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link href="/">
            <span className="text-white flex items-center hover:text-indigo-300 cursor-pointer transition-all duration-300">
              <HomeIcon className="w-6 h-6 mr-2" />
              Home
            </span>
          </Link>
          <Link href="/upload">
            <span className="text-white flex items-center hover:text-indigo-300 cursor-pointer transition-all duration-300">
              <UploadIcon className="w-6 h-6 mr-2" />
              Upload
            </span>
          </Link>
          <Link href="/leaderboard">
            <span className="text-white flex items-center hover:text-indigo-300 cursor-pointer transition-all duration-300">
              <CollectionIcon className="w-6 h-6 mr-2" />
              Leaderboard
            </span>
          </Link>
          <Link href="/memeExplorer">
            <span className="text-white flex items-center hover:text-indigo-300 cursor-pointer transition-all duration-300">
              <CollectionIcon className="w-6 h-6 mr-2" />
              MemeExplorer
            </span>
          </Link>
          <Link href="/profile">
            <span className="text-white flex items-center hover:text-indigo-300 cursor-pointer transition-all duration-300">
              <UserIcon className="w-6 h-6 mr-2" />
              Profile
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-500 to-indigo-500 py-4 text-center">
          <Link href="/">
            <span className="block text-white py-2 flex items-center hover:text-indigo-300 cursor-pointer transition-all duration-300">
              <HomeIcon className="w-6 h-6 mr-2" />
              Home
            </span>
          </Link>
          <Link href="/upload">
            <span className="block text-white py-2 flex items-center hover:text-indigo-300 cursor-pointer transition-all duration-300">
              <UploadIcon className="w-6 h-6 mr-2" />
              Upload
            </span>
          </Link>
          <Link href="/leaderboard">
            <span className="block text-white py-2 flex items-center hover:text-indigo-300 cursor-pointer transition-all duration-300">
              <CollectionIcon className="w-6 h-6 mr-2" />
              Leaderboard
            </span>
          </Link>
          <Link href="/memeExplorer">
            <span className="block text-white py-2 flex items-center hover:text-indigo-300 cursor-pointer transition-all duration-300">
              <CollectionIcon className="w-6 h-6 mr-2" />
              MemeExplorer
            </span>
          </Link>
          <Link href="/profile">
            <span className="block text-white py-2 flex items-center hover:text-indigo-300 cursor-pointer transition-all duration-300">
              <UserIcon className="w-6 h-6 mr-2" />
              Profile
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
