import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          {/* Removed <a> tag around Link */}
          <span className="text-white text-xl font-bold">MemeVerse</span>
        </Link>
        <div className="space-x-4">
          <Link href="/upload">
            {/* Removed <a> tag around Link */}
            <span className="text-white">Upload</span>
          </Link>
          <Link href="/leaderboard">
            {/* Removed <a> tag around Link */}
            <span className="text-white">Leaderboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
