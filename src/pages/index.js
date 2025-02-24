import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMemes } from '../redux/memeSlice';
import { fetchMemes } from '../utils/api';
import MemeCard from '../components/MemeCard';
import DarkModeToggle from '../components/DarkModeToggle';

const Home = () => {
  const dispatch = useDispatch();
  const memes = useSelector((state) => state.meme.memes);

  useEffect(() => {
    const getMemes = async () => {
      const fetchedMemes = await fetchMemes();
      dispatch(setMemes(fetchedMemes));
    };
    getMemes();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="flex justify-between p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MemeVerse</h1>
        <DarkModeToggle />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
};

export default Home;
