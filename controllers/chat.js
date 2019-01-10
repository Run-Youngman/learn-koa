var fs = require('fs');
module.exports = {
    'GET /getUsers': async (ctx, next) => {
        ctx.response.type = 'html';
        ctx.response.body = fs.createReadStream('./index.html');
    },
    'POST /creatRoom': async (ctx, next) => {
        // let a = await ctx.models.Counter.find({name: 'nnnname'})
        // create chat
        // let next = a++;
        // let b = await ctx.models.Counter.find({name: 'nnnname'}, {name: 'nnnname', chatid: next})
        var name = ctx.request.body.name || '';
        var owner = ctx.request.body.owner || '';
        var description = ctx.request.body.description || '';
        var member = ctx.request.body.member || '';
        var room = new ctx.models.Room({
            owner,
            name,
            member,
            description,
        })
        let a = await room.save();
        ctx.body = a;
    },
    'GET /rooms': async (ctx, next) => {
        let rst = await ctx.models.Room.find();
        ctx.response.body = rst;
    },
};
