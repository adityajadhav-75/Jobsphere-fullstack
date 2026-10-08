import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
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

            const response =
                await api.post("/users/login", form);

            const user = response.data;

            localStorage.setItem(
                "jobsphere_user",
                JSON.stringify(user)
            );

            localStorage.setItem(
                "jobsphere_user_id",
                user.id
            );

            if (user.role === "RECRUITER") {

                localStorage.setItem(
                    "jobsphere_recruiter_id",
                    user.id
                );

                navigate("/recruiter");

            } else {

                navigate("/seeker");

            }

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Welcome Back</h1>

                <p>
                    Login to continue to JobPortal.
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;