<template>
  <!--    <div id="main" style="width:1800px;height: 800px;margin: 0 auto;">-->

  <!--    </div>-->
  <el-container style="min-height: 100vh;">
    <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246);box-shadow: rgba(0 , 21 , 41,0.35 )">
      <Aside :isCollapse="isCollapse" :textShow="textShow" />
    </el-aside>

    <el-container>
      <el-header style="border-bottom: 1px solid #ccc;">
        <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" />
      </el-header>

      <el-main style="background-color: rgba(244,246,249,0.89)">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<style></style>
<script>
// @ is an alias to /src
import * as echarts from 'echarts';
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
export default {
  name: 'HomeView',
  components: {
    Aside,
    Header
  },
  data() {
    return {
      users: [],
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      textShow: true,
      headerBg: 'headerBg'
    }
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.textShow = false
      } else {
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.textShow = true
      }
    },
    fetchUsers() {
      const form = new FormData();

      const options = {
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' }
      };

      options.body = form;

      fetch('http://172.24.92.27:10001/inquiryUser', options)
          .then(response => response.json())
          .then(response => {
            this.users = response.result; // 将返回结果赋值给Vue组件的users属性
          })
          .catch(err => console.error(err));
      console.log(this.users)
    }



  },
  mounted() {
    this.fetchUsers();
  }
}
</script>
