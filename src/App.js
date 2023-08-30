import React, { useState } from 'react'
import TeamSelect from './components/TeamSelect'
import MeetingsList from './components/MeetingsList'
import AddMeetingForm from './components/AddMeetingForm'

function App() {
    const [selectedTeam, setSelectedTeam] = useState('')
    const [refreshMeetingsList, setRefreshMeetingsList] = useState(Math.random().toString(36).substring(2,6))

    // Define a function to handle team selection
    const handleTeamSelect = (team) => {
        setSelectedTeam(team)
    }
    const forceRefreshMeetingsList = () =>
        setRefreshMeetingsList(Math.random().toString(36).substring(2,6))

    return (
        <div>
            <TeamSelect onSelect={handleTeamSelect} />
            {selectedTeam && <MeetingsList selectedTeam={selectedTeam} refreshMeetingsList={refreshMeetingsList} />}
            {selectedTeam && ( <AddMeetingForm selectedTeam={selectedTeam} forceRefreshMeetingsList={forceRefreshMeetingsList}  />
            )}
        </div>
    )
}

export default App
