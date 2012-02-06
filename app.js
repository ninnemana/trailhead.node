var app = require('express').createServer();
var nodemailer = require('nodemailer');

app.configure(function(){
    //app.use(express.methodOverride());
    //app.use(express.bodyParser());
    app.use(app.router);
});

app.get('/',function(req,res){
    res.send('hello world');
});

app.get('/hello/:name',function(req,res){
    res.send('hello to '+ req.params.name);    
});

app.get('/mail',function(req,resp){
    nodemailer.SMTP = {
        host: 'smtp.gmail.com',
        port: 465,
        ssl: true,
        use_authentication: true,
        user: 'leighpots@trailheadpottery.com',
        pass: 'weiner27'
    };
    nodemailer.send_mail(
        // e-mail options
        {
            sender: 'ninnemana@gmail.com',
            to:'leighpots@trailheadpottery.com',
            subject:'Hello!',
            html: '<p><b>Hi,</b> how are you doing?</p>',
            body:'Hi, how are you doing?'
        },
        // callback function
        function(error, success){
            console.log('Message ' + success ? 'sent' : 'failed');
        }
    );
});

app.listen(process.env.C9_PORT);