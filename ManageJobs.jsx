import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getAllJobs,
    deleteJob
} from "../jobservice";

function ManageJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const recruiterId = Number(
        localStorage.getItem("jobsphere_recruiter_id")
    );

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            setLoading(true);

            const data = await getAllJobs();

            const myJobs = data.filter(
                (job) =>
                    job.recruiter?.id === recruiterId
            );

            setJobs(myJobs);

        } catch (error) {

            console.error(
                "Unable to load recruiter jobs:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteJob(id);

            setJobs((currentJobs) =>
                currentJobs.filter(
                    (job) => job.id !== id
                )
            );

            alert("Job deleted successfully.");

        } catch (error) {

            console.error(error);

            alert(
                "Unable to delete job. Please try again."
            );

        }
    };

    if (!recruiterId) {

        return (
            <main className="manage-page">

                <div className="page-message">

                    <h2>
                        Please login as a recruiter.
                    </h2>

                    <Link
                        to="/login"
                        className="primary-btn"
                    >
                        Login
                    </Link>

                </div>

            </main>
        );
    }

    return (
        <main className="manage-page">

            <div className="page-heading">

                <div>

                    <p className="hero-tag">
                        RECRUITER
                    </p>

                    <h1>
                        Manage Jobs
                    </h1>

                    <p>
                        Manage the jobs you have posted.
                    </p>

                </div>

                <Link
                    to="/recruiter/jobs/new"
                    className="primary-btn"
                >
                    + Post Job
                </Link>

            </div>


            {loading && (

                <div className="page-message">
                    Loading your jobs...
                </div>

            )}


            {!loading && jobs.length === 0 && (

                <div className="page-message">

                    <h2>
                        No Jobs Posted Yet
                    </h2>

                    <p>
                        Create your first job opportunity.
                    </p>

                    <br />

                    <Link
                        to="/recruiter/jobs/new"
                        className="primary-btn"
                    >
                        Post a Job
                    </Link>

                </div>

            )}


            {!loading && jobs.length > 0 && (

                <div className="jobs-grid">

                    {jobs.map((job) => (

                        <div
                            className="job-card"
                            key={job.id}
                        >

                            <h2>
                                {job.title}
                            </h2>

                            <h3>
                                {job.company}
                            </h3>

                            <p>
                                📍 {job.location}
                            </p>

                            <p>
                                💰 {job.salary}
                            </p>

                            <p>
                                {job.description}
                            </p>

                            <div className="card-actions">

                                <Link
                                    to={`/recruiter/jobs/${job.id}/applicants`}
                                    className="view-job-btn"
                                >
                                    View Applicants
                                </Link>

                                <button
                                    className="danger-btn"
                                    onClick={() =>
                                        handleDelete(job.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </main>
    );
}

export default ManageJobs;
