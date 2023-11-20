import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiProfiles } from '../../api/user';
import { Profile as UserProfile } from '../../types/user';

export function Profile() {
  let { username } = useParams();
  username = username?.replace(/^@/, '') || '';

  const [profle, setProfile] = useState<UserProfile>();

  useEffect(() => {
    if (username) {
      apiProfiles(username).then(setProfile);
    }
  }, [username]);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img alt="" src={profle?.image} className="user-img" />
              <h4>{profle?.username}</h4>
              <p>{profle?.bio}</p>
              {username === profle?.username ? (
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a"></i>
                  Edit Profile Settings
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; {profle?.following ? 'Unfollow' : 'Follow'}&nbsp;
                  {profle?.username}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    to={`/profile/@${profle?.username}`}
                    className="nav-link"
                    end
                  >
                    My Articles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profile/@${profle?.username}/favorites`}
                    className="nav-link"
                  >
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
