import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import { FaHome, FaHeart, FaSearch, FaMusic, FaLine, FaPlayCircle, FaList, FaSignOutAlt, FaSignInAlt, FaSign } from 'react-icons/fa';
import './sidebar.css'

const Sidebar = () => {
            const get=localStorage.getItem('user')
  return (
    <nav className="sidebar">
      <ul className="list-unstyled">
        <strong style={{display:"flex",justifyContent:"center",fontSize:"35px"}}>Tune Trail</strong>
        <strong style={{display:"flex",justifyContent:"center",fontSize:"13px"}}>Your Pathway To Perfect Playlist</strong>
        <h5 style={{color:"red",paddingTop:"0px"}} className='text-center'>({JSON.parse(get).name} )</h5>
       <div style={{marginTop:"35px"}}>
       <li>
          <Link to="/songs">
          <p style={{paddingLeft:"10px"}}> <FaHome /> </p> <p style={{paddingLeft:"10px"}}>Home</p>
          </Link>
        </li>
        </div>
       <div>
        <li>
          <Link to="/favorites">
          <p style={{paddingLeft:"10px"}}> <FaHeart /> </p> <p style={{paddingLeft:"10px"}}>Favorites</p>
          </Link>
        </li>
        <li>
          <Link to="/playlist">
           <p style={{paddingLeft:"10px"}}> <FaList /> </p> <p style={{paddingLeft:"10px"}}>PlayList</p>
          </Link>
        </li>
        <li>
          <Link to="/">
           <p style={{paddingRight:"10px", transform: "scaleX(-1)"}}> <FaSignOutAlt /> </p> <p style={{paddingLeft:"10px"}}>Signout</p>
          </Link>
        </li>
        </div>

      </ul>
    </nav>
  );
};

export default Sidebar;
