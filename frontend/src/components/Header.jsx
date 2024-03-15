import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid ps-3 pe-5">
          <Link className="navbar-brand nav-link d-flex align-items-center justify-content-center" to="/">
            <img src="./assets/logo.png" alt="Logo" width="80" height="70" className="d-inline-block align-text-top" />
            <h3>My App</h3>
          </Link>
          <Link to="/profile" className="text-light fs-4 nav-link">
            <img src="./assets/profile.png" alt="profile" width={44} height={44} />
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header