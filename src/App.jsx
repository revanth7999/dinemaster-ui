import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className='mainDiv'>
      <Header />
      <Navigation />
      <Footer />
    </div>
  );
}

export default App;
