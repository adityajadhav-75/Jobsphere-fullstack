import { Link, useNavigate } from "react-router-dom";

function SeekerDashboard() {

    const navigate = useNavigate();

    const user =
        JSON.parse(
            localStorage.getItem("jobsphere_user")
        );

    const logout = () => {

        localStorage.removeItem("jobsphere_user");
        localStorage.removeItem("jobsphere_user_id");

        navigate("/login");
    };

    return (
        <main className="dashboard-page">

            <div className="dashboard-header">

                <div>
                    <p className="hero-tag">
                        JOB SEEKER
                    </p>

                    <h1>
                        Welcome, {user?.name || "Job Seeker"}!
                    </h1>

                    <p>
                        Find opportunities and manage
                        your applications.
                    </p>
                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

            <div className="dashboard-grid">

                <Link
                    to="/jobs"
                    className="dashboard-card"
                >
                    <h2>🔎 Find Jobs</h2>

                    <p>
                        Explore available job opportunities.
                    </p>
                </Link>

                <Link
                    to="/applications"
                    className="dashboard-card"
                >
                    <h2>📋 My Applications</h2>

                    <p>
                        Track jobs you have applied for.
                    </p>
                </Link>

            </div>

        </main>
    );
}

export default SeekerDashboard;