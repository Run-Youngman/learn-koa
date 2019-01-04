module.exports = function (mongoose) {
    var schema = mongoose.Schema({
        userName: {
            type: String,   //指定字段类型
            required:true,  //判断数据是否必须（如果存在一条数据）
            unique:true   //是否为不可重复
        },
        pass:{
            type:String
        }
    });
    return mongoose.model('User', schema);
}