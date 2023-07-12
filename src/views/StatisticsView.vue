<template>
  <div id="bg"  style="width:1100px;height: 1100px;margin: 0 auto;">
    <div id="title">数据可视化</div>
    <div class="num">
      <div class="number" :style="{ color: textColor }">简历数量：{{ statistics.user_num }}
      </div>
      <div class="jobnumber" :style="{ color: textColor }">岗位数量：{{ statistics.job_num }}</div>
    </div>

    <div class="main">
      <div id="main">

      </div>
      <div id="outer">
        <div id="job"></div>
        <div class="resumeLenth" :style="{ color: textColor }">简历文本长度可视化</div>
        <div id="img">
          <img :src="imageSrc" alt="My Image">
        </div>
      </div>
    </div>
  </div>
</template>

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
      statistics: [],
      jobs: [],
    }
  },
  methods: {
    statistic() {
      const form = new FormData();

      const options = {
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' }
      };

      options.body = form;

      fetch('http://172.24.92.27:10001/statistics', options)
          .then(response => response.json())
          .then(response => {
            this.statistics = response.result; // 将返回结果赋值给Vue组件的users属性
            console.log(response.result.image_url)
          })
          .catch(err => console.error(err));



    },
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
                  itemStyle: {
                    // 设置节点的颜色，可以使用颜色数组为每个节点设置不同的颜色
                    color: 'green',
                    // 设置节点的边框颜色和宽度
                    borderColor: '#006400',
                    borderWidth: 1
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
      var chartDom1 = document.getElementById('job');
      var myChart1 = echarts.init(chartDom1);
      var option1;


      // 从后端获取数据的异步请求
      fetch('http://172.24.92.27:10001/inquiryJob', options)
          .then(response => response.json())
          .then(data => {
            // 将后端数据应用到节点配置中
            option1 = {
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
                  itemStyle: {
                    // 设置节点的颜色，可以使用颜色数组为每个节点设置不同的颜色
                    color: 'purple',
                    // 设置节点的边框颜色和宽度
                    borderColor: 'purple',
                    borderWidth: 1
                  },
                  data: data.result.map(node => ({
                    name: node.job_type,
                    requirements: node.requirements,
                    responsibility: node.responsibility,
                    label: {
                      show: true
                    }
                  })),
                  draggable: true,

                }
              ],
              tooltip: {
                formatter: function (params) {
                  if (params.dataType === 'node') {
                    const node = params.data;
                    const name = '岗位名称: ' + node.name;
                    const requirements = '岗位职责: ' + node.requirements;
                    const responsibility = '任职要求: ' + node.responsibility;
                    const content = name + '     ' + requirements + '     ' + responsibility;

                    const maxCharPerLine = 50; // 每行最大字符数
                    let formattedContent = '';
                    let currentLine = '';
                    let currentCharCount = 0;

                    // 根据最大字符数进行换行处理
                    for (let i = 0; i < content.length; i++) {

                      currentCharCount++;
                      if (currentCharCount > maxCharPerLine) {
                        formattedContent += currentLine + '<br>';
                        currentLine = '';
                        currentCharCount = 0;
                      }
                      currentLine += content[i];

                    }
                    formattedContent += currentLine; // 添加最后一行
                    console.log(formattedContent)
                    return formattedContent;
                  }
                  return '';
                },
                extraCssText: ' word-wrap: break-word;' // 设置最大宽度和自动换行
              }
            }

            option1 && myChart1.setOption(option1);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }

  },

  mounted() {
    this.statistic();
    this.mychart();

  },
  computed: {
    imageSrc() {
      return 'http://172.24.92.27:8081/images/resume_length.png';
    }
  }
}
</script>
<style>
.headerBg {
  background-color: #eee !important;
}

* {
  margin: 0;
}

#title {
  height: 70px;
  width: 1160px;
  color: #eee;
  font-family: Arial;
  font-size: 40px;
  font-weight: bold;
  margin: auto auto;
  text-align: center;
  margin-left: 20px;


}

.main {

  display: flex;

}

#bg {
  height: 100%;
  width: 100%;
  background: url("../img/background.png");
}

#main {
  background-color: rgba(255, 255, 255, 0.1);
  width: 600px;
  height: 540px;
  color: #eee;
  font-family: Arial;
  font-size: 10px;
  margin-left: 20px;

  flex: 1;


}

.number {
  font-size: 1em;
  font-weight: bold;
  text-align: left;
  padding: 0.5em;
  border-radius: 0.2em;
  border: 1px solid rgb(46, 96, 153);
  width: 100px;
  margin-left: 20px;
  flex: 1;
}

.jobnumber {
  font-size: 1em;
  width: 100px;
  font-weight: bold;
  text-align: left;
  padding: 0.5em;
  border-radius: 0.2em;
  border: 1px solid rgb(46, 96, 153);

  flex: 1;
}

.resumeLenth {
  font-size: 1em;
  width: 100%;
  font-weight: bold;
  text-align: left;
  padding: 0.5em;
  border-radius: 0.2em;
  border: 1px solid rgb(46, 96, 153);

  flex: 1;
}

#outer {
  background-color: rgba(255, 255, 255, 0.1);

  width: 300px;
  height: 540px;

  flex: 1;

}

#job {
  background-color: rgba(255, 255, 255, 0.1);

  width: 100%;
  height: 200px;



}

#img {
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  height: 300px;
  opacity: 0.5;
}

.num {
  display: flex;
  height: 40px;
  width: 100%;
}
</style>