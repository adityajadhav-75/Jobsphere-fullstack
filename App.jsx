import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">Job<span>Portal</span></div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="register-btn">
            Register
          </Link>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <p className="hero-tag">FIND YOUR FUTURE</p>

          <h1>
            Find a job that
            <br />
            <span>fits your future.</span>
          </h1>

          <p className="hero-description">
            Discover exciting opportunities, connect with great companies,
            and take the next step in your career.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Job title, skills or keywords"
            />

            <input
              type="text"
              placeholder="Location"
            />

            <Link to="/jobs" className="search-btn">
              Search Jobs
            </Link>
          </div>
        </div>
      </main>

      <section className="features">
        <div className="feature">
          <h3>Find Jobs</h3>
          <p>Explore opportunities from different companies.</p>
        </div>

        <div className="feature">
          <h3>Apply Easily</h3>
          <p>Apply to jobs and track your applications.</p>
        </div>

        <div className="feature">
          <h3>Hire Talent</h3>
          <p>Recruiters can post jobs and find candidates.</p>
        </div>
      </section>
    </div>
  );
}

export default App;