import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useLocation } from 'react-router-dom';

export default function Property() {
    axios.defaults.withCredentials = true;
    const Navigate = useNavigate();
    const location = useLocation();
    const { property_name } = location.state;
    const [loggedIn, setLogin] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:9000/auth/login")
            .then(res => { setLogin(true); console.log(loggedIn) })
            .catch(() => { console.log("Not logged in"); Navigate("/") })
    }, [loggedIn])

    const { property_id } = useParams();
    console.log(property_id)
    const [houses, setHouses] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:9000/property/${property_id}`)
            .then(res => {
                console.log(res.data);
                setHouses(res.data);
            })
            .catch((err) => { console.log(err) })

    }, []);

    const [showForm, setShowForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    // const [details, setDetails] = useState({ house_name: "", rent: "", capacity: "", tenant_type: "" , is_paid:false,  issues:[] })


    const [formData, setFormData] = useState({ unitName: "", monthlyRent: "" })
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "monthlyRent" ? parseInt(value) : value;
        setFormData(prevState => ({ ...prevState, [name]: newValue }));
    }
    const handleAddHouse = (e) => {

        e.preventDefault();
        axios.post(`http://localhost:9000/property/${property_id}/addunit`, formData)
            .then(res => {
                console.log(res.data);
                setHouses(res.data);
            })
            .catch((err) => { console.log(err) })
        setShowForm(false)
    }



    const addHouseForm = (
        <div className='z-10 abolute backdrop-blur-sm absolute h-[100%] w-[100%]'>

            <form onSubmit={handleAddHouse} className=' mt-[10%]  w-[50%] mx-auto bg-white opacity-75 border-gray-400 border-2 rounded-lg p-5 backdrop-blur-20px backdrop-saturate-200 flex-col flex space-y-7 place-items-center text-center '>
                <h1 className='text-4xl'><em><u>Add House</u></em></h1>
                <span className='absolute right-5 top-1 cursor-pointer' onClick={() => setShowForm((prev) => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </span>

                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="text" name="unitName" onChange={handleChange} placeholder="House Name" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="number" name="monthlyRent" onChange={handleChange} placeholder="Room Rent" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="number" name="bedrooms" onChange={handleChange} placeholder="Number of bedrooms" />

                <div>

                    <input type="radio" id="family" name="tenant_type" value="family" />
                    <label className='ml-3' for="family">Family</label><br />
                    <input type="radio" id="bachelors" name="tenant_type" value="bachelors" />
                    <label className='ml-3' for="bachelors">Bachelors</label><br />
                    <input type="radio" id="other" name="tenant_type" value="other" />
                    <label className='ml-3' for="other">Other</label><br />

                </div>
                <button className=' bg-green-700 text-yellow-50  border-gray-400 rounded-lg p-2' type="submit" >Done</button>

            </form>
        </div>
    )



    const handleEditHouse = (e) => {
        e.preventDefault();
        console.log(sessionStorage.getItem("houseId"), "in  session storage")
        // console.log(e.target.getAttribute("data-id")) //This one wont work because clicked on done button rather than item
        axios.put(`http://localhost:9000/property/${property_id}/edithouse/${sessionStorage.getItem("houseId")}`, formData)
            .then(res => {
                console.log(res.data);
                setHouses(res.data);
            })
            .catch((err) => { err.response.data.msg ? alert(err.response.data.msg) : console.log(err) })
        setShowEditForm(false)
    }

    const handleDeleteHouse = (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute("data-id"))
        axios.delete(`http://localhost:9000/property/${property_id}/deletehouse/${e.target.getAttribute("data-id")}`)
            .then(res => {
                console.log(res.data);
                setHouses(res.data);
            })
            .catch((err) => { console.log(err) })
        setShowForm(false)
    }

    const editHouseForm = (
        <div className='z-10 abolute backdrop-blur-sm absolute h-[100%] w-[100%]'>
            <form onSubmit={handleEditHouse} className=' mt-[10%]  w-[50%] mx-auto bg-white opacity-75 border-gray-400 border-2 rounded-lg p-5 backdrop-blur-20px backdrop-saturate-200 flex-col flex space-y-7 place-items-center text-center '>
                <h1 className='text-4xl'><em><u>Edit House</u></em></h1>
                <span className='absolute right-5 top-1 cursor-pointer' onClick={() => setShowEditForm((prev) => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </span>

                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="text" name="unitName" onChange={handleChange} placeholder="House Name" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="number" name="monthlyRent" onChange={handleChange} placeholder="Room Rent" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="email" name="tenant_email" onChange={handleChange} placeholder="Tenant Email" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="number" name="bedrooms" onChange={handleChange} placeholder="Number of bedrooms" />
                <div>

                    <input type="radio" id="family" name="tenant_type" value="family" />
                    <label className='ml-3' for="family">Family</label><br />
                    <input type="radio" id="bachelors" name="tenant_type" value="bachelors" />
                    <label className='ml-3' for="bachelors">Bachelors</label><br />
                    <input type="radio" id="other" name="tenant_type" value="other" />
                    <label className='ml-3' for="other">Other</label><br />

                </div>
                <button className=' bg-green-700 text-neutral-50  border-gray-400 rounded-lg p-2' type="submit" >Done</button>

            </form>
        </div>
    )





    // console.log(house)
    return (
        <>
            <Navbar />
            <div className='pt-4 h-[100vh] max-h-max bg-gray-100'>
                {showForm && addHouseForm}
                {showEditForm && editHouseForm}
                {houses.length == 0 ? "No Houses Added" : houses.map(house =>
                    (
                        <div key={house._id} className='flex flex-col space-y-5 p-5  m-5 bg-white shadow-md transition-all duration-400 ease-in-out hover:shadow-xl rounded-lg'>
                            <h1 className='text-3xl'>{house.unitName}</h1>
                            <h1><b>House Rent: </b>{house.monthlyRent}</h1>
                            <h1><b>Tenant Type: </b>{house.tenant_type}</h1>
                            <h1><b>Bedrooms: </b>{house.bedrooms}</h1>
                            <h1><b>Is Paid? </b>{house.ispaid ? "True" : "False"}</h1>
                            {house.issues?.map(issue => <h1>{issue.issue}</h1>)}
                            <span>
                            <button data-id={house._id} className='bg-blue-500 border hover:bg-white transition-colors ease-in-out duration-250 hover:text-black border-blue-300 w-[5rem] text-white rounded-lg p-2' onClick={(e) => { sessionStorage.setItem("houseId", e.target.getAttribute("data-id")); setShowEditForm((prev) => !prev) }}>Edit</button>
                            <button data-id={house._id} className='bg-red-500 border hover:bg-white transition-colors ease-in-out duration-250 hover:text-black border-red-300 w-[5rem] text-white rounded-lg p-2' onClick={handleDeleteHouse}>Delete</button>
                        </span>
                        </div>
                    ))}
            </div>
            <span>
                <button className=' fixed bottom-5 right-5 shadow-lg hover:scale-110 float-right px-4 py-2 transition-all ease-in-out border-black rounded-lg bg-orange-400' onClick={() => setShowForm((prev) => !prev)} >Add House for {property_name}</button>
            </span>
        </>
    )
}