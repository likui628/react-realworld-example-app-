import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { apiRegisterUser } from '../api/user';
import { login } from '../state/authSlice';
import { useAppDispatch } from '../state/storeHooks';

export function Register() {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    email: '',
  });
  const { username, password, email } = account;

  const [error, setError] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount(prev => ({ ...prev, [name]: value }));
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await apiRegisterUser({ user: account });
      dispatch(login(user));
      navigate('/');
    } catch (e: any) {
      const errorMessage = e.response.data.errors;
      setError({
        email: errorMessage.email,
        username: errorMessage.username,
        password: errorMessage.password,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to={'/login'}>Have an account?</Link>
            </p>

            <ul className="error-messages">
              {error.username && <li>{error.username}</li>}
              {error.password && <li>{error.password}</li>}
              {error.email && <li>{error.email}</li>}
            </ul>

            <form onSubmit={onSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  name="username"
                  value={username}
                  required={true}
                  onChange={onChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  required={true}
                  onChange={onChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  required={true}
                  onChange={onChange}
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
                disabled={loading}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
