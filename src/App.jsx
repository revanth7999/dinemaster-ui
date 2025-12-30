import "./App.css";
import Footer from "./components/footer/Footer";
import Navigation from "./components/Navigation";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="content">
          <Navigation />
        </div>
        {/* <Footer className="footer" /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
