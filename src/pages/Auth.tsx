import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { apiLoginUser, apiRegisterUser } from '../api/user';
import { login } from '../state/authSlice';
import { useAppDispatch } from '../state/storeHooks';

export function Auth({ isRegister }: { isRegister?: boolean }) {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    email: '',
  });
  const { username, password, email } = account;

  const [error, setError] = useState<string[]>([]);

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
      const user = isRegister
        ? await apiRegisterUser({ user: account })
        : await apiLoginUser({ user: account });
      dispatch(login(user));
      navigate('/');
    } catch (e: any) {
      const errorMessage = e.response.data.errors;
      const errors = Object.entries(errorMessage).map(
        ([key, value]) => `${key} ${value}`
      );
      setError(errors);
    } finally {
      setLoading(false);
    }
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
              {error.map((err, index) => (
                <li key={index}>{error}</li>
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
