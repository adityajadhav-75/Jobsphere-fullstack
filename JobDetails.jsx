import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import { getJobById } from "../jobservice";
import { applyForJob } from "../applicationService";

function JobDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadJob();
    }, [id]);

    const loadJob = async () => {

        try {

            const data = await getJobById(id);

            setJob(data);

        } catch (error) {

            console.error(error);

            setError("Unable to load job.");

        } finally {

            setLoading(false);

        }
    };

    const handleApply = async () => {

        const userId =
            localStorage.getItem("jobsphere_user_id");

        if (!userId) {

            alert(
                "Please login before applying for a job."
            );

            navigate("/login");

            return;
        }

        try {

            await applyForJob({
                job: {
                    id: Number(id)
                },

                jobSeeker: {
                    id: Number(userId)
                }
            });

            alert("Application submitted successfully!");

        } catch (error) {

            console.error(error);

            alert(
                "Unable to apply. Please try again."
            );
        }
    };

    if (loading) {
        return (
            <div className="page-message">
                Loading job...
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="page-message">
                {error || "Job not found."}
            </div>
        );
    }

    return (
        <main className="job-details-page">

            <div className="job-details-card">

                <Link to="/jobs">
                    ← Back to Jobs
                </Link>

                <p className="hero-tag">
                    JOB OPPORTUNITY
                </p>

                <h1>{job.title}</h1>

                <h2>{job.company}</h2>

                <div className="job-meta">

                    <span>
                        📍 {job.location}
                    </span>

                    <span>
                        💰 {job.salary}
                    </span>

                </div>

                <hr />

                <h3>Job Description</h3>

                <p className="details-description">
                    {job.description}
                </p>

                <button
                    className="primary-btn"
                    onClick={handleApply}
                >
                    Apply for this Job
                </button>

            </div>

        </main>
    );
}

export default JobDetails;