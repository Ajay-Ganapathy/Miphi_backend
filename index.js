const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const app = express();
 
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests
 
// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gowrisubha444@gmail.com',
    pass: 'povs kbub aghq ujqy',  // Use the 16-character app password generated here
  },
});

app.get('/' , (req , res ) => {
    res.send('hello');
})
 
app.post('/send-email', (req, res) => {
  const { fullname, email, Querytype, mobile, message } = req.body;
 
  const mailOptions = {
    from: email,
    to: 'gowrisubha444@gmail.com',
    subject: `Requisition of Information: ${Querytype}`,
    text: `Name: ${fullname}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`, 
  };
 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.json({ success: false, message: 'Failed to send email.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Email sent successfully!' });
    }
  });
});
 
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
 