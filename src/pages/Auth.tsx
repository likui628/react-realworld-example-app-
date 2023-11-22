import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { apiLoginUser, apiRegisterUser } from '../api/user';
import { login } from '../state/authSlice';
import { useAppDispatch } from '../hooks/store';
import { useRequest } from '../hooks/query';

export default function Auth({ isRegister }: { isRegister?: boolean }) {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    email: '',
  });
  const { username, password, email } = account;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount(prev => ({ ...prev, [name]: value }));
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, errors, request } = useRequest();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await request(async () => {
      const user = isRegister
        ? await apiRegisterUser(account)
        : await apiLoginUser(account);
      dispatch(login(user));
      navigate('/');
    });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              {isRegister ? 'Sign up' : 'Sign in'}
            </h1>
            <p className="text-xs-center">
              {isRegister ? (
                <Link to={'/login'}>Have an account?</Link>
              ) : (
                <Link to={'/register'}>Need an account?</Link>
              )}
            </p>

            <ul className="error-messages">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>

            <form onSubmit={onSubmit}>
              {isRegister && (
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
              )}

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
                {isRegister ? 'Sign up' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
