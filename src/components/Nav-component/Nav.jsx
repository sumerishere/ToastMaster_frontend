import "../Nav-component/Nav.css";
import {Link} from "react-router-dom";

const NavBar = () => {
  return (
    <nav id="nav-bar" className="nav-container">
      <div id="nav-logo-section" className="nav-logo-container">
        <img
          src="/images/images.png" 
          alt="Logo"
          id="nav-logo"
          className="nav-logo-img"
        />
      </div>
      <ul id="nav-menu" className="nav-menu-list">
        <li className="nav-menu-item"><Link to="/">Home</Link></li>
        <li className="nav-menu-item"><Link to="/MeetingForm" >Meeting</Link></li>
        <li className="nav-menu-item"><Link to = "/MemberComponent">Member</Link></li>
        <li className="nav-menu-item"><Link to = "/LoginForm">Log-out</Link></li>
        <li className="nav-menu-item"><Link to = "/AboutPage">About</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
