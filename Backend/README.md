

## **API Documentation**

### **POST /users/login**  

This endpoint allows users to log in by providing their email and password. Upon successful login, the server returns a JWT token and the user's details.

---

### **Request**

#### **Endpoint**  
`POST /users/login`

#### **Headers**  
| Header          | Value             |
|------------------|-------------------|
| `Content-Type`   | `application/json`|

#### **Body Parameters**  
| Parameter   | Type   | Required | Description                              |
|-------------|--------|----------|------------------------------------------|
| `email`     | String | Yes      | The user's email address. Must be valid. |
| `password`  | String | Yes      | The user's password. Minimum 8 characters.|

#### **Request Example**  
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

---

### **Response**

#### **Success Response**  
| HTTP Status | Description                |
|-------------|----------------------------|
| `200 OK`    | User successfully logged in.|

#### **Response Body**  
| Field                  | Type   | Description                                    |
|------------------------|--------|------------------------------------------------|
| `token`                | String | JWT token for authenticated requests.          |
| `user`                 | Object | User object containing user details.           |
| `user._id`             | String | The user's unique ID.                          |
| `user.fullName`        | Object | The user's full name.                          |
| `user.fullName.firstName` | String | The user's first name.                       |
| `user.fullName.lastName`  | String | The user's last name.                        |
| `user.email`           | String | The user's email address.                      |

#### **Success Response Example**  
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

---

#### **Error Responses**

##### **Validation Error**  
Occurs when input parameters are invalid.  

**HTTP Status**: `400 Bad Request`  
**Response Body**:  
| Field      | Type     | Description                              |
|------------|----------|------------------------------------------|
| `errors`   | Array    | List of validation error objects.        |
| `errors.msg` | String | Error message.                          |
| `errors.param` | String | Parameter that caused the error.        |
| `errors.location` | String | Location of the parameter (e.g., `body`). |

**Example Validation Error Response**:  
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
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

##### **Invalid Credentials Error**  
Occurs when the provided email or password is incorrect.  

**HTTP Status**: `401 Unauthorized`  
**Response Body**:  
| Field       | Type   | Description                        |
|-------------|--------|------------------------------------|
| `message`   | String | Error message for invalid login.   |

**Example Invalid Credentials Response**:  
```json
{
    "message": "Invalid email or password"
}
```

---

### **Usage**

To log in a user, send a `POST` request to `/users/login` with the required body parameters. Use the returned token to authenticate future requests.

--- 

### **GET /users/logout**

This endpoint allows users to log out by clearing the authentication token.

---

### **Request**

#### **Endpoint**
`GET /users/logout`

#### **Headers**
| Header          | Value             |
|-----------------|-------------------|
| `Authorization` | `Bearer <token>`  |

---

### **Response**

#### **Success Response**
| HTTP Status | Description                |
|-------------|----------------------------|
| `200 OK`    | User successfully logged out.|

#### **Response Body**
| Field      | Type   | Description                        |
|------------|--------|------------------------------------|
| `message`  | String | Confirmation message.              |

#### **Success Response Example**
```json
{
    "message": "Logged out successfully"
}
```

---

### **Usage**

To log out a user, send a `GET` request to `/users/logout` with the required authorization header.

---

### **GET /users/profile**

This endpoint allows users to retrieve their profile information.

---

### **Request**

#### **Endpoint**
`GET /users/profile`

#### **Headers**
| Header          | Value             |
|-----------------|-------------------|
| `Authorization` | `Bearer <token>`  |

---

### **Response**

#### **Success Response**
| HTTP Status | Description                |
|-------------|----------------------------|
| `200 OK`    | User profile retrieved successfully.|

#### **Response Body**
| Field                  | Type   | Description                                    |
|------------------------|--------|------------------------------------------------|
| `user`                 | Object | User object containing user details.           |
| `user._id`             | String | The user's unique ID.                          |
| `user.fullName`        | Object | The user's full name.                          |
| `user.fullName.firstName` | String | The user's first name.                       |
| `user.fullName.lastName`  | String | The user's last name.                        |
| `user.email`           | String | The user's email address.                      |

#### **Success Response Example**
```json
{
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

---

### **Usage**

To retrieve a user's profile, send a `GET` request to `/users/profile` with the required authorization header.
