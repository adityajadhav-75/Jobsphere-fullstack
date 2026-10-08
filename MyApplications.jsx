import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getUserApplications
} from "../applicationService";

function MyApplications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId =
        localStorage.getItem("jobsphere_user_id");

    useEffect(() => {

        if (userId) {
            loadApplications();
        } else {
            setLoading(false);
        }

    }, []);

    const loadApplications = async () => {

        try {

            const data =
                await getUserApplications(userId);

            setApplications(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (!userId) {

        return (
            <div className="page-message">

                <h2>Please login first.</h2>

                <Link to="/login">
                    Login
                </Link>

            </div>
        );
    }

    return (
        <main className="applications-page">

            <div className="jobs-header">

                <p className="hero-tag">
                    APPLICATIONS
                </p>

                <h1>My Applications</h1>

            </div>

            {loading && (
                <div className="page-message">
                    Loading applications...
                </div>
            )}

            {!loading &&
                applications.length === 0 && (

                    <div className="page-message">

                        <h2>No Applications Yet</h2>

                        <Link to="/jobs">
                            Find Jobs
                        </Link>

                    </div>
                )}

            <div className="applications-list">

                {applications.map((application) => (

                    <div
                        className="application-card"
                        key={application.id}
                    >

                        <h2>
                            {application.job?.title}
                        </h2>

                        <h3>
                            {application.job?.company}
                        </h3>

                        <p>
                            📍 {application.job?.location}
                        </p>

                        <span className="status-badge">
                            {application.status}
                        </span>

                    </div>

                ))}

            </div>

        </main>
    );
}

export default MyApplications;