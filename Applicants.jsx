import { useEffect, useState } from "react";
import {
    Link,
    useParams
} from "react-router-dom";

import {
    getJobApplications,
    updateApplicationStatus
} from "../applicationService";

function Applicants() {

    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, [jobId]);

    const loadApplications = async () => {

        try {

            const data =
                await getJobApplications(jobId);

            setApplications(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const changeStatus = async (
        applicationId,
        status
    ) => {

        try {

            await updateApplicationStatus(
                applicationId,
                status
            );

            loadApplications();

        } catch (error) {

            console.error(error);

            alert("Unable to update status.");

        }
    };

    return (
        <main className="applications-page">

            <Link to="/recruiter/jobs">
                ← Back to Jobs
            </Link>

            <div className="jobs-header">

                <p className="hero-tag">
                    RECRUITER
                </p>

                <h1>Job Applicants</h1>

            </div>

            {loading && (
                <div className="page-message">
                    Loading applicants...
                </div>
            )}

            {!loading &&
                applications.length === 0 && (

                    <div className="page-message">
                        No applicants yet.
                    </div>
                )}

            <div className="applications-list">

                {applications.map(application => (

                    <div
                        className="application-card"
                        key={application.id}
                    >

                        <h2>
                            {application.jobSeeker?.name}
                        </h2>

                        <p>
                            {application.jobSeeker?.email}
                        </p>

                        <span className="status-badge">
                            {application.status}
                        </span>

                        <div className="status-actions">

                            <button
                                onClick={() =>
                                    changeStatus(
                                        application.id,
                                        "SHORTLISTED"
                                    )
                                }
                            >
                                Shortlist
                            </button>

                            <button
                                onClick={() =>
                                    changeStatus(
                                        application.id,
                                        "REJECTED"
                                    )
                                }
                            >
                                Reject
                            </button>

                            <button
                                onClick={() =>
                                    changeStatus(
                                        application.id,
                                        "SELECTED"
                                    )
                                }
                            >
                                Select
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </main>
    );
}

export default Applicants;