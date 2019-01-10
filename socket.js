
var onlineUsers = {}; // 在线用户
var onlineCount = 0; // 在线人数
var lock = {};
var user = ''
function socket (io) {
    io.on('connection', function(socket) {
        var toUser = '';
        var fromUser = '';
        var msg = ''
        socket.emit('open') // 广播打开socket连接，客户端打印连接状态
        socket.on('addUser', function(username, roomname) {
            if (! onlineUsers.hasOwnProperty(username)) {
                onlineUsers[username] = socket;
                onlineCount = onlineCount +1;
            }
            console.log(onlineUsers[username].id) // 建立连接后，用户点击不同通讯录创建同样的socket对象
            // user = username; // 代指当前连接用户
            socket.on('sendMsg', function(obj) {
                console.log(obj)
                fromUser = obj.fromUser;
                for (user in onlineUsers) {
                    console.log(onlineUsers)
                    if (user != fromUser) {
                        obj.fromUser = '群聊' // 如果接收方不等同与发送方，那消息来源便是群聊
                    } else {
                        obj.fromUser = user // 发送方就是接收方，消息来源就是自己
                    }
                    onlineUsers[user].emit('to' + user, obj);
                }
            })
        })
        socket.on('disconnect', function () {
            console.log('断开连接')
            onlineCount = onlineCount - 1;
            //遇到的坑 每次都要删除该socket连接 否则断开重连还是这个socket但是client端socket已经改变
            delete onlineUsers[fromUser]
        })
    })
}

module.exports = socket;