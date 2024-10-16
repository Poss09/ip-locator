import './Header.scss'; // Importing the stylesheet for styling the Header component
import Logo from "../../assets/global-network.png"; // Importing the logo image

// The Header component displays the title and logo of the application
const Header = () => {
  return (
    <div className="header"> {/* Main container for the header */}
      <div className="header__title"> {/* Container for the title and logo */}
        <img src={Logo} alt="" /> {/* Displaying the logo image */}
        <h1> {/* Main heading for the application */}
           <span className="hight-light">IP</span> Location {/* Highlighting the "IP" part of the title */}
        </h1>
      </div>
    </div>
  );
};

export default Header; // Exporting the Header component for use in other parts of the application
