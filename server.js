const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const path = require('path');

const PORT  = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'public')

app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
// app.set('views', path.join(publicPath, 'views'));

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Uzoanya Dominic',
        style: 'css/style.css'
    });
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
        // host: 'smtp.gmail.com',
        auth: {
          user: 'uzoanyadominic@gmail.com',
          pass: 'vicecity',
        },
        tls: {
            rejectUnauthorized: false
            // ciphers: 'SSLv3'
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
            return console.log(error);
            //res.send(error);
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

app.get('*', function(req, res){
    res.status(404).render('404', {
        title: 'Error 404'
    });
  });

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}...`);
});