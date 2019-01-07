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

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: 'views/partials'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    console.log('req.headers.host ' + req.headers.host + req.url);
    console.log('req.url ' + req.url);
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

    // var transporter = nodemailer.createTransport({
    //     host: 'mail.privateemail.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //       user: 'contact@domstech.com',
    //       pass: 'VICEcity@47',
    //     }
    // });

    
    const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'uzoanyadominic@gmail.com',
            pass: 'VICEcity@47',
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'uzoanyadominic@gmail.com',
    //         pass: 'VICEcity@47',
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });
    
    transporter.verify(function(error, success) {
        if (error) {
             console.log(error);
        } else {
             console.log('Server is ready to take our messages');
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

var http = express.createServer();

// set up a route to redirect http to https
http.get('*', function(req, res) {  
    res.redirect('https://' + req.headers.host + req.url);

    // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
    // res.redirect('https://example.com' + req.url);
})

http.get((req, res) => {
    res.status(404).send('Page Not Found');
});

http.get('*', function(req, res){
    res.status(404).render('404', {
        title: 'Error 404'
    });
});

http.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}...`);
});
// app.listen(PORT, () => {
//     console.log(`Server is up on port ${PORT}...`);
// });