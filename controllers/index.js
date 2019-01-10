// index:

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome'
        });
    },
    'GET /base': async (ctx, next) => {
        ctx.render('base.html', {
            title: 'base'
        })
    },
    'POST /login': async (ctx, next) => {
        var
        username = ctx.request.body.username || '',
        password = ctx.request.body.password || '';
        var rst = await ctx.models.Employee.find({name: username, password: password});
        if (rst.length > 0) {
            ctx.response.type = 'json';
            ctx.response.body = { failed: false,reason: 'username matched the password'};
        } else {
            ctx.response.type = 'json';
            ctx.response.body = { failed:true,reason:'username and password not matched'};
        }
    }
};
