/*Main Express File */

/*Const Declarations */
const express = require('express');
const app = express();
const routes = require('./routes/index');
const books = require('./routes/books');
const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

/*view & static serve setup */
app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

/*Routing Section*/
app.use('/', routes);
app.use('/books', books);

/*Handle 404-error */
app.use((req,res,next) => {
    res.status = 404;
    console.log("Status code 404 was returned for " + req.url);
    res.render("page-not-found")
});

/*Render error page */
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500);
    res.render("error");
});

/*Begin Listening*/
sequelize.sync().then(() => {
    app.listen(3000);
    console.log('Now listening on localhost:3000');
});