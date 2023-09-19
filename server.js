const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();
const port = 3000; // Port number of your choice


// Middleware to parse JSON request body
app.use(express.urlencoded({ extended: true }));

// Function to handle user input
function handleUserInput(response, userSpeech) {
  const twiml = new VoiceResponse();

  console.log("userSpeech",userSpeech.toLowerCase())

  // Check if the user's speech contains "hello"
  if (userSpeech.includes('hello')) {
    twiml.say('Hello siva prasad, how are you?');
    // Prompt for more input
    gatherUserInput(twiml);
  } else if (userSpeech.includes('ok')) {
   // If the user is satisfied, respond with thanks and end the call
   twiml.say("Thank you for using our service. Goodbye!");
   twiml.hangup();
 } else {
    // Respond with a default message if the user's input doesn't match
   twiml.say("I'm sorry. I didn't quite grasp what you just said");
   // Prompt for more input
   gatherUserInput(twiml);
 }

  // Render the response as XML
  response.type('text/xml');
  response.send(twiml.toString());
}


// Function to gather user input
function gatherUserInput(twiml) {
  const gather = twiml.gather({
    input: 'speech', // Collect speech input
    action: '/handle-user-input', // URL to handle user input
    timeout: 5, // Wait for user input for 5 seconds
  });

  // Prompt the user for input
  gather.say('Hello siva,how can i help you?');
}

// Create a route that will handle Twilio webhook requests, sent as an HTTP POST to /voice in our application
app.post('/voice', (request, response) => {
    console.log('Request Body:', request.body);
  // Create a Twilio VoiceResponse object to handle the call
  const twiml = new VoiceResponse();

    // Start gathering user input
    gatherUserInput(twiml);
 
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create a route to handle user input
// app.post('/handle-user-input', (request, response) => {
//   const twiml = new VoiceResponse();

//   // Get the user's speech input
//   const userSpeech = request.body.SpeechResult ? request.body.SpeechResult.toLowerCase() : '';
//   console.log('Request Body:', request.body);
//   // Check if the user's speech contains "how are you"
//   if (userSpeech.includes('hello')) {
//     twiml.say('Hello siva prasad, how are you?');
//   } else {
//     // Respond with a default message if the user's input doesn't match
//     twiml.say("Hello siva prasad, I'm just a Twilio bot.");
//   }

//   // Render the response as XML in reply to the webhook request
//   response.type('text/xml');
//   response.send(twiml.toString());
// });
app.post('/handle-user-input', (request, response) => {
  const userSpeech = request.body.SpeechResult ? request.body.SpeechResult.toLowerCase() : '';
  
  // Handle user input based on the conversation flow
  handleUserInput(response, userSpeech);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Now listening on port ${port}.`);
});
