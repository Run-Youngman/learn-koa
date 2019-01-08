module.exports = function (instance) {
    return {
        User: require('./login')(instance),
        Employee :require('./employee')(instance),
        Chat :require('./chat')(instance),
        Room :require('./rooms')(instance),
        Counter :require('./counter')(instance),
    }
}