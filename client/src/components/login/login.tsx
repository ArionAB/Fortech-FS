import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./login.styles.scss";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const url = useLocation();
  const path = url.pathname;

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className="login"
        style={
          path.includes("register") ? { height: "30rem" } : { height: "25rem" }
        }
      >
        <h1>Welcome to Catalog</h1>
        {path.includes("register") ? <h2>Register</h2> : <h2>Login</h2>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
            />
          </label>
          {path.includes("register") ? (
            <label>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword || ""}
              />
            </label>
          ) : (
            ""
          )}

          {path.includes("register") ? (
            <button type="submit">Register</button>
          ) : (
            <button type="submit">Sign In</button>
          )}
        </form>
      </div>
      {path.includes("register") ? (
        ""
      ) : (
        <div className="register-now">
          <h3>Don't have an account yet?</h3>
          <Link to="/register">
            <button>Register now</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Login;
