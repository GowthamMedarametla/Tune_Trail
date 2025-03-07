import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    setShowDropdown(false);

    if (selectedValue === 'user') {
      navigate('/login');
    } else if (selectedValue === 'admin') {
      navigate('/alogin');
    }
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div 
  style={{ 
    backgroundImage: "url('/bghome.jpg')", // Change '/bg.jpg' to your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh"
  }}
>

      <div style={{ position: "relative", top: "27%", color: "white", display: "flex", justifyContent: "center" }}>
        <div>
        <img
  src="/logo.jpg" 
  style={{ width: "160px", height: "160px", borderRadius: "50%",opacity:0.9 }} 
  alt="Profile"
/>

          <h2
            style={{
              paddingLeft: "37px",
              paddingTop: "10px",
              color: "white",
              cursor: "pointer",
              borderBottom: showDropdown ? "1px solid white" : "none",
            }}
            onClick={handleLoginClick}
          >
            Signin
          </h2>
          {showDropdown && (
            <select
              ref={dropdownRef}
              onChange={handleSelectionChange}
              style={{
                marginTop: "10px",
                padding: "10px",
                width: "130px",
                borderRadius: "5px",
                backgroundColor: "white",
                color: "black",
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
                <option style={{display:"none"}}>User</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
