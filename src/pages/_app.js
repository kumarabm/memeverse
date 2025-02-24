import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Import your Redux store
import '../../src/app/globals.css';

// Import custom components for layout
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        {/* Navbar Component */}
        <Navbar />

        {/* Main content of each page */}
        <main className="container mx-auto p-4">
          <Component {...pageProps} />
        </main>

        {/* Footer Component */}
        <Footer />
      </div>
    </Provider>
  );
}

export default MyApp;
