const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs'); // usando o ejs como view engine
app.set('views', __dirname + '/views'); // mudando a pasta das views
app.use(express.static('src/public'));
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('./routes');

app.use((req, res, next) => {
    if(req.hostname === 'localhost') {
        next();
    } else {
        res.send('You dont have permission to acess this area.');
    }
});

// injetando as rotas
routes(app);

app.listen(PORT, (error) => {
    if(error) { console.error(`Error on init app: ${error.message}`) }
    console.log(`server listening on port ${PORT}`);
});
