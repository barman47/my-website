const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const PORT  = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/email', (req, res) => {
    const message = `
    <p>You Have a new Contact Request</p>
    <h3>Message Details</h3>
    <ul>
        <li>Email: ${req.body.email}</li>
        <li>Date Required: ${req.body.date}</li>
        <li>Services: ${req.body.webDevelopment}, ${req.body.desktopApp}, ${req.body.teaching}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'uzoanyadominic@gmail.com',
          pass: 'vicecity'
        },
        tls: {
            rejectUnauthorized: false
        }
      });

       // setup email data with unicode symbols
    let mailOptions = {
        from: `New Client`, // sender address
        to: 'nomsouzoanya@yahoo.co.uk', // list of receivers
        subject: 'Hello Dominic I Need Your Services', // Subject line
        html: message // html body
    };
      

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          //return console.log(error);
          res.send(error);
          return;
        } else {
          console.log('Email sent: ' + info.response);
        
            res.status(200).end();
        }
      });
});

app.get((req, res) => {
    res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}...`);
});