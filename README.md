# Human Resource Management System

## Project Overview
This project is a Human Resource Management System (HRM) designed for Jupiter Apparels, a multinational corporation. The system aims to streamline HR processes such as Personal Information Management (PIM) and Absence Management initially, with potential expansion to include payroll and inventory functionalities.

## Features

- **PIM Module:**
  - Store and manage employee information including personal details, job titles, employment status, and dependencies.
  - Customizable attributes for future scalability.

- **Absence Module:**
  - Manage leave applications and approvals based on predefined leave types (Annual, Casual, Maternity, No-pay).
  - Configurable leave structures based on employee pay grades.

- **Reporting Module:**
  - Generate comprehensive reports such as employee by department, total leaves by department, and custom field-based reports.
  - Modular approach for extensibility.

- **User Management and Security:**
  - Fine-grained access control for different user roles.
  - Mandatory admin user with control over user creation and management.

## Technologies Used

- Frontend: React.js
- Backend: Node.js
- Database: MySQL

## Installation

### Prerequisites

- Node.js and npm installed
- MySQL database server

### Steps

1. Clone the repository:
   ```plaintext
    https://github.com/chathura-de-silva/E-Commerce-Platform
    ```
2. Install dependencies for frontend and backend:
   ```plaintext
    cd frontend
    npm install
    cd ../backend
    npm install
    ```
3. Database setup:
4. Start the backend server:
   ```plaintext
    cd backend
    npm start
    ```
5. Start the frontend server:
   ```plaintext
    cd frontend
    npm start
    ```

## Usage

- Admin User: Use the initial admin account to create HR managers and other users.
- HR Managers: Add, edit, and manage employee records, leaves, and generate reports.
