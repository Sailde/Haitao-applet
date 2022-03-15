// pages/goods_list/index.js
Page({
    data: {
        titleList:[
            {id:"01",title:"综合",isActive:true},
            {id:"02",title:"销量",isActive:false},
            {id:"03",title:"价格",isActive:false}
        ]
    },
    onLoad: function (options) {
        console.log("options",options);
    },
})