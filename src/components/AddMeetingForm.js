import React, { useState } from 'react';

function AddMeetingForm() {
  const [meetingData, setMeetingData] = useState({
    title: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    location: '',
    description: '',
    meeting_room: '',
    team_code: '',
  });

  const fieldData = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'start_date', label: 'Start Date', type: 'date' },
    { name: 'start_time', label: 'Start Time', type: 'time' },
    { name: 'end_date', label: 'End Date', type: 'date' },
    { name: 'end_time', label: 'End Time', type: 'time' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'meeting_room', label: 'Meeting Room', type: 'text' },
    { name: 'team_code', label: 'Team Code', type: 'text' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and send data to the backend
    console.log(meetingData);
  };

  return (
    <div>
      <h2>Add a New Meeting</h2>
      <form onSubmit={handleSubmit}>
        {fieldData.map((field) => (
          <div key={field.name}>
            <label>
              {field.label}:
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={meetingData[field.name]}
                  onChange={(e) =>
                    setMeetingData({ ...meetingData, [field.name]: e.target.value })
                  }
                  required
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={meetingData[field.name]}
                  onChange={(e) =>
                    setMeetingData({ ...meetingData, [field.name]: e.target.value })
                  }
                  required
                />
              )}
            </label>
          </div>
        ))}
        <button type="submit">Add Meeting</button>
      </form>
    </div>
  );
}

export default AddMeetingForm;