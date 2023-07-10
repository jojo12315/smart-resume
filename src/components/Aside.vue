<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden;"
           background-color="rgb(48,65,86)" text-color="#fff" active-text-color="ffd04b" :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px;line-height: 60px;text-align: center">
      <span style="color: #fff;font-weight: bold" v-show="textShow">后台管理</span>
    </div>
    <el-menu-item index="/">
      <template slot="title"><i class="el-icon-message"></i><span slot="title">主页</span></template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i><span slot="title">系统管理</span></template>
      <el-menu-item-group>
        <template slot="title">数据管理</template>
        <el-menu-item index="/resume">简历查询</el-menu-item>
        <el-menu-item index="/statisticsView">节点</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="2-4">
        <template slot="title">功能管理</template>
        <el-menu-item index="/resumeAnalysis">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props:{
    isCollapse: Boolean,
    textShow: Boolean,
  }
}
</script>

<style scoped>

</style>