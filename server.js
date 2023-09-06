const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();
const port = 3000; // Port number of your choice

// Create a route that will handle Twilio webhook requests, sent as an HTTP POST to /voice in our application
app.post('/voice', (request, response) => {
  // Create a Twilio VoiceResponse object to handle the call
  const twiml = new VoiceResponse();

  // Use the <Say> element to send a message to the caller
  twiml.say('Hello siva prasad,how are you');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Start the Express server
app.listen(port, () => {
  console.log(`Now listening on port ${port}.`);
});
