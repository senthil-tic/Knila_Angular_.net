Technologies Used
Angular: Frontend framework for building the application.
Bootstrap: For mobile-first responsive design.
JWT (JSON Web Tokens): For secure user authentication and authorization.
Nlogg/Serilog: For logging purposes in both the UI and API layers.
API: RESTful API endpoints for managing contacts.
Unit Testing: For API and component testing (using Jasmine/Karma).


Setup and Installation
To run the application locally, follow these steps:

1.Clone the repository:


git clone https://github.com/your-repo-name/contacts-management-app.git
cd contacts-management-app

2.Install dependencies: Make sure Node.js and npm are installed on your system. Then run:

    npm install
3.Run the application:
     ng serve
    
This will start the Angular development server, and you can access the app at http://localhost:4200.

JWT Authorization :

This application uses JWT Token Authorization to protect API endpoints. The frontend sends a JWT token as part of the Authorization header in each API request.

JWT Token Flow:
1.User logs in by providing valid credentials.
2.The backend responds with a JWT token.
3.The frontend stores the token in localStorage.
4.The token is included in subsequent API requests in the Authorization header as Bearer <token>.

Logger Integration
Logging is handled using either Nlogg or Serilog. Logs are captured for debugging purposes and to monitor both the client-side UI and the server-side API.

     For the API: Logs are written to a file or a logging service.
     For the UI: Logs are shown in the browser's console for development and troubleshooting.


     Usage
Once the application is up and running, here's how you can interact with it:

1.View Contacts: The home page displays a list of contacts in a table. You can sort the table by clicking on the header of any column.
2.Add New Contact: Click the "Add Contact" button to open a modal where you can input the contact's information (name, address, phone, email).
3.Edit Existing Contact: Click on any contact row, and the "Edit" button will allow you to modify the contact's details.
4.Delete Contact: Use the "Delete" button to remove a contact from the list.
After performing any operation, the application will automatically refresh and highlight the newly added/edited contact in the list.

Contributing
If you'd like to contribute to this project, follow these steps:

1.Fork the repository
2.Create a feature branch
3.Commit your changes
4.Open a pull request
Please ensure that all code follows the project's coding conventions, and write unit tests for new features.