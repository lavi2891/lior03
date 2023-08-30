import React, { useState } from 'react'

function AddMeetingForm({ selectedTeam, forceRefreshMeetingsList }) {
    const emptyMeeting = {
        title: '',
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        location: '',
        description: '',
        meeting_room: '',
        team_code: selectedTeam
    }
    const [meetingData, setMeetingData] = useState({ ...emptyMeeting })

    const fieldData = [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'start_date', label: 'Start Date', type: 'date' },
        { name: 'start_time', label: 'Start Time', type: 'time' },
        { name: 'end_date', label: 'End Date', type: 'date' },
        { name: 'end_time', label: 'End Time', type: 'time' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'meeting_room', label: 'Meeting Room', type: 'text' }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3001/api/meetings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meetingData)
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            console.log('Meeting added successfully:', data)
            setMeetingData({...emptyMeeting})
            forceRefreshMeetingsList()
        } catch (error) {
            console.error('Error adding meeting:', error)
            // Handle the error as needed, e.g., display an error message to the user.
        }
    }

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
                                        setMeetingData({
                                            ...meetingData,
                                            [field.name]: e.target.value
                                        })
                                    }
                                    required
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={meetingData[field.name]}
                                    onChange={(e) =>
                                        setMeetingData({
                                            ...meetingData,
                                            [field.name]: e.target.value
                                        })
                                    }
                                    required
                                />
                            )}
                        </label>
                    </div>
                ))}
                <button type='submit'>Add Meeting</button>
            </form>
        </div>
    )
}

export default AddMeetingForm
