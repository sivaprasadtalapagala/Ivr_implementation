const express = require('express');
const axios = require('axios');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();
const port = 3000; // Port number of your choice

// Middleware to parse JSON request body
app.use(express.urlencoded({ extended: true }));
let gatherInput=null;
// Function to handle user input
// function handleUserInput(response, userSpeech) {
//   const twiml = new VoiceResponse();
// if(gatherInput===1){
//   // Check if the user's speech contains "hello"
//   if (userSpeech.includes('1')) {
//     twiml.say('You selected english,I am chatbot powered by Cerinastudio.');
//     // Prompt for more input
//     // gatherUserInput(twiml);
//     gatherSpeechInput(twiml)
//   } else if (userSpeech.includes('2')) {
//        // If the user is satisfied, respond with thanks and end the call
//        twiml.say("You selected Hindi,I am chatbot powered by Cerinastudio.");
//        gatherSpeechInput(twiml)
//       //  twiml.hangup();
//      }else if (userSpeech.includes('3')) {
//       // If the user is satisfied, respond with thanks and end the call
//       twiml.say("You selected Tamil,I am chatbot powered by Cerinastudio.");
//      //  twiml.hangup();
//     }else {
//     // Respond with a default message if the user's input doesn't match
//     twiml.say("I'm sorry. I didn't quite grasp what you just said");
//     // Prompt for more input
//     // gatherUserInput(twiml);
//     gatherSpeechInput(twiml)
//   }
//   gatherInput=2;
// }else{
//   if (userSpeech.includes('1')) {
//     twiml.say("You selected Personal Loan. Here are the details: Loan Amount of 5 lakhs with an Interest Rate of 10%, and a Loan Term of up to 5 years.");
//     gatherSpeechInput(twiml)
//   } else if (userSpeech.includes('2')) {
//     twiml.say("You selected Education Loan. Here are the details: Loan Amount varies based on the course and institution, competitive Interest Rates, and flexible Loan Term options.");
//     gatherSpeechInput(twiml)
//   } else if (userSpeech.includes('3')) {
//     twiml.say("You selected Vehicle Loan. Here are the details: Loan Amount of up to 80% of the vehicle value, competitive Interest Rates, and a Loan Term of up to 7 years.");
//     gatherSpeechInput(twiml)
//   } else if (userSpeech.includes('4')) {
//     twiml.say("You selected House Loan. Here are the details: Loan Amount based on property value and eligibility, competitive Interest Rates, and a Loan Term of up to 25 years.");
//     gatherSpeechInput(twiml)
//   } else {
//     twiml.say("Invalid Input provided");
//   }
//   gatherInput=3;
// }
//   // Render the response as XML
//   response.type('text/xml');
//   response.send(twiml.toString());
// }
// Modify handleUserInput function to set the voice
function handleUserInput(response, userSpeech) {
  const twiml = new VoiceResponse();

  if (gatherInput === 1) {
    // Check if the user's speech contains "hello"
    if (userSpeech.includes('1')) {
      twiml.say(
        {
          voice: 'Polly.Raveena', // Set the voice to Polly.Raveena
          language: 'en-IN', // Set the language to English (India)
        },
        'You selected English. I am a chatbot powered by Cerinastudio.'
      );
      gatherSpeechInput(twiml);
    } else if (userSpeech.includes('2')) {
      // If the user is satisfied, respond with thanks and end the call
      twiml.say(
        {
          voice: 'Polly.Raveena', // Set the voice to Polly.Raveena
          language: 'en-IN', // Set the language to English (India)
        },
        'You selected Hindi. I am a chatbot powered by Cerinastudio.'
      );
      gatherSpeechInput(twiml);
    } else if (userSpeech.includes('3')) {
      // If the user is satisfied, respond with thanks and end the call
      twiml.say(
        {
          voice: 'Polly.Raveena', // Set the voice to Polly.Raveena
          language: 'en-IN', // Set the language to English (India)
        },
        'You selected Tamil. I am a chatbot powered by Cerinastudio.'
      );
    } else {
      // Respond with a default message if the user's input doesn't match
      twiml.say("I'm sorry. I didn't quite grasp what you just said");
      gatherSpeechInput(twiml);
    }
    gatherInput = 2;
  } else {
    // Handle other user input scenarios with the same voice
  }

  // Render the response as XML
  response.type('text/xml');
  response.send(twiml.toString());
}


// async function handleUserSpeechInput(response, userSpeech) {
//   console.log("userSpeech",userSpeech.toLowerCase())
//   try {
//     // Make an HTTP request to the API
//     const apiUrl = 'http://10.0.52.203:7200/getResponse?Targetlanguage=English';
//     const requestBody = {
//       userquery: userSpeech.toLowerCase(), // Replace userquery with userSpeech
//     };

//     const apiResponse = await axios.post(apiUrl, requestBody, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     // Extract the response from the API
//     const apiData = apiResponse.data;

//     // Create a TwiML response
//     const twiml = new VoiceResponse();

//     // Use the response from the API in the TwiML
//      // Check if apiData.response is empty
//      if (apiData.response.trim() === '') {
//       // Fallback message when the response is empty
//       twiml.say("I'm a bit confused by that last part.");
//       gatherSpeechInput(twiml);
//     } else {
//       // Use the response from the API in the TwiML
//       twiml.say(apiData.response);
//       // gatherSpeechInput(twiml);
//       gatherUserInput(twiml);
//     }
//     // twiml.say(apiData.response);
//     // Prompt for more input
//   //  gatherSpeechInput(twiml);

