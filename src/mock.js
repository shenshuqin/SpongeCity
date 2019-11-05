// // 引入mockjs
const Mock = require('mockjs');
const Random = Mock.Random;
var arr=[
    {nid: 1, name: "湖南文理学院水景广场", location: "111.679034,29.053112", status: 1},
    {nid: 3, name: "湖南文理学院体育场", location: "111.680255,29.05406", status: 1}
];

// 模拟数据列表
// var arr = [];
// for(let i = 0 ; i < 10 ; i++){
//     let newArticleObject = {
//         name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
//         content: Random.csentence(5, 30), // Random.csentence( min, max )
//         id: i
//     }
//     arr.push(newArticleObject);
// }


// 数据的删除操作
let list = function(options){
    // console.log(options.type);
    let rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            let nid = parseInt(JSON.parse(options.body).params.nid); // 获取请求的id，将options.body转换为JSON对象
            arr = arr.filter(function(val) {
                return val.nid != nid;  // 过滤掉前台传过来的id对应的相应数据，并重新返回
            });
            break;
        default:
            break;
    }
    return {
        data: arr
    }
}
Mock.mock('/list',/get|post/i,list);

// 数据的添加操作
let listAdd = function(options){
//  console.log("传过来的数据"+JSON.parse(options.body).params.obj);
    let rtype = options.type.toLowerCase(); //获取请求的类型
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            let obj = JSON.parse(options.body).params.obj;
            // console.log("数据获取"+ obj);
            arr = arr.concat(obj);  // 将前台返回来的数据，拼接到数组中。
            break;
        default:
            break;
    }
    return {
        data: arr
    }
}
Mock.mock('/listAdd',/get|post/i,listAdd);

// 数据的修改操作
let listUpdate = function(options){
    let rtype = options.type.toLowerCase(); //获取请求的类型
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            let obj = JSON.parse(options.body).params.obj;
            // console.log(JSON.parse(options.body).params);
            // let id = parseInt(JSON.parse(options.body).params.obj.id);
            arr = arr.map(val => {  // 将需要替换的数据替换掉
                return val.nid === obj.nid ? obj : val ;
            });
            break;
        default:
            break;
    }
    return {
        data: arr
    }
}
Mock.mock('/listUpdate',/get|post/i,listUpdate);
