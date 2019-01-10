module.exports = function (mongoose) {
    var schema = mongoose.Schema({
        name: {
            type: String,   //指定字段类型
            required:true,  //判断数据是否必须（如果存在一条数据）
            unique:true   //本公司不招收同名字的两个人
        },
        password: {
            type:String
        },
        age:{
            type:String
        },
        salary:{
            type:String
        },
        phone:{
            type:String
        },
    });
    return mongoose.model('Employee', schema);
}