
import { useState } from "react";
import "./Register.css";

function Register({ onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(true);
      setMessage("Registration successful! You can now log in.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <div className="register-icon">✨</div>

        <h1>Create Account</h1>
        <p className="register-subtitle">
          Join us and get started today
        </p>

        <form onSubmit={handleRegister}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />

          <label htmlFor="register-email">Email Address</label>
          <input
            id="register-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="register-password">Password</label>
          <div className="register-password-wrapper">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
            />

            <button
              className="register-show-password"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <p className="register-hint">
            Use at least 6 characters.
          </p>

          {message && (
            <p
              className={`register-message ${success ? "success" : "error"}`}
              role="status"
            >
              {message}
            </p>
          )}

          <button
            className="register-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="register-footer">
          Your account, your workspace.
        </p>
<p className="register-footer">
  Already have an account?{" "}
  <button
    type="button"
    className="auth-link"
    onClick={onGoToLogin}
  >
    Login
  </button>
</p>

      </section>
    </main>
  );
}

export default Register;