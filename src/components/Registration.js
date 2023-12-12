
import {useState} from "react";
import Axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "./Login.css";

function Registration(){
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleChange1 = (event) => {
        setUsername(event.target.value)
    }
    const handleChange2 = (event) => {
        setPassword(event.target.value)
    }
    const handleChange3 = (event) => {
        setEmail(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (email.trim() === '' || username.trim() === '' || password.trim() === '') {
            alert('Please fill out the fields.');
        } 
        else {
            Axios.post("https://recipe-finder-backend3.onrender.com/userRoute/register", { email, username, password })
                .then((res) => {
                    console.log(res);
                    alert("Registration successful.")
                    navigate("/userRoute/login");
                })
                .catch((err) => alert(err));
        }
    }
    
    return(
        <div className="d-flex align-items-center justify-content-center mt-5" >

            <form className="form-container" onSubmit={handleSubmit}>

                <h1 className="text-center mt-2 login_heading">Create your account</h1>
                
                <div className="mb-4 mt-5">
                    <label className="form-label mx-3 fw-bold" for="email">Email:</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" id="email" onChange={handleChange3}/>
                </div>

                <div className="mb-4 mt-5">
                    <label className="form-label mx-3 fw-bold" for="username">Username:</label>
                    <input type="text" className="form-control" placeholder="Enter username" name="username" id="username" onChange={handleChange1}/>
                </div>
                
                <div className="mb-4 mt-5">
                    <label className="form-label mx-3 fw-bold" for="password">Password:</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" id="password" onChange={handleChange2}/>
                </div>
                
                <div className="mt-5">
                    <button type="submit" className="btn btn-primary px-3 mb-3 fw-bold w-50 custom-btn">Register/Sign Up</button>
                    <div className="d-flex reg_link">
                        <p>Have an account?</p>
                        <Link to="/userRoute/login"className="mb-5" style={{textDecoration:"None"}}>Login here</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Registration;