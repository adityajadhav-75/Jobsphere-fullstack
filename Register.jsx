import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "JOB_SEEKER"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await api.post("/users/register", form);

            alert("Registration successful!");

            navigate("/login");

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Create Account</h1>

                <p>
                    Join JobPortal and start your career journey.
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Name</label>

                    <input
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>

                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>

                    <input
                        name="password"
                        type="password"
                        placeholder="Create password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <label>Account Type</label>

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="JOB_SEEKER">
                            Job Seeker
                        </option>

                        <option value="RECRUITER">
                            Recruiter
                        </option>
                    </select>

                    <button type="submit" disabled={loading}>
                        {loading
                            ? "Creating..."
                            : "Register"}
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;