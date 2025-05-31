# User Directory - GraphQL + Angular Assignment
A full-stack assignment project built using FastAPI + GraphQL on the backend and Angular (v15+) on the frontend.
I Provided Documentation in the website.

Step 1: Clone the Repository
  1. git clone https://github.com/ramanakumar2580/user-directory.git
  2. cd user-directory

Step 2: Run the Backend

 1. Navigate to the backend folder
    - cd backend
 2. Create and activate virtual environment
    - python -m venv venv
    - source venv/bin/activate
    - Windows: venv\Scripts\activate

 3. Install backend dependencies
    - pip install -r requirements.txt

 4. Start the FastAPI server
    - uvicorn main:app --reload

 5. Open the GraphQL Playground
    - http://localhost:8000/graphql

Step 3: Run the Frontend

 1. Navigate to the frontend folder
    - cd ../frontend

 2. Install frontend dependencies
    - npm install

 3. Start the Angular development server
    - ng serve

 4. Open the application
    - http://localhost:4200

# Features

1. Display all users in a table
2. Add new users using a form
3. Edit existing users
4. GraphQL queries and mutations using Apollo Client
5. Sample GraphQL Operations

# Query: Get All Users

   query {
     getAllUsers {
        id
        name
        email
        role
         }
     }

# Mutation: Add a New User

   mutation {
    createUser(name: "Alice", email: "alice@example.com", role: "Admin") {
    user {
      id
      name
      email
      role
       }
     }
    }
# Screenshots
Add/Edit Form: screenshots/add-edit-form.png
User Table: screenshots/users-form.png
Backend: screenshots/users-backend.png
User Form: screenshots/user-delete.png

# Requirements

- Python 3.9+
- Node.js 16+
- Angular CLI (v15+)
- Ensure the FastAPI server runs on port 8000 and is accessible to the frontend.


