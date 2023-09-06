const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();
const port = 3000; // Port number of your choice


// Middleware to parse JSON request body
app.use(express.urlencoded({ extended: true }));

// Create a route that will handle Twilio webhook requests, sent as an HTTP POST to /voice in our application
app.post('/voice', (request, response) => {
    console.log('Request Body:', request.body);
  // Create a Twilio VoiceResponse object to handle the call
  const twiml = new VoiceResponse();

  // Use the <Say> element to send a message to the caller // default message on lifting the call
//   twiml.say('Hello siva prasad,how are you');

// Use the <Gather> element to collect user input
const gather = twiml.gather({
    input: 'speech', // Collect speech input
    action: '/handle-user-input', // URL to handle user input
    timeout: 5, // Wait for user input for 5 seconds
  });

  // Prompt the user for input
  gather.say('Please say something.');

  // If there's no user input, redirect to the voice route again
  twiml.redirect('/voice');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create a route to handle user input
app.post('/handle-user-input', (request, response) => {
  const twiml = new VoiceResponse();

  // Get the user's speech input
  const userSpeech = request.body.SpeechResult ? request.body.SpeechResult.toLowerCase() : '';
  console.log('Request Body:', request.body);
  // Check if the user's speech contains "how are you"
  if (userSpeech.includes('hello')) {
    twiml.say('Hello siva prasad, how are you?');
  } else {
    // Respond with a default message if the user's input doesn't match
    twiml.say("Hello siva prasad, I'm just a Twilio bot.");
  }

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Start the Express server
app.listen(port, () => {
  console.log(`Now listening on port ${port}.`);
});
