import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    const { name, email, gender, password, confirmPassword } = formData;

    if (!name) formErrors.name = 'Please enter Name.';
    if (!email) {
      formErrors.email = 'Please enter an email address.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Please enter a valid email address.';
    }
    if (!gender) formErrors.gender = 'Please select your gender.';

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      formErrors.password = 'Please enter a password.';
    } else if (!passwordRegex.test(password)) {
      formErrors.password =
        'Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.';
    }

    if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Password must match.';
    }

    return formErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      //console.log('Sign Up Successfully:', formData);

    // Save data to local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    // Show alert for successful sign-up
    alert('Sign Up Successfully!');

    // Navigate to sign-in page
    navigate('/login');

    } else {
      setSubmitted(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="container pt-5">
        <div className="form-container">
          <h2 className="text-center mb-4">Create an Account</h2>
          {submitted && (
            <div className="alert alert-success" role="alert">
              Sign Up Successfully!
            </div>
          )}
          <form id="signupForm" noValidate onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

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

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                id="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
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

            {/* Confirm Password */}
            <div className="mb-3 position-relative">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              {/* Validation Error Message */}
              {errors.confirmPassword && (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.confirmPassword}</div>
              )}
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>

          {/* Login Page */}
          <div>
            <label>Already have an account <a href='/login'>Login</a></label>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;

