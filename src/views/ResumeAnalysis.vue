<template>
  <div style="width: 1500px;margin: 0 auto">
      <div>
        <div>
          <el-upload
              :on-success="handleAvatarSuccess"
              drag
              action="http://172.24.92.27:10001/file2text"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">简历解析</div>
          </el-upload>
        </div>
        <div></div>
      </div>
  </div>
</template>

<script>
export default {
  name: "ResumeAnalysis",
  methods:{
    handleAvatarSuccess(){

    }
  }
}
</script>

<style scoped>

</style>