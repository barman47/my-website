const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const favicon = require('express-favicon');
const path = require('path');

const PORT  = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'public')

app.use(express.static(publicPath));

app.use(favicon(path.join(publicPath, 'img', 'favicon.png')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: 'views/partials'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Uzoanya Dominic',
        year: new Date().getFullYear()
    });
});

app.post('/email', (req, res) => {
    console.log(req.body);
    const message = `
    <h3>YOU HAVE A NEW CONTACT REQUEST</h3>
    <p>From: <strong>${req.body.name}</strong></p>
    <p>Sender: <strong>${req.body.email}</strong></p>
    <br>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'uzoanyadominic@gmail.com',
          pass: 'VICEcity@47',
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
            return console.log(error);
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