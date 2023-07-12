<template>
  <div>
    <div style="padding: 10px 0;">
      <el-input style="width: 200px;" placeholder="请输入名称" suffix-icon="el-icon-search"></el-input>
      <el-input style="width: 200px;" placeholder="请输入邮箱" suffix-icon="el-icon-search" class="ml-5"></el-input>
      <el-input style="width: 200px;" placeholder="请输入地址" suffix-icon="el-icon-search" class="ml-5"></el-input>
      <el-button type="primary" class="ml-5">搜素</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" @click="dialogVisible = true">新增<i class="el-icon-circle-plus-outline"></i></el-button>
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
          <el-button type="primary" @click="resumeView(scope.row.user_name)">查看</el-button>
          <el-button type="success">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[5, 10, 15, 20]" :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>

    <el-dialog
        title="简历录入"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose">
      <center>
      <el-upload
          class="upload-demo"
          drag
          action="http://172.24.92.27:10001/file2text"
          :on-success="handleSuccess"
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      </center>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      users: [],
      headerBg:'headerBg',
      dialogVisible: false
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSuccess(res){
        if(res.status){
          this.fetchUsers()
          this.dialogVisible=false
        }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    resumeView(name){
      this.$router.push({name: 'resumeView',params:{ name:name}});
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
  created() {
    this.fetchUsers();
  }
}
</script>

<style scoped>
.headerBg {
  background-color: #eee !important;
}
.upload-demo{
}
</style>