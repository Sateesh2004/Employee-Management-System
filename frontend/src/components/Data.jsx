"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeTable = ({ employees, currentPage, setEmployees, openUpdateForm }) => {
  const itemsPerPage = 6;

  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" });

  const sortedEmployees = React.useMemo(() => {
    let sortableEmployees = [...employees];
    sortableEmployees.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortableEmployees;
  }, [employees, sortConfig]);

  const deleteHandler = async (employeeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    
    if (confirmed) {
      try {
        const response = await fetch(`https://dealsdray-1.onrender.com/delete/employees/${employeeId}`, {
          method: "DELETE",
        });
        
        if (!response.ok) {
          throw new Error("Failed to delete employee");
        }

        console.log("Employee deleted successfully");

        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== employeeId)
        );
        
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ▲" : " ▼";
    }
    return "";
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-yellow-300">
            <th className="py-2 px-4 border" onClick={() => requestSort("index")}>#</th>
            <th className="py-2 px-4 border hover:cursor-pointer" onClick={() => requestSort("employeeId")}>Unique Id{getSortIndicator("employeeId")}</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border hover:cursor-pointer" onClick={() => requestSort("name")}>Name{getSortIndicator("name")}</th>
            <th className="py-2 px-4 border hover:cursor-pointer" onClick={() => requestSort("email")}>Email{getSortIndicator("email")}</th>
            <th className="py-2 px-4 border">Mobile No</th>
            <th className="py-2 px-4 border">Designation</th>
            <th className="py-2 px-4 border">Gender</th>
            <th className="py-2 px-4 border">Course</th>
            <th className="py-2 px-4 border hover:cursor-pointer" onClick={() => requestSort("createDate")}>Created At{getSortIndicator("createDate")}</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td className="py-2 px-4 border">
                {(currentPage - 1) * itemsPerPage + (index + 1)}.
              </td>
              <td className="py-2 px-4 text-center border">{employee.employeeId}</td>
              <td className="py-2 px-4 text-center border">
                <div className="flex justify-center items-center">
                  <Image
                    src={employee.photoUrl ? `https://dealsdray-1.onrender.com${employee.photoUrl}` : '/default-profile.png'}
                    alt="Employee"
                    className="w-12 h-12 object-cover rounded-full border-2 border-gray-300 shadow-lg"
                    width={48}
                    height={48}
                    loading="lazy"
                  />
                </div>
              </td>
              <td className="py-2 px-4 text-center border">{employee.name}</td>
              <td className="py-2 px-4 text-center border">{employee.email}</td>
              <td className="py-2 px-4 text-center border">{employee.mobile}</td>
              <td className="py-2 px-4 text-center border">{employee.designation}</td>
              <td className="py-2 px-4 text-center border">{employee.gender}</td>
              <td className="py-2 px-4 text-center border">{employee.course}</td>
              <td className="py-2 px-4 text-center border">
                {new Date(employee.createDate).toLocaleDateString("en-US")}
              </td>
              <td className="py-2 px-4 border text-center">
                <button className="bg-red-500 mb-1 px-1 rounded text-[13px]" onClick={() => openUpdateForm(employee)}>Update</button>
                <br />
                <button
                  className="bg-blue-500 rounded px-[6.5px] text-[13px]"
                  onClick={() => deleteHandler(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Data = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0); 
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dealsdray-1.onrender.com/api/employees?page=${currentPage}&limit=6&search=${debouncedSearchTerm}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployees(data.employees);
        setTotalPages(data.totalPages);
        setTotalEmployees(data.totalEmployees); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, debouncedSearchTerm]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const openUpdateForm = (employee) => {
    setSelectedEmployee(employee);
    setIsUpdateFormOpen(true);
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const response = await fetch(`https://dealsdray-1.onrender.com/update/employees/${selectedEmployee._id}`, {
        method: "PUT",
        body: updatedEmployee, 
      });

      
  
      if (!response.ok) {
        const result = await response.json()

        toast.error(result.message)
        throw new Error("Failed to update employee");
      }
  
      const updatedEmployeeData = await response.json();
  
      
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === updatedEmployeeData._id ? updatedEmployeeData : employee
        )
      );
  
      console.log("Employee updated successfully");
      setIsUpdateFormOpen(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 pt-0">
      <ToastContainer /> 
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          className="border border-gray-300 p-2"
          placeholder="Enter Search Keyword"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <strong>Total Emp.: </strong>{totalEmployees}
        </div>
      </div>

      <EmployeeTable
        employees={employees}
        currentPage={currentPage}
        setEmployees={setEmployees}
        openUpdateForm={openUpdateForm}
      />

      <div className="flex  justify-center mb-4 ">
        
      <div className="flex justify-between items-center mt-4 text-center">
  <button
    className={`px-2 py-1 mr-2 text-white ${
      currentPage === 1 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
    }`}
    onClick={handlePrevious}
    disabled={currentPage === 1}
  >
    <span className="text-[10px]">Prev</span>
  </button>
  <span className="text-xl">
    {currentPage} of {totalPages}
  </span>
  <button
    className={`px-2 py-1 ml-2 text-white ${
      currentPage === totalPages
        ? "bg-gray-400"
        : "bg-blue-500 hover:bg-blue-700"
    }`}
    onClick={handleNext}
    disabled={currentPage === totalPages}
  >
    <span className="text-[10px]">Next</span>
  </button>
</div>

      </div>

      {isUpdateFormOpen && (
        <UpdateForm
          employee={selectedEmployee}
          onClose={() => setIsUpdateFormOpen(false)}
          onUpdate={handleUpdateEmployee}
        />
      )}
    </div>
  );
};



