
import { useState } from "react";
import Axios from "axios";
import {useCookies} from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
    const [_, setCookies] = useCookies(["access_token"]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const handleChange1 = (event) => {
        setUsername(event.target.value);
    }

    const handleChange2 = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            alert('Invalid credentials');
            return;
        } 
        else{
            Axios.post("http://localhost:4000/userRoute/login", { username, password })
            .then((res) => {
                if (res.data.message === "Successfully login") {
                    setCookies("access_token", res.data.token);
                    window.localStorage.setItem("id", res.data.id);
                    setIsLoggedIn(true);
                    navigate("/");
                } 
                else {
                    alert(res.data.message || 'Invalid credentials');
                }
            })
            .catch((err) => alert(err));
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center mt-5">

            <form className="form-container" onSubmit={handleSubmit}>

                <h1 className="text-center mt-2 login_heading">Login</h1>
                    
                    <div className="d-flex align-items-center justify-content-center mb-4 mt-5">
                        <label className="form-label mx-3 fw-bold" for="username">Username:</label>
                        <input type="text" className="form-control" placeholder="Enter username" name="username" id="username" onChange={handleChange1} />
                    </div>
                    
                    <div className="d-flex align-items-center justify-content-center">
                        <label className="form-label mx-3 fw-bold" for="password">Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="password" id="password" onChange={handleChange2} />
                    </div>

                    <div className="mt-5">
                        <button type="submit" className="btn btn-success px-3 mb-3 fw-bold w-50 custom-btn">Login</button>
                        <div className="d-flex reg_link">
                            <p>Don't have an account?</p>
                            <Link to="/userRoute/register" className="mb-5" style={{ textDecoration: "None" }}>Register here</Link>
                        </div>
                    </div>
            </form>
        </div>
    );
}

export default Login;
