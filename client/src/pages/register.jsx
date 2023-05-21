import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate()

    const [cred, setCred] = useState({ name: "", property: "", email: "", password: "", role: "" })
    const handleChange = (e) => {
        console.log(cred)
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    const handleRegister = function (e) {
        e.preventDefault()
        if (cred.email == "" || cred.password == "") {
            alert("Please fill all the fields")
            return
        }

        if (cred.name == "") {
            cred.name = cred.email
        }

        axios.post('http://localhost:9000/auth/register', {
            name: cred.name,
            role: cred.role,
            email: cred.email,
            password: cred.password
        })
            .then(res => {
                console.log(res, res.status)
                if (res.status == 200) {
                    navigate('/')
                }
                else {

                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div className=' h-[100vh] pt-[5rem]'>
            <form className=' w-[20rem] md:w-[30rem] mx-auto pb-4 bg-white opacity-75 border-gray-400 border-2 rounded-lg  backdrop-blur-20px backdrop-saturate-200 flex-col flex space-y-7 place-items-center text-center '>
                <h1 className='text-4xl mt-2'>Register</h1>
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' name="name" type='text' onChange={handleChange} placeholder="Username" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' name="email" type='email' onChange={handleChange} placeholder="Email" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' name="password" type="password" onChange={handleChange} placeholder="Password" />
                <div>
                    <label >Owner</label>
                    <input className='w-[80%] border-2  border-gray-400 rounded-lg p-2' name="role" value="owner" type="radio" onChange={handleChange} />
                    <label >Tenant</label>
                    <input className='w-[80%] border-2  border-gray-400 rounded-lg p-2' name="role" value="tenant" type="radio" onChange={handleChange} />
                </div>
                <button className='w-[80%] border-2 border-gray-400 rounded-lg p-2' onClick={handleRegister}>Register</button>

                <p>
                    Already a User? <a href="/login" className='underline hover:text-blue-600'>Log In</a>
                </p>
            </form>
        </div>
    )
}