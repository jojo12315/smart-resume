<template>
  <div>
    <div class="resume-wrap">
      <div class="resume-header">
        <div class="resume-name">姓名：<span>{{resume.user_name}}</span></div>
        <ul class="resume-sample-info clear-fix">
          <li class="info-character">工作经验：<span>{{resume.yearsofwork}}</span></li>
          <li class="line"></li>
          <li class="info-character info-line">年龄：<span>{{resume.age}}</span></li>
          <li class="line"></li>
          <li class="info-character info-line">学历：<span>{{resume.education}}</span></li>
          <li class="line"></li>
          <li class="info-character info-line">毕业院校：<span>{{resume.school}}</span></li>
        </ul>
      </div>
      <div class="resume-body">
        <div class="resume-text">
          {{resume.text}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import request from "@/utils/request";
import axios from "axios";

export default {
  name: "ResumeView",
  data(){
    return{
      resume:{},
    }
  },
  methods:{
    selectByName(name){

      axios.post('http://172.24.92.27:10001/inquiryUserNode', {
        name: name
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        transformRequest: [function (data, headers) {
          return JSON.stringify(data);
        }]
      })
          .then(response => {
            this.resume = response.data.result
            // 处理响应数据
          })
          .catch(error => {
            // 处理错误
          });


    }
  },
  mounted() {
    let name = this.$route.params.name;
    this.selectByName(name)
  }
}
</script>

<style scoped>
.resume-wrap{
  width: 800px;
  margin: 0 auto;
}
.resume-header{
  min-height: 160px;
  padding: 30px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
}
.resume-body{
  margin-top: 20px;
  padding: 30px;
  background-color: #fff;
  height: 500px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  overflow-y:auto
}
.resume-name{
  height: 50px;
  line-height: 50px;
  font-size: 36px;
  font-weight: bold;
}
.resume-sample-info{
  margin-top: 10px;
  list-style: none;
}
.info-character{
  float: left;
  min-width: 170px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.info-line{
  text-align: center;
}
.line{
  float: left;
  position: relative;
  width: 2px;
  height: 20px;
  line-height: 7px;
  background-color: #999;
  top: 5px;
}
.clear-fix:after{
  content:'.';
  display: block;
  clear: both;
  overflow: hidden;
  height: 0;
}

</style>