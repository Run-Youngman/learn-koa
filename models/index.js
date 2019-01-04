module.exports = function (instance) {
    return {
        User: require('./login')(instance),
        Employee :require('./employee')(instance)
    }
}