# User Registration Endpoint Documentation

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. It requires the user's first name, last name (optional), email, and password.

## Request Body
The request body should be a JSON object with the following fields:

- `fullName`: An object containing:
    - `firstName` (string, required): The user's first name. Must be at least 3 characters long.
    - `lastName` (string, optional): The user's last name. If provided, must be at least 3 characters long.
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 8 characters long.

### Example
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `201 Created`
- **Body**:
    ```json
    {
        "token": "jwt_token",
        "user": {
            "_id": "user_id",
            "fullName": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "email": "john.doe@example.com"
        }
    }
    ```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Body**:
    ```json
    {
        "errors": [
            {
                "msg": "Invalid Email",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "First name must be at least 3 characters long",
                "param": "fullName.firstName",
                "location": "body"
            },
            {
                "msg": "Password must be at least 8 characters",
                "param": "password",
                "location": "body"
            }
        ]
    }
    ```

### Server Error
- **Status Code**: `500 Internal Server Error`
- **Body**:
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

## Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- The `token` returned in the response should be used for authenticated requests to other endpoints.
