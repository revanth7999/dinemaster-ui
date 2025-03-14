import { Component } from "react";
import "../footer/footer.css";
import { FaRegCopyright } from "react-icons/fa";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p style={{ fontFamily: "monospace" }}>
          <FaRegCopyright /> All Rights Reserved || {new Date().getFullYear()}
        </p>
      </div>
    );
  }
}

export default Footer;
