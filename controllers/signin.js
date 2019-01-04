// sign in:
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config')
smtpTransport = nodemailer.createTransport(smtpTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));

module.exports = {
    'POST /signin': async (ctx, next) => {
        var
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';
        if (email === 'admin@example.com' && password === '123456') {
            ctx.render('signin-ok.html', {
                title: 'Sign In OK',
                name: 'Mr Node'
            });
        } else {
            ctx.render('signin-failed.html', {
                title: 'Sign In Failed'
            });
        }
    },
    'POST /zhuce': async (ctx, next) => {
        var userName = ctx.request.body.userName || '';
        var pass = ctx.request.body.pass || '';
        var user = new ctx.models.User({
            userName:userName,
            pass:pass
        })
        await user.save();
        ctx.response.body = { success: 'regist success!' };
        // smtpTransport.sendMail({
        //     from: config.email.user,
        //     to: email,
        //     subject: 'you got an email',
        //     html:'<b>Hello World !</b>'
        // }, function (error, response) {
        //     if (error) {
        //         console.log(error);
        //     }else{
        //         console.log('发送成功')
        //     }
        // });
    },
};
