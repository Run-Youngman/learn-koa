module.exports = function (mongoose) {
    var schema = mongoose.Schema({
        name: {
            type: String,   //指定字段类型
            required:true,  //判断数据是否必须（如果存在一条数据）
            unique:true   //同时只存在一个同名房间
        },
        owner: {
            type: String
        },
        description: {
            type: String
        },
        member:{ // 群内人员
            type: [{name: String}]
        },
        // maxMember:{ // 最大人数
        //     type: Number
        // },
    });
    return mongoose.model('Room', schema);
}