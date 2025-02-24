import { useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
  onClick={toggleDarkMode}
  className="bg-gray-200 text-black p-2 rounded-md"
>
  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
</button>

  );
};

export default DarkModeToggle;
