const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const path = require('path');

//Database
const db = require('./config/database')


// Test db
db.authenticate()
    .then(() => console.log('Database is connect...'))
    .catch((err) => console.log('Error: ', err));


const app = express();

//Handlebars

app.engine('handlebars', exphbs.engine(({ defaultLayout: 'main' })));
app.set('view engine', 'handlebars');

//Body parser 
app.use(bodyParser.urlencoded({extended:false}));


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index routes
app.get('/', (req, res) => {
    res.render('index', { layout: 'landing' });
});

//Git routes
app.get('/', (req, res) => res.send('INDEX'))

app.use('/gigs', require('./routes/gigs'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running at ${PORT}`));

