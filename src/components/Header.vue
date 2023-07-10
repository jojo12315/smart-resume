<template>
  <div style="line-height: 60px;display: flex;text-align: right; font-size: 12px;">
    <div style="flex: 1; font-size: 18px;text-align: left">
      <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
    </div>
    <el-dropdown>
      <span>王小虎</span>
      <i class="el-icon-setting" style="margin-left: 25px;"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props:{
    collapseBtnClass: String,
    collapse: Boolean
  }
}
</script>

<style scoped>

</style>