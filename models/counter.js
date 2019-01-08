module.exports = function (mongoose) {
    var schema = mongoose.Schema({
        chatid: {
            type: Number,   //指定字段类型
        },
        spare1id:{
            type: Number,
        },
        spare2id:{
            type: Number
        }
    });
    return mongoose.model('Counter', schema);
}