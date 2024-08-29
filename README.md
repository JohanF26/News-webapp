# News Management Web App
News management webapp with user authentication, allowing users to view news articles and administrators to manage (add, edit, delete) news items. The application is structured following Angular best practices, with separate components, services, and models. The backend provides API endpoints for user management and article operations, with authentication middleware to secure certain routes.

1. Frontend (Client):

  Built with Angular, a popular TypeScript-based web application framework
  Uses Bootstrap for styling (as seen in the index.html file)
  Includes components for:
  User authentication (login and registration)
  News management (adding, editing, and displaying news items)
  Shared components (header, footer, alerts)
  Implements routing for navigation between different views
  Uses services for handling API requests and state management
  Includes custom pipes for searching and date formatting
  
2.Backend (Server):

  Built with Node.js and Express.js
  Connects to a MongoDB database (likely using Mongoose for object modeling)
  Implements RESTful API routes for users and articles
  Uses JSON Web Tokens (JWT) for authentication
  Includes middleware for verifying JWTs

3. Key Technologies:

  Angular (Frontend framework)
  TypeScript (Programming language for the frontend)
  Node.js (Backend runtime)
  Express.js (Backend web application framework)
  MongoDB (Database)
  Bootstrap (CSS framework)
  JSON Web Tokens (Authentication)
  Karma (Test runner for JavaScript)
  Protractor (End-to-end testing framework)
