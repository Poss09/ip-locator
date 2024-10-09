
import './Header.scss';
import Logo from "../../assets/global-network.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header__title">
        <img src={Logo} alt="" />
        <h1>
           <span className="hight-light">IP</span> Location
        </h1>
      </div>
    </div>
  );
};

export default Header;
