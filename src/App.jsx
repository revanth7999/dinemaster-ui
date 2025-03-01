import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className='mainDiv'>
      <Header className='header'/>
      <Navigation/>
      <Footer className='footer'/>
    </div> 
  )
}

export default App;
