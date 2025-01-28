

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




### **POST  /captains/register**

Registers a new captain.

#### Request Body

- `fullName` (object, required)
    - `firstName` (string, required): The first name of the captain. Must be at least 3 characters long.
    - `lastName` (string, optional): The last name of the captain. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain's account. Must be at least 8 characters long.
- `vehichle` (object, required)
    - `color` (string, required): The color of the vehicle. Must be at least 3 characters long.
    - `plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
    - `capacity` (number, required): The capacity of the vehicle. Must be at least 1.
    - `vehichleType` (string, required): The type of the vehicle. Must be one of "car", "auto", or "motorcycle".

#### Responses

- `201 Created`: Successfully registered the captain.
    - `token` (string): The authentication token for the captain.
    - `captain` (object): The registered captain's details.
- `400 Bad Request`: Validation error or captain already exists.
    - `errors` (array): List of validation errors.
    - `message` (string): Error message indicating the captain already exists.


    ### **GET /captains/profile**

    This endpoint allows captains to retrieve their profile information.

    ---

    ### **Request**

    #### **Endpoint**
    `GET /captains/profile`

    #### **Headers**
    | Header          | Value             |
    |-----------------|-------------------|
    | `Authorization` | `Bearer <token>`  |

    ---

    ### **Response**

    #### **Success Response**
    | HTTP Status | Description                        |
    |-------------|------------------------------------|
    | `200 OK`    | Captain profile retrieved successfully.|

    #### **Response Body**
    | Field                  | Type   | Description                                    |
    |------------------------|--------|------------------------------------------------|
    | `captain`              | Object | Captain object containing captain details.     |
    | `captain._id`          | String | The captain's unique ID.                       |
    | `captain.fullName`     | Object | The captain's full name.                       |
    | `captain.fullName.firstName` | String | The captain's first name.                  |
    | `captain.fullName.lastName`  | String | The captain's last name.                   |
    | `captain.email`        | String | The captain's email address.                   |
    | `captain.vehichle`     | Object | The captain's vehicle details.                 |
    | `captain.vehichle.color` | String | The color of the vehicle.                   |
    | `captain.vehichle.plate` | String | The plate number of the vehicle.            |
    | `captain.vehichle.capacity` | Number | The capacity of the vehicle.              |
    | `captain.vehichle.vehichleType` | String | The type of the vehicle.                |

    #### **Success Response Example**
    ```json
    {
        "captain": {
            "_id": "captain_id",
            "fullName": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "email": "john.doe@example.com",
            "vehichle": {
                "color": "Red",
                "plate": "XYZ123",
                "capacity": 4,
                "vehichleType": "car"
            }
        }
    }
    ```

    ---

    ### **Usage**

    To retrieve a captain's profile, send a `GET` request to `/captains/profile` with the required authorization header.

    ---

    ### **GET /captains/logout**

    This endpoint allows captains to log out by clearing the authentication token.

    ---

    ### **Request**

    #### **Endpoint**
    `GET /captains/logout`

    #### **Headers**
    | Header          | Value             |
    |-----------------|-------------------|
    | `Authorization` | `Bearer <token>`  |

    ---

    ### **Response**

    #### **Success Response**
    | HTTP Status | Description                |
    |-------------|----------------------------|
    | `200 OK`    | Captain successfully logged out.|

    #### **Response Body**
    | Field      | Type   | Description                        |
    |------------|--------|------------------------------------|
    | `message`  | String | Confirmation message.              |

    #### **Success Response Example**
    ```json
    {
        "message": "Logout successfully"
    }
    ```

    ---

    ### **Usage**

    To log out a captain, send a `GET` request to `/captains/logout` with the required authorization header.

