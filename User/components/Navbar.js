import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <div className="Apps">
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="">
          Stories
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link active text-white" to="/Home">
                Home
              </Link>
            </li>
            <li className="nav-item">
            <Link
                className="nav-link active text-white"
                aria-current="page"
                to="/LeaderBoard"
              >
                LeaderBoard
              </Link>
            </li>
            <li className="nav-item">
            <Link
                className="nav-link active text-white"
                aria-current="page"
                to="/Stories"
              >
                Stories
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
    </div>
  )
}
