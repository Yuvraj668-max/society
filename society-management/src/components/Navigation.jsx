import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook

function Navigation() {
  const { currentUser } = useAuth(); // Get the current authenticated user

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">Society Management</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/chat" className="nav-link">Chat</Link>
          <Link to="/calendar" className="nav-link">Calendar</Link>
          <Link to="/members" className="nav-link">Members</Link>
          {!currentUser ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          ) : (
            <Link to="/logout" className="nav-link">Logout</Link> // Logout link when logged in
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
