const express = require('express');
const secure = require('express-force-https');
const app = express();
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const exphbs = require('express-handlebars');
const favicon = require('express-favicon');
const path = require('path');

const PORT  = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'public')

app.use(express.static(publicPath));
app.use(secure);

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
    res.render('home', {
        title: 'Uzoanya Dominic',
        year: new Date().getFullYear()
    });
});

app.post('/email', (req, res) => {
    const messageContent = `
    <h3>Hello Dominic I need your Services</h3>
    <p>From: <strong>${req.body.name}</strong></p>
    <p>Sender: <strong>${req.body.email}</strong></p>
    <br>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);


    const msg = {
        to: 'nomsouzoanya@yahoo.co.uk',
        from: req.body.email,
        subject: 'New Contact Request',
        html: messageContent
      };

      sgMail.send(msg).then(() => {
          console.log('Message Sent Successfully');
          res.status(200).end()
      }).catch((err) => {
            return console.log(err);
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