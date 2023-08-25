const twilio = require('twilio');

// Your Twilio Account SID and Auth Token
const accountSid = 'AC6963d653738bdd76cfd48b5ce34a5e26';
const authToken = '23765094e4e519c44e8dbc76379a8825';

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Make an outgoing call
client.calls
  .create({
    twiml: '<Response><Say>Hello from Twilio!</Say></Response>',
    to: '+919493766524', // The recipient's phone number
    from: '+16189238170' // Your Twilio phone number
  })
  .then(call => console.log(call.sid))
  .catch(error => console.error(error));
