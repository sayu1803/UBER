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


## Endpoint
`POST /users/login`


/**
 * @api {post} /users/login User Login
 * @apiName LoginUser
 * @apiGroup User
 * 
 * @apiDescription This endpoint is used to log in an existing user. It requires the user's email and password.
 * 
 * @apiParam {String} email The user's email address. Must be a valid email format.
 * @apiParam {String} password The user's password. Must be at least 8 characters long.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "john.doe@example.com",
 *       "password": "password123"
 *     }
 * 
 * @apiSuccess {String} token JWT token for authenticated requests.
 * @apiSuccess {Object} user User object containing user details.
 * @apiSuccess {String} user._id The user's unique ID.
 * @apiSuccess {Object} user.fullName The user's full name.
 * @apiSuccess {String} user.fullName.firstName The user's first name.
 * @apiSuccess {String} user.fullName.lastName The user's last name.
 * @apiSuccess {String} user.email The user's email address.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "jwt_token",
 *       "user": {
 *         "_id": "user_id",
 *         "fullName": {
 *           "firstName": "John",
 *           "lastName": "Doe"
 *         },
 *         "email": "john.doe@example.com"
 *       }
 *     }
 * 
 * @apiError {Object[]} errors List of validation errors.
 * @apiError {String} errors.msg Error message.
 * @apiError {String} errors.param Parameter that caused the error.
 * @apiError {String} errors.location Location of the parameter.
 * 
 * @apiErrorExample {json} Validation Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "errors": [
 *         {
 *           "msg": "Invalid Email",
 *           "param": "email",
 *           "location": "body"
 *         },
 *         {
 *           "msg": "Password must be at least 8 characters",
 *           "param": "password",
 *           "location": "body"
 *         }
 *       ]
 *     }
 * 
 * @apiError {String} message Error message for invalid credentials.
 * 
 * @apiErrorExample {json} Invalid Credentials Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid email or password"
 *     }
 */