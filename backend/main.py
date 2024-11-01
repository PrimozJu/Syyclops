from typing import Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from users import get_users

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Getting users at initialization, so we can modify them in memory later
# in real case we'd use the db, easiest solution would be SQLITE
users = get_users()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def read_users():
    return {"users": users}

@app.put("/user/{user_id}")
def update_user(user_id: int, user: Dict[str, Any]):
    for i in range(len(users)):
        if users[i]["id"] == user_id:
            users[i].update(user)
            return users[i]
    raise HTTPException(status_code=404, detail="User not found")

@app.delete("/user/{user_id}")
def delete_user(user_id: int):
    for i in range(len(users)):
        if users[i]["id"] == user_id:
            return users.pop(i)
    raise HTTPException(status_code=404, detail="User not found")