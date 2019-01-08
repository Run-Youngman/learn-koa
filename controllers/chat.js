var fs = require('fs');
module.exports = {
    'GET /getUsers': async (ctx, next) => {
        ctx.response.type = 'html';
        ctx.response.body = fs.createReadStream('./index.html');
    },
    'POST /creatRoom': async (ctx, next) => {
        let a = await ctx.models.Counter.find({name: 'nnnname'})
        // create chat
        let next = a++;
        let b = await ctx.models.Counter.find({name: 'nnnname'}, {name: 'nnnname', chatid: next})
        
        var id = -1;
        var speaker = 'admin';
        var message = 'Hello World!';
        var user = new ctx.models.Chat({
            id,
            speaker,
            message
        })
        let a = await user.save();
        ctx.response.body = a;
    }
};
