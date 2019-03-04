/*
    TODO:
        ___ Need a scroll box containing information, with scrollbar
        ___ CV download button (can open in new tab or be downloaded)
        ___ Link to my personal linkedin
*/

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
    loc = '/images/carouselImages/'
    var context = {
        title: 'Home Page',
        imgs: [
            {
                file: loc+'skateboardOnRoad.jpg',
                pos: '1'
            },
            {
                file: loc+'darkBar.jpg',
                pos: '2'
            },
            {
                file: loc+'kirkwood.jpg',
                pos: '3'
            },
            {
                file: loc+'selfPortrait.jpg',
                pos: '4'
            },
            {
                file: loc+'sunset.jpg',
                pos: '5'
            }
        ]
    };
    res.render('index',context);
});

app.get('/funThings',function(req,res){
    res.render('otherFunThings',{title:'Fun Things'});
});

app.get('/programming',function(req,res){
    res.render('programming',{title:'Programming'});
});

app.get('/myMusic',function(req,res) {
    var musicInfo = {
        title: 'Music',
        songs: [
            {
                band: 'Hva',
                title: 'Cleveland',
                song: './music/Cleveland.mp3'
            },
            {
                band: 'Hva',
                title: 'Sacred And Profane',
                song: './music/Sacred_And_Profane.mp3'
            },
            {
                band: 'Love Ritual',
                title: 'Snek At The Altar',
                song: './music/Snake_At_The_Altar.mp3'
            },
            {
                band: 'Love Ritual',
                title: 'Talk About It',
                song: './music/Talk_About_It.mp3'
            }
        ]
    };
    res.render('myMusic',musicInfo);
});

/* Error Processing */

app.use(function(req,res){
    res.status(404);
    res.render('404',{title:'404 - Page Not Found'});
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500',{title:'500 Error'});
});

app.listen(app.get('port'), function(){
    console.log('Express started on localhost:' + 
    app.get('port') + '; press Ctrl-C to abort.');
});