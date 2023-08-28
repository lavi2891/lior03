import React, { useState } from 'react';
import TeamSelect from './components/TeamSelect';
import MeetingsList from './components/MeetingsList';
import AddMeetingForm from './components/AddMeetingForm';

function App() {
  const [selectedTeam, setSelectedTeam] = useState('');

  return (
    <div>
      <TeamSelect />
      <MeetingsList selectedTeam={selectedTeam} />
      <AddMeetingForm />
    </div>
  );
}

export default App;