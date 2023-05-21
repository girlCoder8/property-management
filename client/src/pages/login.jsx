import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [cred, setCred] = useState({ email: "", password: "" })
    const [loggedIn, setLogin] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:9000/auth/login")
            .then((res) => {
                console.log(res);
                setLogin(true);
                navigate("/ownerdashboard")
            })
            .catch(() => {
                console.log("Not logged in");
                navigate("/")
            })
    }, []);
    useEffect(() => {
        if (loggedIn) {
            navigate("/ownerdashboard");
        }
    }, [loggedIn]);
    const handleChange = (e) => {
        console.log(cred)
        setCred({ ...cred, [e.target.type]: e.target.value })
    }
    const handleLogin = function (e) {
        e.preventDefault()
        axios.post('http://localhost:9000/auth/login', {
            email: cred.email,
            password: cred.password
        })
            .then(res => {
                console.log(res, res.status)
                setLogin(true)
                console.log(res.data.role)
                if (res.data.role == "owner") {
                    navigate('/ownerdashboard')
                }
                else {
                    navigate('/tenantdashboard')
                }
            })
            .catch(err => {
                alert("Invalid Credentials")
                console.log(err)
            });
    }
    return (
        <div className=' h-[100vh] pt-[10rem]'>
            <form className='w-[20rem] md:w-[30rem] mx-auto bg-white opacity-75 border-gray-400 border-2 rounded-lg p-5 backdrop-blur-20px backdrop-saturate-200 flex-col flex space-y-7 place-items-center text-center '>
                <h1 className='text-4xl'>Login</h1>
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' name="email" type='email' onChange={handleChange} placeholder="Email" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' name="password" type="password" onChange={handleChange} placeholder="Password" />
                <button className='w-[80%] bg-sky-600 text-white hover:bg-sky-700 border-2 border-blue-500 rounded-lg p-2' onClick={handleLogin}>Login</button>
                <p>Don't Have an Account? <a className='underline hover:text-blue-600' href="/register">Create One</a></p>
            </form>
        </div>

    )
}
export default Login