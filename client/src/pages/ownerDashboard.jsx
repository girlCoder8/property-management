import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

export default function OwnerDashboard() {
    axios.defaults.withCredentials = true;
    const Navigate = useNavigate();



    const [showForm, setShowForm] = useState(false);
    const [details, setDetails] = useState({ property_name: "", address: "", units: [], })
    const [properties, setProperties] = useState([])
    const [loggedIn, setLogin] = useState(false)
    useEffect(() => {
        if (!loggedIn) {
            axios.get("http://localhost:9000/auth/login").then((res) => { setLogin(true); console.log(res, "loggedin") }).catch(() => { console.log("Not logged in line 96"); Navigate("/") })
        }
    }, [loggedIn]);

    useEffect(() => {

        axios.get("http://localhost:9000/property/properties").then(res => {
            console.log(res.data, "res.data")
            if (res.data == null) {
                setProperties({ property_name: "", address: "", units: [], })
            } else {

                setProperties(res.data)
            }
        }).catch(err => {
                console.log(err)
            }
        )
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "property_name" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
        console.log(details, "details")
        setDetails(prevState => ({ ...prevState, [name]: newValue }));
    }
    const handleAddProperty = (e) => {

        e.preventDefault()
        console.log(details, "details")
        axios.post('http://localhost:9000/property/addproperty', details).then(res => {
            alert("Property Added")
            setShowForm(false)
            setDetails({ property_name: "", address: "", units: [], })
            axios.get("http://localhost:9000/property/properties").then((res) => {

                console.log(res, "res.data in properties add request")

                setProperties(res.data)
            }).catch(() => {
                console.log("Not logged in");
                Navigate("/")
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const handleDeleteProperty = (e, id) => {
        e.preventDefault()
        console.log(id, "id")
        axios.delete(`http://localhost:9000/property/deleteproperty/${id}`).then(res => {
            alert("Property Deleted")
        }).catch(err => {
            console.log(err)
        })
        axios.get("http://localhost:9000/property/properties").then((res) => {

                console.log(res, "res.data in properties delete request")

                setProperties(res.data)

            }
        ).catch(() => {
            console.log("Not logged in");
            Navigate("/")
        })
    }


    const form = (
        <div className='z-10 abolute backdrop-blur-sm absolute h-[100%] w-[100%]'>

            <form className=' mt-[10%]  w-[50%] mx-auto bg-white opacity-75 border-gray-400 border-2 rounded-lg p-5 backdrop-blur-20px backdrop-saturate-200 flex-col flex space-y-7 place-items-center text-center '>
                <h1 className='text-4xl'><em><u>Add Property</u></em></h1>
                <span className='absolute right-5 top-1 cursor-pointer' onClick={() => setShowForm((prev) => !prev)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

        </span>

                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="text" name="property_name" value={details.property_name} onChange={handleChange} placeholder="Property Name" />
                <input className='w-[80%] border-2 border-gray-400 rounded-lg p-2' type="text" name="address" value={details.address} onChange={handleChange} placeholder="Address" />
                <button className=' bg-green-700 text-yellow-50  border-gray-400 rounded-lg p-2' type="submit" onClick={handleAddProperty}>Add Property</button>

            </form>
        </div>
    )


    const handleShowForm = () => {
        setShowForm(!showForm)
    }



    return (
        <div className='bg-gray-100 h-[100vh] max-h-max'>
            {showForm ? form : null}
            <Navbar />
            {properties.length == 0 ? <h1 className='text-4xl mt-3 text-center'>No Properties to show</h1> : properties.map((property) => {
                return (
                    <div key={property._id} className='flex flex-col space-y-5 p-5 cursor-pointer m-5 shadow-md transition-all duration-400 ease-in-out hover:shadow-xl bg-white border-gray-400 rounded-lg backdrop-blur-20px backdrop-saturate-200'>
                        <Link key={property._id} to={{ pathname: `/dashboard/property/${property._id}` }} state={{ property_name: property.property_name }}>
                            <h1 className='text-2xl'>Property Name: {property.property_name}</h1>
                            <h1 className='text-2xl'>Address: {property.address}</h1>
                            <h1 className='text-2xl'>Houses: {property.units.length}</h1>
                        </Link>
                        <button className='bg-red-700 hover:bg-red-400 text-yellow-50 z-10  border-gray-400 rounded-lg p-2' onClick={(e) => handleDeleteProperty(e, property._id)}>Delete Property</button>
                    </div>
                )
            })
            }
            <span className=''>
        <button className=' fixed bottom-5 right-5 shadow-lg hover:scale-110 float-right px-4 py-2 transition-all ease-in-out border-black rounded-lg bg-orange-400' onClick={handleShowForm}>Add Property</button>
      </span>
        </div >
    )
}