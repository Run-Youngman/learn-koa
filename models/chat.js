module.exports = function (mongoose) {
    var schema = mongoose.Schema({
        id: {
            type: Number,
        },
        speaker: {
            type: String,   //指定字段类型
        },
        message:{
            type:String
        }
    });
    return mongoose.model('Chat', schema);
}