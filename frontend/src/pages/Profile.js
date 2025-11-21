import React, { useState } from "react";


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Green Street, Ranchi, Jharkhand"
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="avatar"
            className="profile-avatar"
          />

          <h2>My Profile</h2>
          <p className="subtitle">Manage your personal information</p>
        </div>

        {/* Form */}
        <div className="profile-body">

          <div className="input-group">
            <label>Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="input-group">
            <label>Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="profile-actions">
            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <button
                className="save-btn"
                onClick={() => setIsEditing(false)}
              >
                Save Changes
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
