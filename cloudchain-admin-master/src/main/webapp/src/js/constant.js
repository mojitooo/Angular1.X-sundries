angular.module('MetronicApp')
    .constant('CONSTANT', {
        BIS_TYPE:[
            {type:0,name:'目录'},
            {type:1,name:'页面'},
            {type:2,name:'子页面'},
            {type:3,name:'post请求'},
            {type:4,name:'get请求'},
            {type:5,name:'分页请求'},
        ],
        SEX_TYPE:[
            {type:0,name:'女'},
            {type:1,name:'男'}
        ],
        USER_TYPE:[
            {type:1,name:'分销网点'},
            {type:2,name:'会员'},
            {type:3,name:'司机'},
            {type:4,name:'货主'},
            {type:5,name:'伙伴'},
        ]
    })
