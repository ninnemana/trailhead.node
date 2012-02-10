var express = require('express');
var app = express.createServer();
var nodemailer = require('nodemailer');

app.configure(function(){
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use("/css",express.static(__dirname + '/css'));
    app.use("/img",express.static(__dirname + '/img'));
    app.use("/js",express.static(__dirname + '/js'));
});

app.get('/',function(req,res){
    res.render('landing.ejs');
});

app.get('/hello/:name',function(req,res){
    res.send('hello to '+ req.params.name);    
});

app.post('/',function(req,resp){
    var msg = '';
    console.log('hit function');
    
    nodemailer.SMTP = {
        host: 'smtp.gmail.com',
        port: 465,
        ssl: true,
        use_authentication: true,
        user: 'leighpots@trailheadpottery.com',
        pass: 'weiner27'
    };
    console.log('about to send email');
    nodemailer.send_mail(
        // e-mail options
        {
            sender: req.param('email',null),
            to:'ideas@trailheadpottery.com',
            subject:'New Idea from trailheadpottery.com!',
            html: '<p>' + req.param('idea',null) + '</p>',
            body:req.param('idea',null)
        },
        // callback function
        function(error, success){
            if(success){
                msg = 'Thanks for your idea, I bet it was a great one!';
            }else{
                msg = 'There was an error while sending your idea.';
            }
            console.log('Message ' + success ? 'sent' : 'failed');
        }
    );
    console.log(msg);
    
    resp.render('landing.ejs',{msg:msg});
});

app.listen(process.env.VCAP_APP_PORT || 3000);
console.log("Node started on port 3000");
