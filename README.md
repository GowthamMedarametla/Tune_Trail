# Tune Trail - A MERN Stack Music Streaming Application



## Overview
Tune Trail is a feature-rich music streaming application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to upload, stream, and manage their favorite songs seamlessly. The platform is designed for a smooth user experience with an intuitive UI and powerful features.

## Features
- **User Authentication**: Secure sign-up and login with JWT authentication.
- **Music Upload & Streaming**: Users can upload songs and stream them without restrictions on file size or format.
- **Genre Tagging**: Automatically categorize songs based on genres.
- **Thumbnail Generation**: Manually upload custom thumbnails.
- **Playlist Creation**: Users can create, edit, and delete their playlists.
- **Volume & Progress Control**: Easily adjust volume and track progress.

## Tech Stack
- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Clone the Repository
```sh
git clone https://github.com/GowthamMedarametla/Tune_Trail-MERN.git
cd Tune_Trail-MERN
```

### Install Dependencies
#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd ../frontend
npm install
```

### Environment Variables
Create a `.env` file in the backend and frontend directories with the required configuration.
```sh
MONGO_URI=YOUR_MONGODB_URL
```
You can get it from the mongodb atlas portal

### Run the Application
#### Backend
```sh
cd backend
npm start
```

#### Frontend
```sh
cd frontend
npm run dev
```

## Deployment
You can deploy the backend on **Render** and the frontend on **Vercel**.

## Contributing
Feel free to contribute to Tune Trail! Fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.

## Contact
For queries or suggestions, reach out via GitHub Issues.

Happy Streaming! 🎶

