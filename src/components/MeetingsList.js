import React, { useState, useEffect, useCallback } from 'react';
import 'C:/Users/Lavi/OneDrive/שולחן העבודה/מטלות ברוכים/Task 03/task03/src/style/MeetingList.css';

function MeetingsList({ selectedTeam, refreshMeetingsList }) {
  const [meetings, setMeetings] = useState([]);

  // Define fetchMeetings as a memoized function
  const fetchMeetings = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/meetings/${selectedTeam}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMeetings(data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  }, [selectedTeam]); // Include selectedTeam in the dependency array

  // Use useEffect with fetchMeetings
  useEffect(() => {
    if (selectedTeam) {
      fetchMeetings();
    }
  }, [selectedTeam, refreshMeetingsList, fetchMeetings]); // Include selectedTeam and fetchMeetings in the dependency array

  return (
    <div key={refreshMeetingsList} className="meetings-list">
      <h2>Meetings for {selectedTeam}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start Date</th>
            <th>Start Time</th>
            <th>End Date</th>
            <th>End Time</th>
            <th>Location</th>
            <th>Meeting Room</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.title}</td>
              <td>{new Date(meeting.start_date).toLocaleDateString('he-IL')}</td>
              <td>{meeting.start_time}</td>
              <td>{new Date(meeting.end_date).toLocaleDateString('he-IL')}</td>
              <td>{meeting.end_time}</td>
              <td>{meeting.location}</td>
              <td>{meeting.meeting_room}</td>
              <td>{meeting.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MeetingsList;
