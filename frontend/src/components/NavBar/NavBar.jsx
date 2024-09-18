import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    authService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      <Link to="/"><p>Home</p></Link>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <Link to="/like"><p>My Liked Games</p></Link>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>
            <p>Log Out</p>
          </Link>
          &nbsp;&nbsp;
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <Link to="/login"><p>Log In</p></Link>
          &nbsp; | &nbsp;
          <Link to="/signup"><p>Sign Up</p></Link>
        </>
      )}
    </nav>
  );
}