
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../User/Sidebar';
import { Button, Table} from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa';

function Wishlist() {
  const [items, setItems] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.log('ERROR: User not found');
      return;
    }

    // Fetch all items
    axios
      .get(`http://localhost:7000/wishlist/${user.id}`)
      .then((response) => {
        const taskData = response.data;
        setItems(taskData);
      })
      .catch((error) => {
        console.error('Error fetching tasks: ', error);
      });

   
    // Function to handle audio play
    const handleAudioPlay = (itemId, audioElement) => {
      if (currentlyPlaying && currentlyPlaying !== audioElement) {
        currentlyPlaying.pause(); // Pause the currently playing audio
      }
      setCurrentlyPlaying(audioElement); // Update the currently playing audio
     
    };

    // Event listener to handle audio play
    const handlePlay = (itemId, audioElement) => {
      audioElement.addEventListener('play', () => {
        handleAudioPlay(itemId, audioElement);
      });
    };

    // Add event listeners for each audio element
    items.forEach((item) => {
      const audioElement = document.getElementById(`audio-${item._id}`);
      if (audioElement) {
        handlePlay(item._id, audioElement);
      }
    });

    // Cleanup event listeners
    return () => {
      items.forEach((item) => {
        const audioElement = document.getElementById(`audio-${item._id}`);
        if (audioElement) {
          audioElement.removeEventListener('play', () => handleAudioPlay(item._id, audioElement));
        }
      });
    };
  }, [items, currentlyPlaying,]);


  const removeFromWishlist = async (itemId) => {   
    try {
      // Remove item from the wishlist
      await axios.post(`http://localhost:7000/wishlist/remove`, { itemId });

      // Refresh the wishlist items
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const response = await axios.get(`http://localhost:7000/wishlist/${user.id}`);
        setItems(response.data);
      } else {
        console.log('ERROR: User not found');
      }
    } catch (error) {
      console.error('Error removing item from wishlist: ', error);
    }
  };



  return (
    <div style={{
      backgroundImage: 'url("/bg.jpg")', // Change to your actual image name
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      color: 'white', // Ensures text is visible
    }}>
        <Sidebar/>
     <div style={{marginLeft:"200px"}}>
     <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Favorites</h2>
       
        <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Genre</th>
                <th></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div style={{ display: 'flex' }}>
                      <img
                        src={item.image}
                        alt="Item Image"
                        className="rounded"
                        style={{ height: '50px', width: '50px' }}
                      />
                      <div style={{ paddingLeft: '20px' }}>
                        <strong> {item.title}</strong>
                        <p><td>{item.singer}</td></p>
                      </div>
                    </div>
                  </td>
                  <td>{item.genre}</td>
                  <td>
                    <Button
                      style={{ backgroundColor: 'white', border: 'none' }}
                      onClick={() => removeFromWishlist(item.itemId, item.songUrl)}
                    >
                      <FaHeart color="red" />
                    </Button>
                  </td>
                  <td>
                  <audio controls id={`audio-${item._id}`} style={{ width: '250px' }}>
                  <source src={`http://localhost:7000/${item.songUrl}`} />
                </audio>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      </div>
     </div>
    
    </div>

  );
}

export default Wishlist;




