
# Employee Management System

This project is a comprehensive **Employee Management System** divided into two main parts: **Frontend** and **Backend**. The system is designed to allow administrators to manage employee data, including adding new employees, updating existing records, and deleting employees from the system.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Screenshot](#screenshot)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview

The Employee Management System helps organizations maintain detailed records of their employees. The system allows HR teams and administrators to handle a variety of tasks, including adding new employees, viewing their records, updating employee data, and deleting unnecessary records. The app is divided into a **frontend** built with HTML, CSS, Tailwind CSS JavaScript, React, Next.js and a **backend** powered by Node.js and MongoDB.

## Features

- Add, update, and delete employee records.
- Search functionality for quick access to employee details.
- Pagination for easy navigation through employee lists.
- User-friendly interface with detailed employee information, including unique ID, name, email, phone number, designation, gender, course, and created date.
- Option to upload and display employee photos.

## Technologies Used

### Frontend:
- HTML
- CSS
- Tailwind CSS
- JavaScript
- React
- Next.js

### Backend:
- Node.js (Express.js)
- MongoDB (Atlas)

## Setup and Installation

### Frontend Setup

1. Clone the repository.
   ```bash
   git clone https://github.com/your-repo/employee-management-system.git
   ```
2. Navigate to the frontend folder.
   ```bash
   cd frontend
   ```
3. Run the server.
   ```bash
   npm start
   ```
5. The frontend will run at http://localhost:3000. Make sure port 3000 is available and not in use by any other service.

### Backend Setup

1. Navigate to the backend folder.
   ```bash
   cd backend
   ```
2. Install the necessary dependencies.
   ```bash
   npm install
   ```
3. Create a `.env` file for environment variables (e.g., database URL).
   ```bash
   PORT=your-port
   MONGO_URL=your-mongodb-url
   SECRET_KEY=your-secret-key
   ```
4. Run the server.
   ```bash
   npm start
   ```
5. The backend server will run on `http://localhost:${port}`.

## Usage

1. After setting up both the frontend and backend, open the frontend in your browser.
2. Sign in using your ID and password.
3. Navigate to the "Employee List" to view the employees.
4. Use the "Create Employee" button to add new employees.
5. To update or delete employee records, use the action buttons next to each employee.
6. Use the search functionality to quickly find employees based on keywords.

## Screenshot

![image](https://github.com/user-attachments/assets/fb132014-470e-4ab8-9844-5ccd175271d9)
![image](https://github.com/user-attachments/assets/45be6884-dff6-471e-8317-da4bd80059a8)



## Future Enhancements

- Add user authentication and role-based permissions.
- Implement advanced filtering options for searching employees.
- Add export functionality (e.g., CSV export) for employee data.
- Integration with email services for sending automated notifications.

## License

This project is licensed under the MIT License.
