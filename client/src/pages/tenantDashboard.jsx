import React from 'react'

export default function TenantDashboard() {
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get("http://localhost:9000/property/houses/:id").then(res => {

            // console.log(res, "res.data")
            if (res.data == null) {
                setDetails({ house_name: "", rent: "", capacity: "", tenant_type: "" })
            } else {
                setDetails(res.data)
            }
        }).catch(err => {
            console.log(err)
        }
        )
    }, [])

    return (
        <>
            <h1>Dashboard</h1>
            <div className='pt-4 h-[100vh] max-h-max bg-gray-100'>
                <div className='flex flex-col space-y-5 p-5  m-5 bg-white shadow-md transition-all duration-400 ease-in-out hover:shadow-xl rounded-lg'>
                    <h1 className='text-3xl'>{details.house_name}</h1>
                    <h1><b>House Rent: </b>{details.rent}</h1>
                    <h1><b>People: </b>{details.capacity}</h1>
                    <h1><b>Tenant Type: </b>{details.tenant_type}</h1>
                    <h1><b>Is Paid? </b>{details.ispaid ? "True" : "False"}</h1>
                    {details.issues?.map(issue => <h1>{issue.issue}</h1>)}
                    <span>
                        <button className='bg-blue-500 border hover:bg-white transition-colors ease-in-out duration-250 hover:text-black border-blue-300 w-[5rem] text-white px-4 py-2 rounded-lg' onClick={handleEdit}>Edit</button>
                        <button className='w-[5rem] mx-6 border transition-colors ease-in-out duration-250 hover:bg-red-500 border-red-300 px-4 py-2 rounded-lg' onClick={handleDelete}>Delete</button>
                    </span>
                </div>

                <button className='bg-blue-500 border hover:bg-white transition-colors ease-in-out duration-250 hover:text-black border-blue-300 w-[5rem] text-white px-4 py-2 rounded-lg'>Pay</button>
            </div>
        </>
    )
}