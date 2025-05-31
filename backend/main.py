from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
import strawberry
from typing import List, Optional
import re

#In-memory data store
users = []
next_id = 1

#Helpers
def validate_email_format(email: str):
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        raise HTTPException(status_code=400, detail="Invalid email format")

def email_exists(email: str, exclude_index: Optional[int] = None) -> bool:
    return any(
        u["email"].lower() == email.lower() and i != exclude_index
        for i, u in enumerate(users)
    )

def name_exists(name: str, exclude_index: Optional[int] = None) -> bool:
    return any(
        u["name"].lower() == name.lower() and i != exclude_index
        for i, u in enumerate(users)
    )

def get_user_index_by_id(user_id: int) -> Optional[int]:
    return next((i for i, u in enumerate(users) if u["id"] == user_id), None)

#GraphQL Types
@strawberry.type
class UserType:
    id: int
    name: str
    email: str
    role: str

# Query
@strawberry.type
class Query:
    @strawberry.field
    def get_all_users(self) -> List[UserType]:
        return [UserType(**u) for u in users]

    @strawberry.field
    def get_user(self, id: int) -> UserType:
        user = next((u for u in users if u["id"] == id), None)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return UserType(**user)

# Mutation 
@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_user(self, name: str, email: str, role: str) -> UserType:
        global next_id

        if not name or not email or not role:
            raise HTTPException(status_code=400, detail="All fields are required")

        validate_email_format(email)

        if email_exists(email):
            raise HTTPException(status_code=400, detail="Email already exists")

        if name_exists(name):
            raise HTTPException(status_code=400, detail="Name already exists")

        user = {"id": next_id, "name": name, "email": email, "role": role}
        users.append(user)
        next_id += 1
        return UserType(**user)

    @strawberry.mutation
    def update_user(
        self,
        id: int,
        name: Optional[str] = None,
        email: Optional[str] = None,
        role: Optional[str] = None,
    ) -> UserType:
        index = get_user_index_by_id(id)
        if index is None:
            raise HTTPException(status_code=404, detail="User not found")

        if email:
            validate_email_format(email)
            if email_exists(email, exclude_index=index):
                raise HTTPException(status_code=400, detail="Email already exists")

        if name:
            if name_exists(name, exclude_index=index):
                raise HTTPException(status_code=400, detail="Name already exists")

        if name:
            users[index]["name"] = name
        if email:
            users[index]["email"] = email
        if role:
            users[index]["role"] = role

        return UserType(**users[index])

    @strawberry.mutation
    def delete_user(self, id: int) -> bool:
        global users
        before = len(users)
        users = [u for u in users if u["id"] != id]
        return len(users) < before

# App Setup
schema = strawberry.Schema(query=Query, mutation=Mutation)
app = FastAPI()

# Root message for debugging
@app.get("/")
def root():
    return {"message": "Backend is running. Use /graphql for GraphQL API."}

# CORS middleware for Angular frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount GraphQL endpoint
app.include_router(GraphQLRouter(schema), prefix="/graphql")

# Development run
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
