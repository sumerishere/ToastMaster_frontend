import "../Admin-component/AdminComponent.css";
import { X } from 'lucide-react';
import { useState, useEffect } from "react";


const Admin = () => {

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showRoleAllocation, setShowRoleAllocation] = useState(false);
    const [showUpcomingMeetings, setShowUpcomingMeetings] = useState(false);
    
    const [meetingData, setMeetingData] = useState({
      theme: '',
      venue: '',
      dateTime: ''
    });
    
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [availableRoles, setAvailableRoles] = useState(['Organizer', 'Speaker', 'Moderator', 'Attendee']);
    const [members] = useState(['Alice', 'Bob', 'Charlie', 'David', 'Eva']);
  
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    
    useEffect(() => {
      if (showUpcomingMeetings) {
        fetchUpcomingMeetings();
      }
    }, [showUpcomingMeetings]);
  
    const fetchUpcomingMeetings = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/meeting');
        const data = await response.json();
        setUpcomingMeetings(data);
      } catch (error) {
        console.error('Error fetching upcoming meetings:', error);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setMeetingData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleCreateMeetingSubmit = (e) => {
      e.preventDefault();
      if (meetingData.theme && meetingData.venue && meetingData.dateTime) {
        setShowRoleAllocation(true);
      } else {
        alert("Please fill all fields in the create meeting form.");
      }
    };
  
    const handleRoleSubmit = () => {
      if (selectedRole && selectedMember) {
        //--- backend connectivity ---//  
        // Reset forms
        setMeetingData({ theme: '', venue: '', dateTime: '' });
        setSelectedRole('');
        setSelectedMember('');
        setAvailableRoles(['Organizer', 'Speaker', 'Moderator', 'Attendee']);
        setShowCreateForm(false);
        setShowRoleAllocation(false);
      } else {
        alert("Please select both a role and a member.");
      }
    };
  
    const getCurrentDateTime = () => {
      const now = new Date();
      return now.toISOString().slice(0, 16);
    };
  
    return (
      <div className="admin-meeting-page">
      <aside className="admin-meeting-sidebar">
        <button className="admin-create-meeting-btn" onClick={() => setShowCreateForm(true)}>
          Create Meeting
        </button>
        <ul className="admin-meeting-list">
          <li>Members</li>
          <li>Backout_History</li>
          <li>Roles_Taken</li>
          <li>Meeting_History</li>
          <li>Available_members</li>
        </ul>
        <button className="admin-add-upcoming-meeting-btn" onClick={() => setShowUpcomingMeetings(true)}>
          Check Upcoming Meeting
        </button>
      </aside>
    
      <main className="admin-meeting-main">
        {showCreateForm && (
          <div className="admin-modal-overlay">
            <div className="admin-modal-content admin-create-form">
              <button className="admin-close-btn" onClick={() => setShowCreateForm(false)}>
                <X size={24} />
              </button>
              <h2>Create Meeting</h2>
              <form onSubmit={handleCreateMeetingSubmit}>
                <input 
                  type="text" 
                  name="theme" 
                  placeholder="Theme" 
                  required 
                  value={meetingData.theme}
                  onChange={handleInputChange}
                />
                <input 
                  type="text" 
                  name="venue" 
                  placeholder="Venue" 
                  required 
                  value={meetingData.venue}
                  onChange={handleInputChange}
                />
                <input 
                  type="datetime-local" 
                  name="dateTime" 
                  placeholder="Date and Time" 
                  required 
                  value={meetingData.dateTime}
                  onChange={handleInputChange}
                  min={getCurrentDateTime()}
                />
                <button type="submit" className="admin-role-allocation-btn">
                  Proceed to Role Allocation
                </button>
              </form>
            </div>
          </div>
        )}
    
        {showRoleAllocation && (
          <div className="admin-modal-overlay">
            <div className="admin-modal-content admin-role-allocation">
              <button className="admin-close-btn" onClick={() => setShowRoleAllocation(false)}>
                <X size={24} />
              </button>
              <h2>Role Allocation</h2>
              <div className="admin-dropdown-container">
                <select 
                  value={selectedRole} 
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setAvailableRoles(prev => prev.filter(role => role !== e.target.value));
                  }}
                  className="admin-dropdown"
                >
                  <option value="">Select Role</option>
                  {availableRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <select 
                  value={selectedMember} 
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="admin-dropdown"
                >
                  <option value="">Select Member</option>
                  {members.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>
              <button className="admin-save-btn" onClick={handleRoleSubmit}>Save</button>
            </div>
          </div>
        )}
    
        {showUpcomingMeetings && (
          <div className="admin-modal-overlay">
            <div className="admin-modal-content admin-upcoming-meetings">
              <button className="admin-close-btn" onClick={() => setShowUpcomingMeetings(false)}>
                <X size={24} />
              </button>
              <h2>Upcoming Meetings</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Theme</th>
                    <th>Venue</th>
                    <th>Date/Time</th>
                    <th>Role</th>
                    <th>Member</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingMeetings.length > 0 ? (
                    upcomingMeetings.map((meeting, index) => (
                      <tr key={index}>
                        <td>{meeting.theme}</td>
                        <td>{meeting.venue}</td>
                        <td>{meeting.dateTime}</td>
                        <td>{meeting.role}</td>
                        <td>{meeting.member}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No upcoming meetings found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
    );
  };
  

export default Admin;