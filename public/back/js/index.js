$(function(){
           // 柱状图
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.querySelector('.echarts-left'));

            // 指定图表的配置项和数据
            var option1 = {
                title: {
                    text: '2019年注册人数'
                },
                tooltip: {},
                legend: {
                    data:['月份','销量']
                },
                xAxis: {
                    data: ["1月","2月","3月","4月","5月","6月"]
                },
                yAxis: {},
                series: [{
                    name: '月份',
                    type: 'bar',
                    data: [54, 23, 45, 12, 44, 21]
                },{
                    name: '销量',
                    type: 'bar',
                    data: [32, 22, 31, 19, 14, 22]
                }]
            };
            myChart.setOption(option1);


            // 饼图
            // 使用刚指定的配置项和数据显示图表。
            var myChart = echarts.init(document.querySelector('.echarts-right'));

            // 指定图表的配置项和数据
            option2 = {
                title : {
                    text: '热门品牌销量',
                    subtext: '2019年1月',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['耐克','阿迪','纽新百伦','红蜻蜓','达芙妮']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'耐克'},
                            {value:310, name:'阿迪'},
                            {value:234, name:'纽新百伦'},
                            {value:135, name:'红蜻蜓'},
                            {value:1548, name:'达芙妮'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
    
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option2);
})