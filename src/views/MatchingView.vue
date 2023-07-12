<template>
    <!--    <div id="main" style="width:1800px;height: 800px;margin: 0 auto;">-->

            <div id="outer">
                <div id="main">
                    <div id="header">
                        <h1 class="my-title">
                            <slot>人岗匹配</slot>
                        </h1>
                    </div>
                    <div style=" border-top: 2px solid #ccc;">

                        <form @submit.prevent="submitForm" class="form">
                            <div id="top"> <span style="font-weight: 700;font-size: 20px;">请输入简历信息：</span>
                                <span style="font-weight: 500;font-size: 15px;float: right;color: #036fe2;text-decoration: underline;
cursor: pointer;" @click="getData">随机示例</span>
                            </div>

                            <textarea id="message" v-model="message"></textarea>
                            <input type="file" ref="fileInput" style="display: none" @change="onFileChange">
                            <div id="upload" @click="selectFile"><svg width="14" height="12" viewBox="0 0 14 12"
                                    xmlns="http://www.w3.org/2000/svg" class="demo-matching-icon-upload">
                                    <path
                                        d="M1 6v5h12V6h1v6H0V6h1zm6-6l3.707 3.707-.707.707-2.5-2.5v7.793h-1V1.914L4 4.414l-.707-.707L7 0z"
                                        fill="#1A73E8" fill-rule="evenodd"></path>
                                </svg>上传简历</div>

                        </form>
                    </div>

                </div>

                <div id="show" class="border">
                    <div>
                        <ul class="my-list">

                            <li v-for="(item, index) in this.data" :key="index">
                                <span class="number" style="font-size: 22px;">{{ item.num }}</span> <span
                                    style="font-size: 20px;">{{ item.job_type }}</span> <span style="font-size: 15px;">{{
                                        item.similar }}</span>
                            </li>
                        </ul>

                        <div id="sub" @click="recommendation">{{ "匹配结果" }}

                        </div>

                    </div>


                </div>

            </div>

</template>
<style></style>
<script>

export default {
    name: 'MatchingView',
    components: {

    },
    data() {

        return {
            textShow: true,
            data: '',
            message: ""
        }
    },
    methods: {
        getData() {
            const form = new FormData();

            const options = {
                method: 'POST',
                headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' }
            };

            options.body = form;

            fetch('http://172.24.92.27:10001/randomUser', options)
                .then(response => response.json())
                .then(response => {
                    this.message = response.result; // 将返回结果赋值给Vue组件的users属性

                })
                .catch(err => console.error(err));

        },
        selectFile() {
            this.$refs.fileInput.click();
        },
        recommendation() {
            let formData = new FormData();
            formData.append('string1', this.message);

            fetch('http://172.24.92.27:10001/recommendation', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
                .then(response => {
                    this.data = response.result
                    console.log(response.result);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        onFileChange(event) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);

            fetch('http://172.24.92.27:10001/file2text', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
                .then(response => {
                    this.message = response.result.text;
                    console.log(response.result);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {



    }
}
</script>
<style>
.headerBg {
    background-color: #eee !important;
}

#top::before {
    content: "";
    display: inline-block;
    margin-right: 10px;
    width: 3px;
    height: 16px;
    background: #000;
    -webkit-transform: translateY(1px);
    -moz-transform: translateY(1px);
    -ms-transform: translateY(1px);
    transform: translateY(1px);
}

* {
    margin: 0px;
    padding: 0px;
}

#outer {
    height: 200px;
    width: 750px;
    margin: 0px auto;

    display: flex;

}

#form {

    display: block;

    line-height: 24px;
    padding: 8px 20px 0;
}

textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: none;
    outline: none;
    resize: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
    height: 490px;
    width: 500px;
    background-color: white;

}

#main {
    flex: 1;
}

#show {
    width: 300px;
    height: 518px;
    margin-top: 50px;
    background-color: rgb(249, 249, 249);
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}



#header {
    height: 50px;
    width: 500px;
}

#message {
    border: 1px solid #ccc;
}

.border {
    border: 2px solid #ccc;
    border-radius: 10px;
}

.my-list {
    list-style: none;
    /* 取消默认的列表样式 */
    padding: 0;
    /* 取消列表的内边距 */
    margin: 0;
    /* 取消列表的外边距 */
}

.my-list li {
    padding: 5px 10px;
    /* 添加列表项的内边距 */
    border-bottom: 1px solid #ccc;
    /* 添加列表项的底部边框 */
    font-size: 16px;
    /* 设置字体大小 */
    line-height: 1.5;

}

.number {
    /* 为数字设置从深到浅的颜色 */
    background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.my-list li:last-child {
    border-bottom: none;
    /* 最后一个列表项不需要底部边框 */
}

.my-title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    text-align: center;
    text-transform: uppercase;
}

#upload {
    display: inline-block;
    width: 106px;
    height: 30px;
    border: 1px solid #036fe2;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    color: #036fe2;
    cursor: pointer;
}

#sub {
    height: 38px;
    width: 140px;
    line-height: 38px;
    text-align: center;
    font-size: 16px;
    color: white;
    background-color: #036fe2;
    cursor: pointer;
    /* float: right; */
    margin-bottom: 20px;

}
</style>
