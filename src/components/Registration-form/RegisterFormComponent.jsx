import { useState } from 'react';
import "../Registration-form/RegisterFormComponent.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    profession: '',
    dateOfBirth: '',
    dateTime: '',
    startDate: '',
    endDate: '',
    isActive: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Registration Form</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-row">
            <div className="register-form-group">
              <label htmlFor="firstName" className="register-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="register-input"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="lastName" className="register-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="register-input"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="register-form-row">
            <div className="register-form-group">
              <label htmlFor="address" className="register-label">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="register-input"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="phoneNumber" className="register-label">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="register-input"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="register-form-row">
            <div className="register-form-group">
              <label htmlFor="emailAddress" className="register-label">Email Address</label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                className="register-input"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="profession" className="register-label">Profession</label>
              <input
                type="text"
                id="profession"
                name="profession"
                className="register-input"
                value={formData.profession}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="register-form-row">
            <div className="register-form-group">
              <label htmlFor="dateOfBirth" className="register-label">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="register-input"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="dateTime" className="register-label">Date Time</label>
              <input
                type="datetime-local"
                id="dateTime"
                name="dateTime"
                className="register-input"
                value={formData.dateTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="register-form-row">
            <div className="register-form-group">
              <label htmlFor="startDate" className="register-label">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="register-input"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="endDate" className="register-label">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="register-input"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="register-form-row">
            <div className="register-form-group register-radio-group">
              <label className="register-label">Is Active</label>
              <div className="register-radio-options">
                <label className="register-radio-label">
                  <input
                    type="radio"
                    name="isActive"
                    value="yes"
                    checked={formData.isActive === 'yes'}
                    onChange={handleChange}
                    required
                  />
                  Yes
                </label>
                <label className="register-radio-label">
                  <input
                    type="radio"
                    name="isActive"
                    value="no"
                    checked={formData.isActive === 'no'}
                    onChange={handleChange}
                    required
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="register-submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;