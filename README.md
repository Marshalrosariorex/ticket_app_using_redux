# ticket_app_using_redux
A simple ticket CRUD app using react, redux

Ticket Management Application

This repository contains a simple Ticket Management Application built with React (frontend) and PHP (backend). The application allows users to create, update, and manage tickets.

### Installation
### Frontend (React)

    1. Clone the repository:
    2. Navigate to the React app directory
    3. Install the required NPM modules

### Backend (PHP)
Place the PHP code in the htdocs folder:

    Move the ticketApp/ directory to your local server's htdocs folder.
    Ensure your server (e.g., XAMPP, WAMP) is running.

Database Setup:

    Import the database file ticket_test.sql into your MySQL server.

### Running the Application
### Running the React Application

    1. Navigate to the React app directory: cd ticket_app
    2. Start the React development server: npm start

    3. Access the React application:
    Open your browser and go to http://localhost:3000.

### Running the PHP Backend

    Ensure your local server is running:
        Example: XAMPP or WAMP.

    Access the PHP backend:
        API endpoints can be accessed at http://localhost/API/ticketApp

### Project Dependencies
### Frontend (React)

    React
    Axios (for API requests)
    React Router (for routing)
    Redux (for state management)
    Redux-Persist (for persisting state)

### Backend (PHP)

    PHP (7.4 or later)
    MySQL (for database)

### API Endpoints

    GET /tickets: Fetch all tickets.
    POST /tickets: Create a new ticket.
    PATCH /tickets/:ticket_number: Update the status of a ticket.

