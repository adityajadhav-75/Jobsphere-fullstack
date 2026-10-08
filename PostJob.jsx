import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../jobservice";

function PostJob() {

    const navigate = useNavigate();

    const recruiterId =
        localStorage.getItem("jobsphere_recruiter_id");

    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!recruiterId) {

            alert("Please login as a recruiter.");

            navigate("/login");

            return;
        }

        try {

            setLoading(true);

            await createJob({
                ...form,

                recruiter: {
                    id: Number(recruiterId)
                }
            });

            alert("Job posted successfully!");

            navigate("/recruiter/jobs");

        } catch (error) {

            console.error(error);

            alert("Unable to post job.");

        } finally {

            setLoading(false);

        }
    };

    return (
        <main className="form-page">

            <div className="form-card">

                <p className="hero-tag">
                    RECRUITER
                </p>

                <h1>Post a New Job</h1>

                <form onSubmit={handleSubmit}>

                    <label>Job Title</label>

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Java Developer"
                        required
                    />

                    <label>Company</label>

                    <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        required
                    />

                    <label>Location</label>

                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Pune"
                        required
                    />

                    <label>Salary</label>

                    <input
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        placeholder="6 LPA"
                    />

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the role..."
                        rows="7"
                        required
                    />

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Posting..."
                            : "Post Job"}
                    </button>

                </form>

            </div>

        </main>
    );
}

export default PostJob;