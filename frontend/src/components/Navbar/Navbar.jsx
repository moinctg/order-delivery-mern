
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from './../../assets/assets';
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from './../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the toggle

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className='navbar navbar-expand-lg'>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='logo' />
      </Link>
      
      {/* Navbar Toggle Button */}
      <button 
        className="navbar-toggler" 
        type="button" 
        onClick={toggleMenu}
        aria-controls="navbarSupportedContent" 
        aria-expanded={isMenuOpen} 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Navbar Menu */}
      <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
        <ul className="navbar-menu navbar-nav mr-auto p-5 d-flex justify-content-right">
          <li className="nav-item">
            <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to='/menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</Link>
          </li>
          <li className="nav-item">
            <Link to='/about' onClick={() => setMenu('about')} className={menu === 'about' ? 'active' : ''}>About</Link>
          </li>
          <li className="nav-item">
            <Link to='/app' onClick={() => setMenu('app')} className={menu === 'app' ? 'active' : ''}>Mobile App</Link>
          </li>
          <li className="nav-item">
            <Link to='/contact' onClick={() => setMenu('contact')} className={menu === 'contact' ? 'active' : ''}>Contact Us</Link>
          </li>
          <li className="nav-item">
            <Link to='/feedback' onClick={() => setMenu('feedback')} className={menu === 'feedback' ? 'active' : ''}>Feedback</Link>
          </li>
        </ul>

        <div className="navbar-right d-flex align-items-center">
          <img src={assets.search_icon} alt="Search" />
          <div className="navbar-search-icon">
            <Link to='/cart'>
              <img src={assets.basket_icon} alt="Cart" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)} className="btn btn-outline-primary ml-2">Sign In</button>
          ) : (
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
















// import React, { useContext, useState } from 'react'
// import './Navbar.css'
// import { assets } from './../../assets/assets';
// import {Link, useNavigate} from 'react-router-dom'
// import { StoreContext } from './../context/StoreContext';

// const Navbar = ({setShowLogin}) => {

//   const [menu, setMenu] = useState('home');

//   const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

//   const navigate = useNavigate();

//   const logout = () =>{
//     localStorage.removeItem("token");
//     setToken("");
//     navigate("/")
//   }

//   return (
//     <div className='navbar'>
//        <Link to='/'> <img src={assets.logo} alt="" className='logo' /></Link>
//         <ul className="navbar-menu">
//             <Link to='/' onClick={()=> setMenu('home')} className={menu === 'home'?'active':''}>Home</Link>
//             <Link to ='/menu' onClick={()=> setMenu('menu')} className={menu === 'menu'?'active':''}>Menu</Link>
//             <Link to='/about' onClick={()=> setMenu('about')} className={menu === 'about'?'active':''}>About </Link>
//             <Link to ='/app' onClick={()=> setMenu('app')} className={menu === 'app'?'active':''}>Mobile-app </Link>
//             <Link to ='/contact' onClick={()=> setMenu('contac')} className={menu === 'contact'?'active':''}>Contact us</Link>
//             <Link to ='/feedback' onClick={()=> setMenu('feedback')} className={menu === 'feedback'?'active':''}>Feeback</Link>
//         </ul>
//         <div className="navbar-right">
//             <img src={assets.search_icon} alt="" />
//             <div className="navbar-search-icon">
//                 <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
//                 <div className={getTotalCartAmount()===0?'':'dot'}></div>
//             </div>
//             {!token?<button onClick={()=> setShowLogin(true)}>sign in</button>
//             :<div className='navbar-profile'>
//               <img src={assets.profile_icon} alt="" />
//               <ul className="nav-profile-dropdown">
//                 <li onClick={()=> navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
//                 <hr />  
//                 <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
//               </ul>
//             </div>
//             }
//               </div>
//     </div>
//   )
// }

// export default Navbar