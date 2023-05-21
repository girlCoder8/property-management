import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    axios.defaults.withCredentials = true;
    const Navigate = useNavigate();
    return (

        <div className='flex  items-center justify-between w-full bg-gray-300'>

            <div>
                <a className='text-2xl p-6 transition-all ease-in-out hover:cursor-pointer hover:rounded-md  hover:bg-gray-500 hover:text-neutral-50 font-bold'>Logo</a>
                <a href="/ownerdashboard" className='ml-7 transition-all ease-in-out hover:cursor-pointer hover:bg-gray-500 hover:rounded-md  hover:text-neutral-50 text-2xl p-6 font-bold'>Home</a>
            </div>
            <button className='ml-7 transition-all hover:rounded-md  ease-in-out hover:cursor-pointer hover:bg-gray-500 hover:text-neutral-50 p-6 justify-self-end text-xl font-bold' onClick={() => {
                axios.post("http://localhost:9000/auth/logout").then(res => { console.log(res); Navigate('/') }).catch(() => { console.log("Not logged in"); Navigate("/") })
            }}>Logout</button>
        </div>

    )
}