import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navigation from "./components/Navigation";

function App() {

  return (
    <div className="app-container">
      <Header className="header" />
      <div className="content">
        <Navigation />
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default App;
