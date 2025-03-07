import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table,Card } from 'react-bootstrap';
import { FaTrash,FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Asidebar from './Asidebar';

const Users = () => {
  const [userbookings, setUserbookings] = useState([]);
  const [users, setUsers] = useState([]);

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

   useEffect(() => {
    axios.get(`http://localhost:7000/users`)
      .then((response) => {
        setUsers(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        // setError('Failed to fetch projects.');
        // setLoading(false);
      });
}, []);

const deleteData = (taskId) => {
    axios.delete(`http://localhost:7000/userdelete/${taskId}`);
    window.location.assign('/users');
    alert('User is deleted');
  };
  const deleteorder = (taskId) => {
    axios.delete(`http://localhost:7000/userorderdelete/${taskId}`);
    window.location.assign('/users');
    alert('deleted');
  };



 
  
  const fetchUserBikeData = (userId) => {
   
    axios.get(`http://localhost:7000/getorders/${userId}`)

    .then((response) => {
      setUserbookings(response.data);
      toggleDetails(); // Show Plan Details when data is fetched
    })
    .catch((error) => {
      console.error('Error fetching user bike data:', error);
    });
  };
  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);

    if (formattedDeliveryDate >= currentDate) {
      return "ontheway";
    } else {
      return "delivered";
    }
  };

  return (
    <div
  style={{
    backgroundImage: "url('/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  }}
>
  <Asidebar />
  <div style={{ marginLeft: "100px" }}>

    <h1 className='text-center'>Users</h1> <br />
    <div style={{display:"flex",justifyContent:"center"}}>
    <Table striped bordered hover variant="dark" style={{width:"70%"}}>
      <thead>
        <tr>
          <th>sl/no</th>
          <th>UserId</th>
          <th>User name</th>
          <th>Email</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
              
              <button onClick={() => deleteData(item._id)} style={{ border: 'none', color: 'red', background: 'none',paddingLeft:"20px" }}>
                <FaTrash />
              </button>{' '}
              {/* <Button onClick={() => fetchUserBikeData(item._id)} style={{ marginBottom: '12px' }}>
                view
              </Button> */}
              <div style={{ display: 'flex' }}>
                {showDetails && (
                  <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50" >
                    <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white p-4 rounded-lg z-10 relative" style={{ maxHeight: "80vh", overflowY: "scroll" }}>
                      {/* Rest of your content */}
                      
                      
                    </div>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  </div>
  </div>
  
  )
}

export default Users
