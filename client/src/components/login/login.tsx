import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../shared";
import jwt_decode from "jwt-decode";

import "./login.styles.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState("");
  const [rank, setRank] = useState("");
  const [jwtToken, setJwtToken] = useState("");

  const token = jwtToken;

  const param = useLocation();
  const path = param.pathname;
  let navigate = useNavigate();

  useEffect(() => {
    if (token) {
      let decoded = jwt_decode(token);
      console.log(decoded);
    } else return;
  }, [token]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post(`${url}/register`, {
        email: email,
        password: password,
        rank: rank,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          localStorage.setItem("rank", res.data.user.rank);
          localStorage.setItem("email", res.data.user.email);
          navigate("/catalog");
        }
      })

      .catch((err) => console.error(err));
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    axios
      .post(`${url}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          // setJwtToken(res.data.user);
          localStorage.setItem("rank", res.data.user.rank);
          localStorage.setItem("email", res.data.user.email);
          navigate("/catalog");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div
        className="login"
        style={
          path.includes("register") ? { height: "auto" } : { height: "25rem" }
        }
      >
        <h1>Welcome to Catalog</h1>
        {path.includes("register") ? <h2>Register</h2> : <h2>Login</h2>}

        <form
          className="login-form"
          onSubmit={path.includes("register") ? handleSubmit : handleLogin}
        >
          <label>
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
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
            <>
              <h3>Register as ?</h3>
              <select onChange={(e) => setRank(e.target.value)}>
                <option value="student">--Select status--</option>
                <option value="profesor">Profesor</option>
                <option value="student">Student</option>
              </select>
            </>
          ) : (
            ""
          )}
          {rank === "profesor" ? (
            <label>
              <input
                type="password"
                placeholder="Admin password"
                onChange={(e) => setAdmin(e.target.value)}
                value={admin || ""}
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
        <div className="register-now">
          <h3>Already have an account?</h3>
          <Link to="/">
            <button>Login now</button>
          </Link>
        </div>
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
