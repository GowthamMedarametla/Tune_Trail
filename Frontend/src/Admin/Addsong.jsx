import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Asidebar from './Asidebar';

function Addsong() {
  const [formData, setFormData] = useState({
    description: '',
    title: '',
    singer: '',
    genre: '',
    image: ''
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    if (e.target.name === 'songUrl') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      formDataToSend.append('genre', formData.genre);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('singer', formData.singer);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('songUrl', formData.songUrl);

      const response = await axios.post('http://localhost:7000/addsong', formDataToSend);
      console.log(response.data);

      alert('Song added successfully');
      navigate('/mysongs');
    } catch (error) {
      console.error('Error adding song: ', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Sidebar */}
      <Asidebar style={{ width: '250px', position: 'fixed', height: '100vh' }} />

      {/* Form Section */}
      <div
        style={{
          marginLeft: '70px',
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <div
          className="max-w-md p-4 border rounded shadow-lg"
          style={{
            backgroundColor: '',
            width: '100%',
            maxWidth: '400px',
            padding: '30px',
            borderRadius: '51px',
            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
            color: 'white'
          }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Add Song</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="singer"
                placeholder="Singer Name"
                value={formData.singer}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="genre"
                placeholder="Genre"
                value={formData.genre}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-white">Song file</label>
              <input
                type="file"
                name="songUrl"
                accept="/*"
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addsong;
