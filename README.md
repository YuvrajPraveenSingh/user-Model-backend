# User Model Backend - README

This is the backend component for a MERN (MongoDB, Express.js, React.js, Node.js) stack application to manage videos and users. The backend handles authentication, video management, and user-related operations.

## Prerequisites

Before running the backend server, ensure you have the following installed on your machine:

- Node.js (version 14 or higher)
- MongoDB (running locally or accessible remotely)
- Cloudinary account (for image and video storage)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/YuvrajPraveenSingh/user-Model-backend
    ```

2. Navigate to the project directory:

    ```bash
    cd User-Model-backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```
    

4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following environment variables to the `.env` file:


    ```plaintext
    PORT=3000
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    ```

## Usage

To start the backend server, run the following command:

```bash
npm start
```
The server will start listening on the specified port (default is 3000). You can now make API requests to the endpoints provided by the backend.
API Endpoints

    POST <localhost:port>/api/v1/users/register: Register a new user.
    POST  <localhost:port>/api/v1/users/login: Login an existing user.
    GET  <localhost:port>/api/v1/videos/allvideo: Retrieve all videos.
    GET <localhost:port>/api/v1/videos/:id: Retrieve a specific video by ID.
    POST <localhost:port>/api/v1/videos/upload: Upload a new video.
    PUT <localhost:port>/api/v1/videos/id: Update an existing video.
    DELETE <localhost:port>/api/v1/videos/:id: Delete a video.

Dependencies

    bcrypt: Password hashing and encryption.

    cloudinary: Cloud storage for uploading images and videos.

    cookie-parser: Parse cookies in the HTTP request.

    cors: Enable CORS (Cross-Origin Resource Sharing) middleware.

    dotenv: Load environment variables from a .env file.

    express: Web application framework for Node.js.

    jsonwebtoken: Generate and verify JSON Web Tokens (JWT) for user authentication.

    mongoose: MongoDB object modeling for Node.js.

    mongoose-aggregate-paginate-v2: Paginate mongoose models using aggregation.

    multer: Middleware for handling multipart/form-data, used for file uploads.

Development Dependencies

    nodemon: Monitor for changes and automatically restart the server.

    prettier: Code formatter for consistent code style.

License

This project is licensed under the ISC License. See the LICENSE file for details.
Author : Yuvraj Singh

Feel free to modify and extend this backend according to your project requirements. 

Happy coding!!!


