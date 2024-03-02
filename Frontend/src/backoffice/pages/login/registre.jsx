import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
const Registre = () => {
   
    const [activeTab, setActiveTab] = useState('sign-in');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    return (
        <div className="container1" id="container1">
            <div className="form-container1 sign-in1">
            <form>
          <h1>Create Account</h1>
          <div className="social-icons1">
            <a href="#" className="icon">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
            </div>
            <div className="toggle-container1">
                <div className="toggle1">
                    <div className={`toggle-panel1 toggle-left1 ${activeTab === 'sign-in' ? 'active' : ''}`}>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className="hidden" id="login" onClick={() => handleTabChange('sign-in')}>Sign In</button>
                    </div>
                    <div className={`toggle-panel1 toggle-right1 ${activeTab === 'sign-up' ? 'active' : ''}`}>
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registre;
