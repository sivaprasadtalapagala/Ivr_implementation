const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();
const port = 3000; // Port number of your choice

// Middleware to parse JSON request body
app.use(express.urlencoded({ extended: true }));

// Function to handle user input
function handleUserInput(response, userSpeech) {
  const twiml = new VoiceResponse();

  // Check if the user's speech contains "hello"
  if (userSpeech.includes('1')) {
    twiml.say('You selected english,Hello siva prasad, how are you?');
    // Prompt for more input
    // gatherUserInput(twiml);
    gatherSpeechInput(twiml)
  } else if (userSpeech.includes('2')) {
       // If the user is satisfied, respond with thanks and end the call
       twiml.say("You selected Hindi,how can i help you");
       gatherSpeechInput(twiml)
      //  twiml.hangup();
     }else if (userSpeech.includes('3')) {
      // If the user is satisfied, respond with thanks and end the call
      twiml.say("You selected Tamil,how can i help you");
     //  twiml.hangup();
    }else {
    // Respond with a default message if the user's input doesn't match
    twiml.say("I'm sorry. I didn't quite grasp what you just said");
    // Prompt for more input
    // gatherUserInput(twiml);
    gatherSpeechInput(twiml)
  }

  // Render the response as XML
  response.type('text/xml');
  response.send(twiml.toString());
}
function handleUserSpeechInput(response, userSpeech) {
  const twiml = new VoiceResponse();

  console.log("userSpeech",userSpeech.toLowerCase())

  // Check if the user's speech contains "hello"
  if (userSpeech.includes('hello')) {
    twiml.say('Hello siva prasad, how are you?');
    // Prompt for more input
    gatherSpeechInput(twiml);
  } else if (userSpeech.includes('ok')) {
   // If the user is satisfied, respond with thanks and end the call
   twiml.say("Thank you for using our service. Goodbye!");
   twiml.hangup();
 } else {
    // Respond with a default message if the user's input doesn't match
   twiml.say("I'm sorry. I didn't quite grasp what you just said");
   // Prompt for more input
   gatherSpeechInput(twiml);
 }

  // Render the response as XML
  response.type('text/xml');
  response.send(twiml.toString());
}

// Function to gather user input
function gatherUserInput(twiml) {
  const gather = twiml.gather({
    input: 'dtmf', // Collect DTMF (keypad) input
    action: '/handle-user-input', // URL to handle user input
    timeout: 5, // Wait for user input for 5 seconds
  });

  // Prompt the user for input
  gather.say('Please select 1 for English, 2 for Hindi, or 3 for Tamil.');
}

//gather speech input 
function gatherSpeechInput(twiml) {
  const gather = twiml.gather({
    input: 'speech', // Collect speech input
    action: '/handle-user-speech-input', // URL to handle user input
    timeout: 5, // Wait for user input for 5 seconds
  });

  // Prompt the user for input
  gather.say('Hello siva,how can i help you?');
}

// Create a route that will handle Twilio webhook requests, sent as an HTTP POST to /voice in our application
app.post('/user/voice', (request, response) => {
  // Create a Twilio VoiceResponse object to handle the call
  const twiml = new VoiceResponse();

  // Start gathering user input
  gatherUserInput(twiml);

  // Return the response
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create a route to handle user input
app.post('/handle-user-input', (request, response) => {
  const userSpeech = request.body.Digits;
  
  // Handle user input based on the conversation flow
  handleUserInput(response, userSpeech);
});
app.post('/handle-user-speech-input', (request, response) => {
  const userSpeech = request.body.SpeechResult ? request.body.SpeechResult.toLowerCase() : '';
  
  // Handle user input based on the conversation flow
  handleUserSpeechInput(response, userSpeech);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Now listening on port ${port}.`);
});
