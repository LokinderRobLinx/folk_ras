import React, { useContext, useEffect, useState } from 'react'
import { useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify';
import { LoginContext } from '../../App';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './cards/firebase';
// import Loader from '../layout/Layout';

function Login({onLogin}) {

    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };


    // const auth = getAuth();
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, input.email, input.password)
        .then((userCredential) => {
          console.log(userCredential);
          onLogin(input.email)
          navigate("/")
        })
        .catch((error) => {
          console.log(error);
        });
    }


    return (
        <div className='login-parent my-3 '>
            {/* {loading && (<Loader />)} */}

            <div className="row justify-content-center py-3">

                <div className="col-md-4 z1">
                    <div className="login-form">
                        <h2>Login</h2>
                        <hr />
                        <input
                            className='form-control'
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                            placeholder="Enter Your Email"
                            required
                        />
                        <input
                            className='form-control'
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            placeholder="Enter Your Password"
                            required
                        />

                        <button className=' btnA my-3' onClick={handleLogin}>LOGIN</button>
                     

                        <hr />
                        <Link style={{color: "red"}} to='/register'>Click Here to Register</Link>

                    </div>
                </div>
                <div className="col-md-5 z1">
                    <lottie-player
                        src="https://assets2.lottiefiles.com/packages/lf20_gjmecwii.json"
                        background="transparent"
                        speed="1"
                        // style="width: 300px; height: 300px;"
                        loop
                        autoplay>

                    </lottie-player>
                </div>
            </div>

            <div className="login-bottom "></div>


        </div>
    )
}

export default Login