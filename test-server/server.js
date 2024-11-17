// server.js (External Server)
const express = require('express');
const app = express();
const port = 4000;
const readline = require('readline');
const { loremIpsum } = require('lorem-ipsum');

let calls = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter a new call: ',
});

function generateNewCall() {
  const id = 'call_' + Date.now();
  const caller = 'Caller ' + Math.floor(Math.random() * 100);
  const recipient = 'Recipient ' + Math.floor(Math.random() * 100);
  const startTime = new Date().toISOString();
  const status = 'ongoing';
  const summary = loremIpsum({ count: 3, units: 'sentences' });
  const transcript = [];
  console.log('New call added:', { id, caller, recipient, startTime, status });

  return { id, caller, recipient, startTime, status, summary, transcript };
}

// Listen for input lines
rl.on('line', (input) => {
  if (input.trim() === 'newcall') { // create a new call
    const newCall = generateNewCall();
    calls.push(newCall);
    console.log('New call added:', newCall);
  } else if (input.trim() === 'exit') { // exit the server
    console.log('Exiting server...');
    rl.close();
    process.exit(0);
  } else if (input.trim() === 'talk') { // add random text to transcription
    const call = calls.find(c => c.status === 'ongoing');
    if (call) {
      call.transcript.push(loremIpsum({ count: Math.floor(Math.random() * 3), units: 'sentences' }));
      console.log('Added transcription:', call.transcript);
    } else { 
      console.log('No ongoing call to talk');
    }
  } else if (input.trim() === 'endcall') { // end the ongoing call
    const call = calls.find(c => c.status === 'ongoing');
    if (call) {
      call.status = 'completed';
      call.endTime = new Date().toISOString();
      console.log('Call ended:', call);
    } else {
      console.log('No ongoing call to end');
    }
  } else if(input.trim() === 'addticket') { // add new ticket to the ongoing call
    const call = calls.find(c => c.status === 'ongoing');
    if (call) {
      call.ticket = { id: 'ticket_' + Date.now(), description: loremIpsum({ count: 1, units: 'sentences' }) };
      console.log('Added ticket:', call.ticket);
    } else {
      console.log('No ongoing call to add ticket');
    }
  } else {
    console.log(`Unknown command: ${input}`);
  }
  rl.prompt(); // Display the prompt again
});

// Start the prompt
rl.prompt();

// Enable CORS to allow cross-origin requests from your dashboard
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your dashboard's domain
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with dashboard's domain in production
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoint to get all calls
app.get('/api/calls', (req, res) => {
  res.json(calls);
});

// Endpoint to get a specific call by ID
app.get('/api/calls/:id', (req, res) => {
  const call = calls.find(c => c.id === req.params.id);
  if (call) {
    res.json(call);
  } else {
    res.status(404).json({ error: 'Call not found' });
  }
});

app.listen(port, () => {
  console.log(`External server listening at http://localhost:${port}`);
});

