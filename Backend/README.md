# User Registration

Register a new user in the system.

## Endpoint

```
POST /users/register
```

## Request Body

| Field | Type | Description |
|-------|------|-------------|
| firstName | String | User's first name - Minimum 3 characters |
| lastName | String | User's last name - Minimum 3 characters |
| email | String | User's email address - Valid email format |
| password | String | User's password - Minimum 8 characters |

### Example Request Body
```json
{
  "fullName": {
    "firstName": "test1",
    "lastName": "test2"
  },
  "email": "test@gmail.com",
  "password": "password123"
}
```

## Response

### Success Response (201 Created)

Returns a JWT token and the created user object.

| Field | Type | Description |
|-------|------|-------------|
| token | String | JWT authentication token |
| user | Object | Created user details |
| user.fullName | Object | User's full name containing firstName and lastName |
| user._id | String | Unique identifier for the user |
| user.email | String | User's email address |

### Example Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxMTlhNjA5OGRiNzUzYzM2ZjE4OWEiLCJpYXQiOjE3MzQ0MTY4MDZ9.TG-uM_bGubKZ6H3-mNTXKbDWhiXJt_X3E4oxZjOXe8w",
  "user": {
    "fullName": {
      "firstName": "test1",
      "lastName": "test2"
    },
    "email": "test@gmail.com",
    "_id": "676119a6098db753c36f189a",
    "__v": 0
  }
}
```

# User Login

Authenticate an existing user in the system.

## Endpoint

```
POST /users/login
```

## Request Body

| Field | Type | Description |
|-------|------|-------------|
| email | String | User's email address - Valid email format |
| password | String | User's password - Minimum 8 characters |

### Example Request Body
```json
{
  "email": "test@gmail.com",
  "password": "password123"
}
```

## Response

### Success Response (200 OK)

Returns a JWT token and the user object.

| Field | Type | Description |
|-------|------|-------------|
| token | String | JWT authentication token |
| user | Object | User details |
| user.fullName | Object | User's full name containing firstName and lastName |
| user._id | String | Unique identifier for the user |
| user.email | String | User's email address |

### Example Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "fullName": {
      "firstName": "test1",
      "lastName": "test2"
    },
    "email": "test@gmail.com",
    "_id": "676119a6098db753c36f189a",
    "__v": 0
  }
}
```

### Error Response (401 Unauthorized)

Returns when credentials are invalid or user is not found.

```json
{
  "message": "Invalid email or password"
}
```

# User Logout

### Description
Logs out the currently authenticated user and invalidates their JWT token.

### Endpoint
`GET /users/logout`

### Authentication

Requires a valid JWT token in the Authorization header.

# Captain Registration

Register a new captain in the system.

## Endpoint

```
POST /captains/register
```

## Request Body

| Field | Type | Description |
|-------|------|-------------|
| fullName.firstName | String | Captain's first name - Minimum 3 characters |
| fullName.lastName | String | Captain's last name - Minimum 3 characters |
| email | String | Captain's email address - Valid email format |
| password | String | Captain's password - Minimum 8 characters |
| vehicle.color | String | Vehicle color - Minimum 3 characters |
| vehicle.plateNumber | String | Vehicle plate number - Minimum 3 characters |
| vehicle.capacity | Number | Vehicle passenger capacity - Minimum 1 |
| vehicle.vehicleType | String | Type of vehicle - Must be 'car', 'bike', or 'auto' |

### Example Request Body
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "black",
    "plateNumber": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Response

### Success Response (201 Created)

Returns a JWT token and the created captain object.

| Field | Type | Description |
|-------|------|-------------|
| token | String | JWT authentication token |
| captain | Object | Created captain details |
| captain.fullName | Object | Captain's full name containing firstName and lastName |
| captain._id | String | Unique identifier for the captain |
| captain.email | String | Captain's email address |
| captain.vehicle | Object | Captain's vehicle details |

### Example Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plateNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "676119a6098db753c36f189a",
    "__v": 0
  }
}
```

# Captain Login

Authenticate an existing captain in the system.

## Endpoint

```
POST /captains/login
```

## Request Body

| Field | Type | Description |
|-------|------|-------------|
| email | String | Captain's email address - Valid email format |
| password | String | Captain's password - Minimum 8 characters |

### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response

### Success Response (200 OK)

Returns a JWT token and the captain object.

| Field | Type | Description |
|-------|------|-------------|
| token | String | JWT authentication token |
| captain | Object | Captain details |

### Example Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plateNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "676119a6098db753c36f189a",
    "__v": 0
  }
}
```

# Captain Profile

Get the profile information of the authenticated captain.

## Endpoint

```
GET /captains/profile
```

## Authentication

Requires a valid JWT token in the Authorization header.

## Response

### Success Response (200 OK)

Returns the captain object.

```json
{
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plateNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "676119a6098db753c36f189a",
    "__v": 0
  }
}
```

# Captain Logout

Logs out the currently authenticated captain and invalidates their JWT token.

## Endpoint

```
GET /captains/logout
```

## Authentication

Requires a valid JWT token in the Authorization header.

## Response

### Success Response (200 OK)

```json
{
  "message": "Logged out successfully"
}
```





