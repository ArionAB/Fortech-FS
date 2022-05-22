import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { url } from "../shared";

import "./login.styles.scss";
import { off } from "process";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    admin: "",
    rank: "",
  });

  const [jwtToken, setJwtToken] = useState("");
  const [serverError, setServerError] = useState("");

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    admin: "",
  });

  const param = useLocation();
  const path = param.pathname;
  let navigate = useNavigate();
  const token = jwtToken;

  const { email, password, confirmPassword, admin, rank } = login;

  useEffect(() => {
    if (token) {
      let decoded = jwt_decode(token);
      console.log(decoded);
    } else return;
  }, [token]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let hasErrors = false;
    let newErrors = { ...error };

    if (typeof email !== "undefined") {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        hasErrors = true;
        newErrors.email = "Please enter a valid email address";
      }

      if (!password) {
        hasErrors = true;
        newErrors.password = "Password required";
      }

      if (!confirmPassword) {
        hasErrors = true;
        newErrors.confirmPassword = "Please confirm password";
      }

      if (password !== confirmPassword) {
        hasErrors = true;
        newErrors.password = "Password don't match";
        newErrors.confirmPassword = "Please don't match";
      }

      if (rank === "profesor" && admin !== "admin") {
        hasErrors = true;
        newErrors.admin = "You don't have access";
      }
    }
    if (hasErrors) {
      setError(newErrors);
      return;
    } else
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
          if (res.data.status === 400) {
            setServerError(res.data.error);
          }
        })

        .catch((err) => console.error(err));
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    let hasErrors = false;
    let newErrors = { ...error };

    if (typeof email !== "undefined") {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        hasErrors = true;
        newErrors.email = "Please enter a valid email address";
      }

      if (!password) {
        hasErrors = true;
        newErrors.password = "Password required";
      }

      if (hasErrors) {
        setError(newErrors);
        return;
      } else
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
            if (res.data.status === 400) {
              setServerError(res.data.err);
            }
          })
          .catch((err) => console.error(err));
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    setError({ ...error, [name]: "" });
    setServerError("");
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
          noValidate
        >
          <label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={(e) => handleChange(e)}
              value={email || ""}
            />
            {error.email && <p>{error.email}</p>}
          </label>
          <label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
              value={password || ""}
            />
            {error.password && <p>{error.password}</p>}
          </label>
          {path.includes("register") ? (
            <label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => handleChange(e)}
                value={confirmPassword || ""}
              />
              {error.confirmPassword && <p>{error.confirmPassword}</p>}
            </label>
          ) : (
            ""
          )}
          {path.includes("register") ? (
            <>
              <h3>Register as ?</h3>
              <select onChange={(e) => handleChange(e)} name="rank">
                <option value="student">--Select status--</option>
                <option value="profesor">Profesor</option>
                <option value="student">Student</option>
              </select>
            </>
          ) : (
            ""
          )}
          {rank === "profesor" && path.includes("register") ? (
            <label>
              <input
                type="password"
                name="admin"
                placeholder="Admin password"
                onChange={(e) => handleChange(e)}
                value={admin || ""}
              />
              {error.confirmPassword && <p>{error.confirmPassword}</p>}
            </label>
          ) : (
            ""
          )}
          {serverError && <p className="serverError">{serverError}</p>}
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
