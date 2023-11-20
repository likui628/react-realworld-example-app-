import { Link } from 'react-router-dom';
import { useAppSelector } from '../state/storeHooks';
export function Header() {
  const user = useAppSelector(state => state.auth.user);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to={'/'} className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to={'/'} className="nav-link">
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to={'/editor'} className="nav-link">
                  <i className="ion-compose"></i>&nbsp;New Post
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/settings'} className="nav-link">
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </Link>
              </li>

              <li className="nav-item">
                <Link to={`/profile/@${user?.username}`} className="nav-link">
                  {user.image && <img src={user.image} className="user-pic" />}
                  {user.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to={'/login'} className="nav-link">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/register'} className="nav-link">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
