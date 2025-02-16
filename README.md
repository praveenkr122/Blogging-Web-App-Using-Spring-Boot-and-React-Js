📝 Blogging App with Spring Boot and React.js
📖 Overview
This project is a simple Blogging Application built using Spring Boot for the backend and React.js for the frontend. It provides features for users to create, edit, delete, and view blog posts with secure authentication using JWT.

⚙️ Tech Stack
Backend: Spring Boot, Java, MySQL, JWT Authentication
Frontend: React.js, Axios, React Router, Bootstrap
🚀 Features
User Authentication (Sign Up, Login, Logout)
Create, Edit, and Delete Blogs
View Blog Details on Click
Responsive UI with Blog Cards and Hover Effects
🛠️ Setup Instructions
Backend Setup
Clone the repository.
Open the project in your IDE.
Update application.properties with your MySQL database credentials.
Run the application using:
bash
Copy
Edit
mvn spring-boot:run
Frontend Setup
Navigate to the frontend directory.
Install dependencies:
bash
Copy
Edit
npm install
Start the React application:
bash
Copy
Edit
npm start
🖥️ API Endpoints
POST /auth/signup – User Signup
POST /auth/login – User Login
GET /blog/all – Get All Blogs
POST /blog/save – Create Blog
PUT /blog/update/{id} – Update Blog
DELETE /blog/delete/{id} – Delete Blog
🔒 Authentication
JWT tokens are used to secure routes and user actions.
Tokens are stored in localStorage and sent with every authenticated request.
🛑 How to Run
Start the Spring Boot server.
Start the React frontend.
Open the browser at http://localhost:3000.
