import { Component } from "react";
import "../header/header.css";
import im from "../utils/food-logo.png";
import { LOGIN } from "../Constants";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginPage: false,
    };
  }

  componentDidMount() {
    // Set state based on the document title after the component is mounted
    if (document.title === LOGIN) {
      this.setState({ isLoginPage: true });
    } else {
      this.setState({ isLoginPage: false });
    }
  }

  handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.replace("/dinemaster-ui/");
  };

  render() {
    return (
      <div className="header-container">
        <div className="header">
          <img src={im} alt="Header Image" className="header-image" />
          {!this.state.isLoginPage && (
            <button
              onClick={this.handleLogout}
              type="button"
              className="btn btn-success logout-button"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
