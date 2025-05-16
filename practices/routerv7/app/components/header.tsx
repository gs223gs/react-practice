import { Link } from "react-router";

const Header = () => {
  console.log("Header");
  return (
    <header>
      <h1>Header</h1>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/content">Content</Link>
      <Link to="/contact">Contact</Link>
    </header>
  );
};

export default Header;