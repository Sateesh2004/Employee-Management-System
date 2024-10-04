"use client";
import Data from '@/components/Data';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
const Home = ({params}) => (

  <div>
    <h2 className="text-2xl font-bold mb-4">Homepage</h2>
    <p>Hello {params.username} </p>
    <p>Welcome to admin panel.</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <h2 className="text-2xl font-bold mb-4 text-center">A Unique B2B Platform for Mobile Retailers,</h2>
  </div>
);

const EmployeeList = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeMobile, setEmployeeMobile] = useState("");
  const [employeeDesignation, setEmployeeDesignation] = useState("");
  const [employeeGender, setEmployeeGender] = useState("");
  const [employeePhoto, setEmployeePhoto] = useState(null);
  const [employeeCourses, setEmployeeCourses] = useState([]);

  const designations = [
    "HR",
    "Manager",
    "Sales",
    
  ];

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', employeeName);
    formData.append('email', employeeEmail);
    formData.append('mobile', employeeMobile);
    formData.append('designation', employeeDesignation);
    formData.append('gender', employeeGender);
    formData.append('course', employeeCourses);
    formData.append('photo', employeePhoto); 
    formData.append('addedBy', 'Admin');
  
    try {
      const response = await fetch('http://localhost:4000/employee/add', {
        method: 'POST',
        body: formData, 
      });
  
      if (response.ok) {
        setEmployeeName("");
        setEmployeeEmail("");
        setEmployeeMobile("");
        setEmployeeDesignation("");
        setEmployeeGender("");
        setEmployeeCourses([]);
        setEmployeePhoto(null); 
        setShowCreateForm(false);
        console.log('Employee created successfully!');
        toast.success("Employee created successfully!")
    localStorage.setItem('currentPage', 'employees');
    setTimeout(() => {
      window.location.href = window.location.href; 
    }, 200);
      } else {
       const  result = await response.json()
       toast.error(result.message)
        
       
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  
    
  };

  const cancelHandler = async (e) => {
    setShowCreateForm(false);
  };

  return (
    <div className=''>
      <ToastContainer /> 
      <div className="flex  justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Employee List</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Create Employee
        </button>
        
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px] sm:w-[500px]">
            <h2 className="text-xl font-bold mb-4">Create Employee</h2>
            <form className="p-4 bg-white rounded shadow" onSubmit={handleCreateEmployee} noValidate>
              
              <div className="flex justify-between gap-1">
                <div>
              <label className="block mb-2">Name:</label>
             
              
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="border block border-gray-300 rounded p-2 w-full mb-4"
                required
                autoComplete="on"
              />
              </div>
              <div>

              <label className="block mb-2">Email:</label>
             
              <input
                type="email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-4"
                required
              />
              </div>
              </div>
             

              <label className="block mb-2">Mobile Number:</label>
              <input
                type="tel"
                value={employeeMobile}
                onChange={(e) => setEmployeeMobile(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-4"
                required
              />

              <label className="block mb-2">Designation:</label>
              <select
                value={employeeDesignation}
                onChange={(e) => setEmployeeDesignation(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-4"
                required
              >
                <option value="">Select Designation</option>
                {designations.map((designation) => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </select>

              <label className="block mb-2">Gender:</label>
              <div className="flex mb-4">
                <div className="mr-4">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    checked={employeeGender === "Male"}
                    onChange={(e) => setEmployeeGender(e.target.value)}
                    required
                  />
                  <label htmlFor="male" className="ml-2">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    checked={employeeGender === "Female"}
                    onChange={(e) => setEmployeeGender(e.target.value)}
                    required
                  />
                  <label htmlFor="female" className="ml-2">Female</label>
                </div>
              </div>

              <label className="block mb-2">Course:</label>
              <div className="flex mb-4">
                <div className="mr-4">
                  <input
                    type="checkbox"
                    id="mca"
                    value="MCA"
                    onChange={(e) => setEmployeeCourses([...employeeCourses, e.target.checked ? e.target.value : employeeCourses.filter(course => course !== e.target.value)])}
                  />
                  <label htmlFor="mca" className="ml-2">MCA</label>
                </div>
                <div className="mr-4">
                  <input
                    type="checkbox"
                    id="bca"
                    value="BCA"
                    onChange={(e) => setEmployeeCourses([...employeeCourses, e.target.checked ? e.target.value : employeeCourses.filter(course => course !== e.target.value)])}
                  />
                  <label htmlFor="bca" className="ml-2">BCA</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="bsc"
                    value="BSC"
                    onChange={(e) => setEmployeeCourses([...employeeCourses, e.target.checked ? e.target.value : employeeCourses.filter(course => course !== e.target.value)])}
                  />
                  <label htmlFor="bsc" className="ml-2">BSC</label>
                </div>
              </div>
              <label className="block mb-2">Upload Photo (Only JPG/PNG) : </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEmployeePhoto(e.target.files[0])} 
                className="border border-gray-300 rounded p-2 w-full mb-4"
                required
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Employee
              </button>
              <button
                type="button"
                onClick={cancelHandler}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <Data />
    </div>
  );
};


const Dashboard = ({ params }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('currentPage');
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      router.push('/');
    }
  };

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/validate/${params.username}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          console.log('Token validation failed:', response.statusText);
          router.push('/');
        }
      } catch (error) {
        console.error('Error validating token:', error);
        router.push('/');
      }

      const storedPage = localStorage.getItem('currentPage');
      if (storedPage) {
        setCurrentPage(storedPage);
      }
    };

    authenticateUser();
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex flex-row justify-between">
        <h1 className="text-lg font-bold ml-20">DealsDry</h1>
        <button 
    className="text-lg font-bold text-blue-500  p-1 mr-20 rounded bg-slate-100 hover:bg-slate-200" 
    onClick={logoutHandler} 
    aria-label="Log out">
    Log out
</button>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <aside className="w-[200px] bg-white p-4 border-r overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handlePageChange('home')}
                className={`w-full text-left p-2 hover:bg-gray-200 ${currentPage === 'home' ? 'bg-gray-200' : ''}`}
              >
                Home 
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange('employees')}
                className={`w-full text-left p-2 hover:bg-gray-200 ${currentPage === 'employees' ? 'bg-gray-200' : ''}`}
              >
                Employee List
              </button>
            </li>
          </ul>
        </aside>

        <div className="flex-1 p-4 bg-white overflow-y-auto">
          {currentPage === 'home' && <Home params={params} />}
          {currentPage === 'employees' && <EmployeeList />}
        </div>
      </main>
    </div>
  );
};




export default Dashboard;
