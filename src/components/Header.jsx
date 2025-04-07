import { Link } from "react-router-dom";

// navigation bar
const Header = () => {
  return (
    <header className="bg-primary">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <h1 className="text-white m-0 fs-4">
          <Link to="/" className="text-white text-decoration-none">
            MTM6404 Contact Book
          </Link>
        </h1>
        <nav>
          <Link to="/" className="btn btn-outline-light me-2">
            Home
          </Link>
          <Link to="/add" className="btn btn-outline-light me-0">
            Add Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
