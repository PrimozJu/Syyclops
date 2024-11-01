import pytest
from fastapi.testclient import TestClient
from main import app, users

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}

def test_read_users():
    response = client.get("/users")
    assert response.status_code == 200
    assert "users" in response.json()

def test_update_user():
    test_user = {"id": 1, "firstName": "John", "email": "john@example.com"}
    users.append(test_user)

    updated_user = {"id": 1, "firstName": "John Updated", "email": "john.updated@example.com"}
    response = client.put("/user/1", json=updated_user)
    assert response.status_code == 200
    assert response.json() == updated_user

    response = client.get("/users")
    assert response.status_code == 200
    assert any(user["firstName"] == "John Updated" for user in response.json()["users"])

def test_update_nonexistent_user():
    response = client.put("/user/999", json={"id": 999, "firstName": "Nonexistent", "email": "nonexistent@example.com"})
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}