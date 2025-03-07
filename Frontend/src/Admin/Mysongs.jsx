import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa';
import Asidebar from './Asidebar';

function Mysongs() {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.log('ERROR: User not found');
      return;
    }

    // Fetch all songs
    axios.get(`http://localhost:7000/mysongs`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching songs: ', error));

    // Fetch wishlist items
    axios.get(`http://localhost:7000/wishlist/${user.id}`)
      .then((response) => setWishlist(response.data));

    // Fetch playlist items
    axios.get(`http://localhost:7000/playlist/${user.id}`)
      .then((response) => setPlaylist(response.data));
  }, []);

  // Function to delete a song
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/deletesong/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Song deleted successfully!");
        axios.get(`http://localhost:7000/mysongs`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching songs: ', error))
        // Refresh or update state to remove the deleted song
      } else {
        alert("Failed to delete song");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const addToWishlist = async (itemId) => {
    try {
      const selectedItem = items.find((item) => item._id === itemId);
      if (!selectedItem) throw new Error('Selected item not found');

      const { title, image, genre, songUrl, singer, _id: itemId2 } = selectedItem;
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const userName = JSON.parse(localStorage.getItem('user')).name;

      await axios.post(`http://localhost:7000/wishlist/add`, { itemId: itemId2, title, image, userId, userName, songUrl, singer, genre });

      const response = await axios.get(`http://localhost:7000/wishlist/${userId}`);
      setWishlist(response.data);
    } catch (error) {
      console.error('Error adding item to wishlist: ', error);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await axios.post(`http://localhost:7000/wishlist/remove`, { itemId });

      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const response = await axios.get(`http://localhost:7000/wishlist/${user.id}`);
        setWishlist(response.data);
      } else {
        console.log('ERROR: User not found');
      }
    } catch (error) {
      console.error('Error removing item from wishlist: ', error);
    }
  };

  const isItemInWishlist = (itemId) => {
    return wishlist.some((item) => item.itemId === itemId);
  };

  const filteredItems = items.filter((item) => {
    const lowerCaseQuery = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(lowerCaseQuery) ||
      item.singer.toLowerCase().includes(lowerCaseQuery) ||
      item.genre.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div style={{ 
      backgroundImage: "url('/bg.jpg')", 
      backgroundSize: "cover", 
      backgroundPosition: "cover", 
      backgroundRepeat: "no-repeat", 
      width: "auto", 
      height: "auto", 
      minHeight: "100vh",
    }}>
    
      <Asidebar/>
      <div style={{ marginLeft: "200px" }}>
        <div className="container mx-auto p-8">
          <h2 className="text-3xl font-semibold mb-4 text-center">Songs List</h2>
          
          <InputGroup className="mb-3">
            <InputGroup.Text id="search-icon">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search by singer, genre, or song name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ outline: 'none', boxShadow: 'none', border: '1px solid #ced4da', borderRadius: '0.25rem' }}
              className="search-input"
            />
          </InputGroup>
          
          <br />
          <div style={{ width: '500px', display: 'grid', gridTemplateColumns: 'auto auto auto auto', gap: '30px' }}>
            {filteredItems.map((item) => (
              <div key={item._id} className="bg-white p-3 rounded shadow">
                <img
                  src={item.image}
                  alt="Item Image"
                  className="rounded-t-lg"
                  style={{ height: '150px', width: '250px' }}
                />
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className="text-l font-bold mb-auto">{item.title}</p>
                    
                    <div>
                      {/* Wishlist Button */}
                      {isItemInWishlist(item._id) ? (
                        <Button style={{ backgroundColor: 'white', border: 'none' }} onClick={() => removeFromWishlist(item._id)}>
                          
                        </Button>
                      ) : (
                        <Button style={{ backgroundColor: 'white', border: 'none' }} onClick={() => addToWishlist(item._id)}>
                          
                        </Button>
                      )}

                      {/* Delete Button */}
                      <Button
  style={{
    backgroundColor: "white",
    border: "none",
    marginLeft: "5px",
    cursor: "pointer",
    padding: "5px",
    borderRadius: "4px",
  }}
  aria-label="Delete song"
  onClick={() => handleDelete(item._id)}
>
  🗑️
</Button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-auto">Genre: {item.genre}</p>
                  <p className="text-blue-500 font-bold">Singer: {item.singer}</p>
                  <audio controls id={`audio-${item._id}`} style={{ width: '270px' }}>
                    <source src={`http://localhost:7000/${item.songUrl}`} />
                  </audio>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mysongs;
