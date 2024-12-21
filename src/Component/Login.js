import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [id]: value };
      console.log(updatedFormData); // Log the updated form data
      return updatedFormData;
    });
  };

  // Validate form fields
  const validate = () => {
    let formErrors = {};
    const { email, password} = formData;

    if (!email) {
        formErrors.email = 'Please enter an email address.';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        formErrors.email = 'Please enter a valid email address.';
      }

    if (!password) {
      formErrors.password = 'Please enter a password.';
    } 

    return formErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
  
      if (user) {
        setSubmitted(true);
        localStorage.setItem('currentUser', JSON.stringify(user));  // Store the user data in localStorage
        navigate('/dashboard');  // Redirect to the dashboard

      } else {
        alert('Invalid email or password!');
        setSubmitted(false);
      }
    } else {
      setSubmitted(false);
    }
  };
  

  return (
    <>
    <Navbar/>
    <div className="container mt-5 pt-5">
        <div className="form-container">
          <h2 className="text-center mb-4">Sign In</h2>
          {submitted && (
            <div className="alert alert-success" role="alert">
              Login Successfully!
            </div>
          )}
          <form id="loginForm" noValidate onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              {/* Validation Error Message */}
              {errors.password && (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.password}
                </div>
              )}
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>

          {/* Login Page */}
          <div>
            <label>Don't have an account? <a href="/">Register Here</a></label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
