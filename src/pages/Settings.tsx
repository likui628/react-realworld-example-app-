import { useAppDispatch, useAppSelector } from '../hooks/store';
import { useState } from 'react';
import { apiUpdateUser, UpdateUser } from '../api/user';
import { login, logout } from '../state/authSlice';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../hooks/query';

export function Settings() {
  const user = useAppSelector(state => state.auth.user!);
  const dispatch = useAppDispatch();

  const [userInfo, setUserInfo] = useState<UpdateUser>({ ...user });
  const onChange = (name: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();
  const { loading, errors, request } = useRequest();

  const onSubmit = async () => {
    await request(async () => {
      const user = await apiUpdateUser(userInfo);
      dispatch(login(user));
      navigate(`/profile/${user.username}`);
    });
  };
  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    value={userInfo.image}
                    onChange={e => onChange('image', e.target.value)}
                    disabled={loading}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={userInfo.username}
                    onChange={e => onChange('username', e.target.value)}
                    disabled={loading}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    value={userInfo.bio}
                    onChange={e => onChange('bio', e.target.value)}
                    disabled={loading}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={e => onChange('email', e.target.value)}
                    disabled={loading}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={userInfo.password}
                    onChange={e => onChange('password', e.target.value)}
                    disabled={loading}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <br />
            <button className="btn btn-outline-danger" onClick={onLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
