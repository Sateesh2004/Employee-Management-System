"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const page = () => {
  const router = useRouter()
  const [username, setUsername] = useState("Sateesh1")
  const [password, setPassword] = useState("dealsdry1")
  const submitHandler = async (e) => {
    e.preventDefault()
    const data = {
      username,
      password,


    }
    try {
      const response = await fetch("https://dealsdray-1.onrender.com/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",


        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        const result = await response.json()
        console.log(result)
        toast.success(result.message)
        setTimeout(()=>{
          router.push(`/dashboard/${result.username}`)
        },2000)
        

       
      }
      else {
        const errorData = await response.json()
        toast.error(errorData.message)
      }
    }
    catch (error) {
      console.log("Error got", error)

    }


  }










  return (


    <div className='flex items-center justify-center  h-[100vh]  '>
     <ToastContainer />
      <div
        aria-hidden="true"
        className="absolute  inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] "
        />
      </div>



      <div
        aria-hidden="true"
        className="absolute  inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] "
        />
      </div>






      <form className="w-[350px] mx-auto border p-4 bg-white/30 backdrop-blur-lg rounded-lg shadow-lg border-white/20" onSubmit={submitHandler}>
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="bg-white/50 border border-gray-300 text-gray-900 text-sm block w-full p-2 focus:outline-none rounded-lg"
            placeholder="username"
            required
          />
        </div>



        <div className="mb-5">
          <label htmlFor="password1" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-white/50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 focus:outline-none rounded-lg"
            required
          />
        </div>



        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center rounded-lg transition ease-in-out delay-150">Submit</button>
      </form>

    </div>

  )
}

export default page
