import React, { useState, useEffect, useCallback } from 'react';

function MeetingsList({ selectedTeam }) {
  const [meetings, setMeetings] = useState([]);

  // Define fetchMeetings as a memoized function
  const fetchMeetings = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/meetings?team_code=${selectedTeam}`);
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
  }, [selectedTeam, fetchMeetings]); // Include selectedTeam and fetchMeetings in the dependency array

  return (
    <div>
      <h2>Meetings for {selectedTeam}</h2>
      <ul>
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            <strong>{meeting.title}</strong>
            <p>Start date: {meeting.start_date}</p>
            <p>Start ime: {meeting.start_time}</p>
            <p>End date: {meeting.end_date}</p>
            <p>End time: {meeting.end_time}</p>
            <p>Location: {meeting.location}</p>
            <p>Meeting room: {meeting.meeting_room}</p>
            <p>Description: {meeting.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeetingsList;
