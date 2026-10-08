import { Link, useNavigate } from "react-router-dom";

function RecruiterDashboard() {

    const navigate = useNavigate();

    const user =
        JSON.parse(
            localStorage.getItem("jobsphere_user")
        );

    const logout = () => {

        localStorage.removeItem("jobsphere_user");
        localStorage.removeItem("jobsphere_user_id");
        localStorage.removeItem("jobsphere_recruiter_id");

        navigate("/login");
    };

    return (
        <main className="dashboard-page">

            <div className="dashboard-header">

                <div>

                    <p className="hero-tag">
                        RECRUITER
                    </p>

                    <h1>
                        Welcome, {user?.name || "Recruiter"}!
                    </h1>

                    <p>
                        Manage your jobs and candidates.
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
                    to="/recruiter/jobs/new"
                    className="dashboard-card"
                >
                    <h2>➕ Post a Job</h2>

                    <p>
                        Create a new job opportunity.
                    </p>
                </Link>

                <Link
                    to="/recruiter/jobs"
                    className="dashboard-card"
                >
                    <h2>💼 Manage Jobs</h2>

                    <p>
                        View and manage your posted jobs.
                    </p>
                </Link>

            </div>

        </main>
    );
}

export default RecruiterDashboard;