//     // Render the response as XML
//     response.type('text/xml');
//     response.send(twiml.toString());
//   } catch (error) {
//     console.error('Error:', error);
//     // Handle errors here, e.g., return an error TwiML response
//     response.status(500).send('An error occurred.');
//   }
// }
// Modify handleUserSpeechInput function to set the voice
async function handleUserSpeechInput(response, userSpeech) {
  console.log('userSpeech', userSpeech.toLowerCase());
  try {
    // Make an HTTP request to the API
    const apiUrl = 'http://10.0.52.203:7200/getResponse?Targetlanguage=English';
    const requestBody = {
      userquery: userSpeech.toLowerCase(), // Replace userquery with userSpeech
    };

    const apiResponse = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Extract the response from the API
    const apiData = apiResponse.data;

    // Create a TwiML response
    const twiml = new VoiceResponse();

    // Use the response from the API in the TwiML
    if (apiData.response.trim() === '') {
      // Fallback message when the response is empty
      twiml.say(
        {
          voice: 'Polly.Raveena', // Set the voice to Polly.Raveena
          language: 'en-IN', // Set the language to English (India)
        },
        "I'm a bit confused by that last part."
      );
      gatherSpeechInput(twiml);
    } else {
      // Use the response from the API in the TwiML
      twiml.say(
        {
          voice: 'Polly.Raveena', // Set the voice to Polly.Raveena
          language: 'en-IN', // Set the language to English (India)
        },
        apiData.response
      );
      gatherUserInput(twiml);
    }

    // Render the response as XML
    response.type('text/xml');
    response.send(twiml.toString());
  } catch (error) {
    console.error('Error:', error);
    // Handle errors here, e.g., return an error TwiML response
    response.status(500).send('An error occurred.');
  }
}
// function handleUserSpeechInput(response, userSpeech) {
//   const twiml = new VoiceResponse();

//   console.log("userSpeech",userSpeech.toLowerCase())

//   // Check if the user's speech contains "hello"
//   if (userSpeech.includes('hello')) {
//     twiml.say('Hello siva prasad, how are you?');
//     // Prompt for more input
//     gatherSpeechInput(twiml);
//   } else if (userSpeech.includes('ok')) {
//    // If the user is satisfied, respond with thanks and end the call
//    twiml.say("Thank you for using our service. Goodbye!");
//    twiml.hangup();
//  } else {
//     // Respond with a default message if the user's input doesn't match
//    twiml.say("I'm sorry. I didn't quite grasp what you just said");
//    // Prompt for more input
//    gatherSpeechInput(twiml);
//  }

//   // Render the response as XML
//   response.type('text/xml');
//   response.send(twiml.toString());
// }

// Function to gather user input
function gatherUserInput(twiml) {
  console.log("twiml",twiml)
  const gather = twiml.gather({
    input: 'dtmf', // Collect DTMF (keypad) input
    action: '/handle-user-input', // URL to handle user input
    timeout: 5, // Wait for user input for 5 seconds
  });
  console.log('gather ----------------',gather);
  // Prompt the user for input
  // gather.say('Please select 1 for English, 2 for Hindi, or 3 for Tamil.');
  if (gatherInput === 1) {
    gather.say(
      {
        voice: 'Polly.Kajal-Neural', // Set the voice to Polly.Raveena
        language: 'en-IN', // Set the language to English (India)
      },
      'Please select 1 for English, 2 for Hindi, or 3 for Tamil.');
  } else if (gatherInput === 2) {
    gather.say(
      {
        voice: 'Polly.Raveena', // Set the voice to Polly.Raveena
        language: 'en-IN', // Set the language to English (India)
      },
      'You are eligible for loans. Press 1 for Personal Loan, 2 for Education Loan, 3 for Vehicle Loan, or 4 for House Loan.');
  } else {
    // Provide a default prompt if the input is not recognized
    gather.say(
      {
        voice: 'Polly.Raveena', // Set the voice to Polly.Raveena
        language: 'en-IN', // Set the language to English (India)
      },
      'Hello how can i help you');
  }
}

//gather speech input 
function gatherSpeechInput(twiml) {
  const gather = twiml.gather({
    input: 'speech', // Collect speech input
    action: '/handle-user-speech-input', // URL to handle user input
    timeout: 5, // Wait for user input for 5 seconds
  });

  // Prompt the user for input
  gather.say(
    {
      voice: 'Polly.Raveena', // Set the voice to Polly.Raveena
      language: 'en-IN', // Set the language to English (India)
    },
    'Hello,how can i help you?');
}

// Create a route that will handle Twilio webhook requests, sent as an HTTP POST to /voice in our application
app.post('/user/voice', (request, response) => {
  console.log("request_body",request.body)
  // Create a Twilio VoiceResponse object to handle the call
  const twiml = new VoiceResponse();
  gatherInput=1;
  // Start gathering user input
  gatherUserInput(twiml);

  // Return the response
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create a route to handle user input
app.post('/handle-user-input', (request, response) => {
  console.log("handle user input",request)
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
