
import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load dashboard");
        }

        setUser(data.user);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="dashboard-status">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="dashboard-status">
        <p>{error}</p>
        <button className="logout-button" onClick={onLogout}>
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-brand">
          <span>◆</span> MyApp
        </h2>

        <nav className="dashboard-nav">
          <a className="nav-item active" href="#overview">
            <span>▦</span> Dashboard
          </a>

          <a className="nav-item" href="#profile">
            <span>♙</span> Profile
          </a>

          <a className="nav-item" href="#settings">
            <span>⚙</span> Settings
          </a>
        </nav>

        <button className="sidebar-logout" onClick={onLogout}>
          ↪ Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Manage your account in one place.</p>
          </div>

          <div className="dashboard-user-badge">
            <span className="small-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </span>
            <span>{user.name}</span>
          </div>
        </header>

        <section className="welcome-card" id="overview">
          <div>
            <p className="welcome-label">YOUR WORKSPACE</p>
            <h2>Welcome back, {user.name}! 👋</h2>
            <p>You have successfully logged in to your account.</p>
          </div>
          <div className="welcome-emoji">🚀</div>
        </section>

        <section className="dashboard-stats">
          <article className="stat-card">
            <div className="stat-icon blue">♙</div>
            <p>Account Status</p>
            <h3>Active</h3>
          </article>

          <article className="stat-card">
            <div className="stat-icon purple">✉</div>
            <p>Email Address</p>
            <h3 className="email-value">{user.email}</h3>
          </article>

          <article className="stat-card">
            <div className="stat-icon green">✓</div>
            <p>Authentication</p>
            <h3>Verified</h3>
          </article>
        </section>

        <section className="profile-card" id="profile">
          <div className="profile-heading">
            <h2>Profile Information</h2>
            <span className="profile-status">Account</span>
          </div>

          <div className="profile-content">
            <div className="large-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-details">
              <div>
                <span>Full Name</span>
                <strong>{user.name}</strong>
              </div>

              <div>
                <span>Email Address</span>
                <strong>{user.email}</strong>
              </div>

              <div>
                <span>Account ID</span>
                <strong>{user.id}</strong>
              </div>
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          Built with React, Node.js and PostgreSQL
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;