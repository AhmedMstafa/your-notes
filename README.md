# Your Notes 

The Your Notes App is a modern and responsive web application developed for creating and managing personal notes. This project utilizes various front-end and back-end technologies to create a robust, secure, and user-friendly interface for note-taking.

## Project Overview

Your Notes App is designed to help users create, edit, and manage their notes efficiently. The project demonstrates the application of advanced web development techniques to create a visually appealing and functional note-taking application.

## Features

- **Responsive Design:** The application adapts seamlessly to different screen sizes and devices.
- **User Authentication:** Implements user authentication and authorization using JSON Web Tokens (JWT).
- **CRUD Operations:** Allows users to create, read, update, and delete notes.
- **Form Handling:** Uses React Hook Form for efficient form handling and validation.
- **Icons Integration:** Incorporates React Icons to enhance the user experience with visually appealing icons.
- **State Management:** Utilizes React Toolkit for state management.
- **Data Validation:** Implements data validation on both front-end and back-end.
- **Secure Data Storage:** Uses MongoDB for secure data storage.
- **Password Encryption:** Ensures secure user authentication using bcrypt.js.
- **Environment Configuration:** Uses dotenv for configuration management.

## Technologies Used

### Front-End

- React
- React Router
- React Hook Form
- React Icons
- React Toolkit
- TailwindCSS
- JavaScript (ES6+)
- HTML5
- CSS3

### Back-End

- Node.js
- Express
- MongoDB
- Bcryptjs
- JSON Web Token
- Dotenv
- Validator
- Express Validator
- CORS

## Getting Started

To get a local copy of the project up and running, follow these simple steps:

### Prerequisites

- Node.js and npm/yarn installed on your machine
- MongoDB installed and running
- A modern web browser (e.g., Google Chrome, Mozilla Firefox)
- A code editor (e.g., Visual Studio Code)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AhmedMstafa/your-notes.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-notes
    ```
3. Install the front-end dependencies:
    ```bash
    cd client
    npm install
    ```
4. Install the back-end dependencies:
    ```bash
    cd ../server
    npm install
    ```
5. Create a `.env` file in the `server` directory and add your environment variables:
    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. Start the back-end server:
    ```bash
    cd server
    npm start
    ```
2. Start the front-end development server:
    ```bash
    cd ../client
    npm start
    ```
3. Open your web browser and navigate to `http://localhost:5000` to access the application.

