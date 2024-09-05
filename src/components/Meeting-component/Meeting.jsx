import "../Meeting-component/Meeting.css";
import { X } from 'lucide-react';
import { useState, useEffect } from "react";

const MeetingForm = () => {
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
    <div className="meeting-page">
      <aside className="meeting-sidebar">
        <button className="create-meeting-btn" onClick={() => setShowCreateForm(true)}>
          Create Meeting
        </button>
        <ul className="meeting-list">
          <li>Availability</li>
          <li>Role Taken</li>
          <li>Upcoming Meeting</li>
          <li>Backout</li>
        </ul>
        <button className="add-upcoming-meeting-btn" onClick={() => setShowUpcomingMeetings(true)}>
          Check Upcoming Meeting
        </button>
      </aside>

      <main className="meeting-main">
        {showCreateForm && (
          <div className="modal-overlay">
            <div className="modal-content create-form">
              <button className="close-btn" onClick={() => setShowCreateForm(false)}>
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
                <button type="submit" className="role-allocation-btn">
                  Proceed to Role Allocation
                </button>
              </form>
            </div>
          </div>
        )}

        {showRoleAllocation && (
          <div className="modal-overlay">
            <div className="modal-content role-allocation">
              <button className="close-btn" onClick={() => setShowRoleAllocation(false)}>
                <X size={24} />
              </button>
              <h2>Role Allocation</h2>
              <div className="dropdown-container">
                <select 
                  value={selectedRole} 
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setAvailableRoles(prev => prev.filter(role => role !== e.target.value));
                  }}
                  className="dropdown"
                >
                  <option value="">Select Role</option>
                  {availableRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <select 
                  value={selectedMember} 
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="dropdown"
                >
                  <option value="">Select Member</option>
                  {members.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>
              <button className="save-btn" onClick={handleRoleSubmit}>Save</button>
            </div>
          </div>
        )}

        {showUpcomingMeetings && (
          <div className="modal-overlay">
            <div className="modal-content upcoming-meetings">
              <button className="close-btn" onClick={() => setShowUpcomingMeetings(false)}>
                <X size={24} />
              </button>
              <h2>Upcoming Meetings</h2>
              <table>
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

export default MeetingForm;
