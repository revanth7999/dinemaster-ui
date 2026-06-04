import "./App.css";
import Footer from "./components/footer/Footer";
import Navigation from "./components/Navigation";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <div className="content">
          <Navigation />
        </div>
        {/* <Footer className="footer" /> */}
      </div>
    </HashRouter>
  );
}

export default App;
