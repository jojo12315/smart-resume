<template>
  <div  style="width:1100px;height: 1100px;margin: 0 auto;">
    <div id="main" style="width:1000px;height: 1000px;margin: 0 auto;">

    </div>
  </div>
</template>
<style></style>
<script>
// @ is an alias to /src
import * as echarts from 'echarts';
export default {
  name: 'StatisticsView',
  components: {

  },
  data() {

    return {
      users: [],
    }
  },
  methods: {
    mychart() {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      const options = {
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' }
      };

      // 从后端获取数据的异步请求
      fetch('http://172.24.92.27:10001/inquiryUser', options)
          .then(response => response.json())
          .then(data => {
            // 将后端数据应用到节点配置中
            option = {
              series: [
                {
                  type: 'graph',
                  layout: 'force',
                  symbolSize: 50,
                  roam: true,
                  force: {
                    gravity: 0.01,
                    edgeLength: 100,
                    repulsion: 20
                  },
                  data: data.result.map(node => ({
                    name: node.user_name,
                    age: node.age,
                    education: node.education,
                    school: node.school,
                    yearsofwork: node.yearsofwork,
                    label: {
                      show: true
                    }
                  })),
                  draggable: true,

                }
              ],
              tooltip: {
                formatter: function (params) {

                  var node = params.data;
                  console.log(node)
                  return '姓名: ' + node.name + '<br>年龄: ' + node.age + '<br>教育: ' + node.education + '<br>学校: ' + node.school +
                      '<br>工作经验: ' + node.yearsofwork;
                }
              }
            };

            option && myChart.setOption(option);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
  },
  mounted() {
    this.mychart();
  }
}
</script>
