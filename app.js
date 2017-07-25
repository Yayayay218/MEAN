var express = require('express');
var app = express();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var paginate 	= require('express-paginate');
var swaggerUi 	= require('swagger-ui-express');

var JsonRefs 	= require('json-refs');
var YAML 		= require('js-yaml');

//Bring the data model
require('./app_server/models/db');

var routesApi = require('./app_server/routes/index');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
app.use(cookieParser());
app.use(paginate.middleware(10, 50)); // limit=10,  maxLimit=50

app.use(express.static(path.join(__dirname, 'node_modules/swagger-ui-express/static')));
app.use(express.static(path.join(__dirname, 'views')));

//
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'app_server/uploads')));

var optionsRef 	= {
    filter: ['relative', 'remote'],
    loaderOptions: {
        processContent: function (res, cb) {
            cb(undefined, YAML.safeLoad(res.text));
        }
    }
};

JsonRefs.resolveRefsAt('./swagger/index.yaml', optionsRef).then(function (results) {
    // console.log(results.resolved);
    // console.log("================refs ",results.refs);
    app.get('/api-docs', swaggerUi.serve, swaggerUi.setup(results.resolved));
}, function (err) {
    console.log(err.stack);
});

app.use('/api', routesApi);




module.exports = app;
