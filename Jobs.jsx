import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllJobs } from "../jobservice";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            setLoading(true);

            const data = await getAllJobs();

            setJobs(data);

            setError("");

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load jobs. Make sure Spring Boot is running."
            );

        } finally {

            setLoading(false);

        }
    };

    const filteredJobs = jobs.filter((job) => {

        const searchText =
            `${job.title} ${job.company} ${job.description}`
                .toLowerCase();

        const locationText =
            (job.location || "").toLowerCase();

        return (
            searchText.includes(search.toLowerCase()) &&
            locationText.includes(location.toLowerCase())
        );
    });

    return (
        <main className="jobs-page">

            <section className="jobs-header">

                <p className="hero-tag">
                    EXPLORE OPPORTUNITIES
                </p>

                <h1>Find Your Next Job</h1>

                <p>
                    Discover opportunities from companies
                    and take the next step in your career.
                </p>

            </section>

            <section className="job-search">

                <input
                    type="text"
                    placeholder="Job title, company or keyword"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                />

            </section>

            {loading && (
                <div className="jobs-message">
                    Loading jobs...
                </div>
            )}

            {error && (
                <div className="jobs-message error">
                    {error}

                    <button onClick={loadJobs}>
                        Try Again
                    </button>
                </div>
            )}

            {!loading &&
                !error &&
                filteredJobs.length === 0 && (

                    <div className="jobs-message">

                        <h2>No Jobs Found</h2>

                        <p>
                            Try changing your search or
                            check again later.
                        </p>

                    </div>
                )}

            {!loading &&
                !error &&
                filteredJobs.length > 0 && (

                    <div className="jobs-grid">

                        {filteredJobs.map((job) => (

                            <article
                                className="job-card"
                                key={job.id}
                            >

                                <h2>{job.title}</h2>

                                <h3>{job.company}</h3>

                                <p>
                                    📍 {job.location}
                                </p>

                                <p>
                                    💰 {job.salary}
                                </p>

                                <p>
                                    {job.description}
                                </p>

                                <Link
                                    to={`/jobs/${job.id}`}
                                    className="view-job-btn"
                                >
                                    View Job
                                </Link>

                            </article>

                        ))}

                    </div>
                )}

        </main>
    );
}

export default Jobs;