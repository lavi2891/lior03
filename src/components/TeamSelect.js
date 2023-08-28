import React, { useState, useEffect } from 'react';

function TeamSelect() {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams, setTeams] = useState([]); // To store the list of development teams

  // Function to fetch the list of teams from your API
  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/teams'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTeams(data); // Set the list of teams in state
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  // Use useEffect to fetch teams when the component mounts
  useEffect(() => {
    fetchTeams();
  }, []);

  // Handle team selection here

  return (
    <div>
      <label>Select a Development Team:</label>
      <select onChange={(e) => setSelectedTeam(e.target.value)} value={selectedTeam}>
        <option value="">Select a Team</option>
        {teams.map((team) => (
          <option key={team.team_code} value={team.team_code}>
            {team.team_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TeamSelect;
