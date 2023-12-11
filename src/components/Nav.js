import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import { useCookies } from 'react-cookie';
import { FaBars } from 'react-icons/fa';

function Nav({ isLoggedIn, setIsLoggedIn }) { 
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    setIsLoggedIn(false); 
    navigate("/userRoute/login");
  };

  return (
    <nav className="navbar navbar-expand-md pb-4 pt-3 header">
      <div className="container">
        <Link to="/" className="navbar-brand">Recipe Finder</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <FaBars style={{ color: '#fff' }}/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/submit-recipes" className="nav-link fw-bold">Share Recipes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/search" className='nav-link fw-bold mx-3'>Search</Link>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className='btn btn-primary fw-bold'> Logout </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/userRoute/login">
                  <button className='btn btn-primary fw-bold'>Login/Register</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
