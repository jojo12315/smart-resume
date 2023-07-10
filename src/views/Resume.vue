<template>
  <div>
    <div style="padding: 10px 0;">
      <el-input style="width: 200px;" placeholder="请输入名称" suffix-icon="el-icon-search"></el-input>
      <el-input style="width: 200px;" placeholder="请输入邮箱" suffix-icon="el-icon-search" class="ml-5"></el-input>
      <el-input style="width: 200px;" placeholder="请输入地址" suffix-icon="el-icon-search" class="ml-5"></el-input>
      <el-button type="primary" class="ml-5">搜素</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      <el-button type="danger">批量删除<i class="el-icon-circle-remove-outline"></i></el-button>
      <el-button type="primary">导入<i class="el-icon-bottom"></i></el-button>
      <el-button type="primary">导出<i class="el-icon-top"></i></el-button>
    </div>
    <el-table :data=users border stripe :header-cell-class-name="headerBg">

      <el-table-column prop="user_name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="120">
      </el-table-column>
      <el-table-column prop="school" label="学校" width="200">
      </el-table-column>
      <el-table-column prop="education" label="学历" width="200">
      </el-table-column>
      <el-table-column prop="yearsofwork" label="工作经验" width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary">查看</el-button>
          <el-button type="success">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      users: [],
      headerBg:'headerBg',
    }
  },
  methods: {
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
  created() {
    this.fetchUsers();
  }
}
</script>

<style>
.headerBg {
  background-color: #eee !important;
}
</style>