const UpdateForm = ({ employee, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(employee);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        const courses = prevData?.course || [];
        if (checked) {
          return { ...prevData, course: [...courses, value] };
        } else {
          return { ...prevData, course: courses.filter((course) => course !== value) };
        }
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any data has changed
    const hasChanged = Object.keys(formData).some(key => {
      if (key === 'course') {
        // Compare courses arrays
        return (
          JSON.stringify(formData[key]) !== JSON.stringify(employee[key])
        );
      }
      return formData[key] !== employee[key];
    });

    if (!hasChanged || (selectedImage === null && !hasChanged)) {
      alert("No changes detected to submit.");
      return; // Prevent form submission if no changes
    }

    const updatedEmployee = new FormData();
    updatedEmployee.append("name", formData.name);
    updatedEmployee.append("email", formData.email);
    updatedEmployee.append("mobile", formData.mobile);
    updatedEmployee.append("designation", formData.designation);
    updatedEmployee.append("gender", formData.gender);
    
    formData.course?.forEach((course) => {
      updatedEmployee.append("course", course);
    });

    if (selectedImage) {
      updatedEmployee.append("photo", selectedImage); 
    }

    onUpdate(updatedEmployee); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl mb-4">Update Employee</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <label htmlFor="name" className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData?.name || ""}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border border-gray-300 p-2 w-full mb-4"
          />

          <label htmlFor="email" className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData?.email || ""}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border border-gray-300 p-2 w-full mb-4"
          />

          <label htmlFor="mobile" className="block mb-2">Mobile No:</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            value={formData?.mobile || ""}
            onChange={handleChange}
            placeholder="Mobile No"
            required
            className="border border-gray-300 p-2 w-full mb-4"
          />

          <label htmlFor="designation" className="block mb-2">Designation:</label>
          <select
            name="designation"
            id="designation"
            value={formData?.designation || ""}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full mb-4"
          >
            <option value="" disabled>Select Designation</option>
            <option value="Hr">Hr</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>

          <label className="block mb-2">Gender:</label>
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData?.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData?.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          <label className="block mb-2">Course:</label>
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={formData?.course?.includes("MCA")}
                onChange={handleChange}
              />
              MCA
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={formData?.course?.includes("BCA")}
                onChange={handleChange}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BSc"
                checked={formData?.course?.includes("BSc")}
                onChange={handleChange}
              />
              BSc
            </label>
          </div> 
          <label htmlFor="photoUrl" className="block mb-2">Photo (Only JPG/PNG) : </label>
          <input
            type="file"
            name="photoUrl"
            id="photoUrl"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 w-full mb-4"
            accept="image/*"
          />

          <div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Update
            </button>
            <button type="button" onClick={onClose} className="ml-2 bg-gray-300 text-black px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};






export default Data;

