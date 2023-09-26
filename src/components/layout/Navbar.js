import React, { useState } from "react";
// import { NavDropdown } from 'react-bootstrap'
import { Link, Navigate, NavLink } from "react-router-dom";
import logo from "../assets/lion.png"

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <section className="navbar-bg">
        <nav className="navbar navbar-expand-lg navbar-light  ">
          <div className="container">
            <Link className="logo " to="/">
              <img src={logo} alt="logo" className="logoImg" />
              <h2>
                <span>F</span>olk
                <span>R</span>as
              </h2>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShow(!show)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/scan">
                    ScanQR
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/add-user">
                    Add User
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" to="/get-user">
                    Users
                  </NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/todofb">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/todo">
                    Cards
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    User
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item">
                        Logout
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item">
                        Something else
                      </Link>
                    </li>
                  </ul>
                </li>


                <div className="social-links">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                    <i class='fab fa-facebook-f' />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                    <i class='fab fa-twitter' />
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                    <i class='fab fa-instagram' />
                  </a>
                  <a href="https://www.linkedin.com/in/lokinder007/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <i class='fab fa-linkedin-in' />
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
