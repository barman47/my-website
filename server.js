const express = require('express');
const app = express();
const path = require('path');

const PORT  = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get((req, res) => {
    res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}...`);
});