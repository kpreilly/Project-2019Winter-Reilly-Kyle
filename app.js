var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');

/* View Engine Setup */

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret:'randpassString'}));
app.set('port',60001);

/* Routes */

app.get('/',function(req,res){
    res.render('index',{title:'Home Page',heading:'Home Page'});
});

app.get('/funThings',function(req,res){
    res.render('otherFunThings',{title:'Fun Things'});
});

app.get('/programming',function(req,res){
    res.render('programming',{title:'Programming'});
});

app.get('/myMusic',function(req,res) {
    res.render('myMusic',{title:'Music'});
})
/* Error Processing */

app.use(function(req,res){
    res.status(404);
    res.render('404',{title:'404 Error'});
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500',{title:'500 Error'});
});

app.listen(app.get('port'), function(){
    console.log('Express started on localhost:' + app.get('port') + '; press Ctrl-C to abort.');
});