import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash'; // If you're using lodash for debouncing
import Link from 'next/link';

const MemeExplorer = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('Trending');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('likes');

  // Function to fetch memes
  const fetchMemes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/memes?page=${page}&filter=${filter}&search=${search}&sortBy=${sortBy}`);
      const data = await response.json();
      setMemes((prev) => [...prev, ...data.memes]);
    } catch (error) {
      console.error('Error fetching memes:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filter, search, sortBy]);

  // Fetch memes when component mounts and when any dependencies change.
  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  // Handle search input with debounce.
  const handleSearchChange = debounce((e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when search changes.
    setMemes([]); // Clear memes list when search term changes.
  }, 500);

  // Handle infinite scroll loading
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1); // Load more memes.
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">MemeExplorer</h1>
      <div className="flex justify-between mb-4">
        {/* Filters */}
        <div>
          <select
            className="border p-2 rounded-md"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
              setMemes([]);
            }}
          >
            <option value="Trending">Trending</option>
            <option value="New">New</option>
            <option value="Classic">Classic</option>
            <option value="Random">Random</option>
          </select>
        </div>

        {/* Sorting */}
        <div>
          <select
            className="border p-2 rounded-md"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
              setMemes([]);
            }}
          >
            <option value="likes">Sort by Likes</option>
            <option value="date">Sort by Date</option>
            <option value="comments">Sort by Comments</option>
          </select>
        </div>

        {/* Search */}
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search memes..."
            className="border p-2 rounded-md w-full"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        onScroll={handleScroll}
      >
         {memes.length > 0 ? (
          memes.map((meme) => (
            <div key={meme.id} className="border p-4 rounded-md bg-white shadow-md">
       <Link href={`/meme/${meme.id}`} passHref>
  <div className="border p-4 rounded-md bg-white shadow-md cursor-pointer">
    <img src={meme.image} alt={meme.title} className="w-full h-48 object-cover rounded-md mb-2" />
    <div className="text-center">
      <h3 className="font-semibold text-lg">{meme.title}</h3>
      <p className="text-sm text-gray-500">{meme.description}</p>
      <div className="flex justify-between mt-2">
        <span>{meme.likes} Likes</span>
        <span>{meme.comments} Comments</span>
      </div>
    </div>
  </div>
</Link>
            </div>
          ))
        ) : (
          <div className="w-full text-center p-4">No memes found.</div>
        )}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center py-4">
          <span className="animate-spin">&#8635;</span> Loading...
        </div>
      )}

      {/* Link to Upload page */}
      <div className="mt-6 text-center">
        <Link href="/upload" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Upload Your Meme
        </Link>
      </div>
    </div>
  );
};

export default MemeExplorer;
