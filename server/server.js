// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alIo*(uu)9u((JJ)',
  database: 'task03'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Define API routes

// Retrieve all development teams
app.get('/api/teams', (req, res) => {
  db.query('SELECT * FROM development_teams', (err, results) => {
    if (err) {
      console.error('Error fetching teams:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Retrieve meetings for a specific team by team code
app.get('/api/meetings/:team_code', (req, res) => {
  const teamCode = req.params.team_code;
  db.query('SELECT * FROM meetings WHERE team_code = ?', [parseInt(teamCode)], (err, results) => {
    if (err) {
      console.error('Error fetching meetings:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Add a new meeting
app.post('/api/meetings', (req, res) => {
  const { title, start_date, start_time, end_date, end_time, location, description, meeting_room, team_code } = req.body;
  
  // Assuming you have a "meetings" table with appropriate columns
  db.query(
    'INSERT INTO meetings (title, start_date, start_time, end_date, end_time, location, description, meeting_room, team_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, start_date, start_time, end_date, end_time, location, description, meeting_room, team_code],
    (err, result) => {
      if (err) {
        console.error('Error adding meeting:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const newMeetingId = result.insertId;
        res.status(201).json({ id: newMeetingId, message: 'Meeting added successfully' });
      }
    }
  );
});

// Handle more meeting-related routes here

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});