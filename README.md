## Overview
Welcome to the React to Python: A Task Management Adventure project! This is a task management application that I developed using Python and React. React to Python allows users to register, login, create tasks, and manage those tasks. This application is designed to showcase the integration of a Flask backend (Python) with a React frontend.

## Installation

Before starting the installation process, make sure you have Python and Node.js installed on your system.

1. Clone the repository: `git clone https://github.com/yourusername/taskmaster-python-react.git`
2. Navigate into the cloned project directory: `cd taskmaster-python-react`
3. Install Python dependencies:
   - If using venv: `python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`
   - If using pipenv: `pipenv install`
4. Navigate into the frontend directory: `cd pyreact-frontend`
5. Install JavaScript dependencies: `npm install`
6. Build the frontend: `npm run build`

## Usage

1. Start the backend server: 
   - If using venv: `source venv/bin/activate && python app.py`
   - If using pipenv: `pipenv run python app.py`
2. In a new terminal window, navigate into the frontend directory: `cd pyreact-frontend`
3. Start the frontend server: `npm start`

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Technologies Used
- Backend: Flask (Python), SQLAlchemy, Flask-JWT-Extended for authentication
- Frontend: React (JavaScript), Bootstrap for styling
- Database: SQLite

## Known Issues

There are a few known issues with the current version of the application:

- Cross Origin Resource Sharing (CORS) issues that prevent the user from registering, logging in, and updating the table.

These issues are on the agenda to be resolved in the next update.

## Future Development

In addition to fixing the known issues, the future development plans for this application include:

- Implementing additional features such as task categories, labels, and more granular control over task scheduling.
- Improving error handling and providing more user-friendly error messages.
- Implementing automated tests to ensure the reliability of the application as new features are added.
- Upgrading the UI for a better user experience.

Stay tuned for these exciting updates!
