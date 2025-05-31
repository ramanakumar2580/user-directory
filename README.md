User Directory - GraphQL + Angular Assignment

A full-stack assignment project built using FastAPI + GraphQL on the backend and Angular (v15+) on the frontend.

Step 1: Clone the Repository

git clone https://github.com/ramanakumar2580/user-directory.git
cd user-directory

Step 2: Run the Backend

1. Navigate to the backend folder

cd backend

2. Create and activate virtual environment

python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

3. Install backend dependencies

pip install -r requirements.txt

4. Start the FastAPI server

uvicorn main:app --reload

5. Open the GraphQL Playground

http://localhost:8000/graphql

Step 3: Run the Frontend

1. Navigate to the frontend folder

cd ../frontend

2. Install frontend dependencies

npm install

3. Start the Angular development server

ng serve

4. Open the application

http://localhost:4200

Features

Display all users in a table

Add new users using a form

Edit existing users

GraphQL queries and mutations using Apollo Client

Sample GraphQL Operations

Query: Get All Users

query {
  getAllUsers {
    id
    name
    email
    role
  }
}

Mutation: Add a New User

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

