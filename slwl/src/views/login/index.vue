<template>
  <div>
    <video src="../../assets/video.3cf57b17.mp4" loop muted autoplay  class="video"></video>
    <div class="login-box">
      <div class="title"><img src="../../assets/logo1.33ef7fa0.png" alt=""></div>
      <el-form :model="loginForm" class="login-form">
        <el-form-item   >
      <el-input v-model="loginForm.account" prefix-icon="el-icon-user-solid" >111</el-input>
     </el-form-item>
     <!-- 密码区 -->
     <el-form-item >
      <el-input v-model="loginForm.password"  type="password" prefix-icon="el-icon-unlock" suffix-icon="el-icon-view"></el-input>
     </el-form-item>
     <el-form-item >
     
      <el-input   prefix-icon="el-icon-position" v-model="loginForm.code"></el-input>
      <el-image :src="url" @click="refsh"></el-image>
      </el-form-item>  
     <!-- 按钮 -->
     <el-form-item >
      <el-button type="danger" class="btns" @click="login">登录</el-button> 
     
     </el-form-item>
    </el-form>
    
    </div>
  </div>
</template>

<script>
import { getVerifyApi, loginApi } from '@/api/login'

export default {
  name: "login-page",
  data() {
    return {
      loginForm: {
        account: "shenlingadmin",
        password: "123456",
        code: "",
        key: "252454C2BF564050C72B986E1676547324758",
      },
      url: "",
    };
  },
  created() {
    this.getVerify();
  },
  methods: {
   async login() {
    let res =  await loginApi(this.loginForm)
      console.log(res);
      if (res.code !== 200) {
        this.$message.error(res.msg)
      } else {
        this.$message.success('登录成功')
      }
      this.$store.commit('user/token', res.data.token.token)
     this.$router.push('/')
    },
    refsh() {
      this.getVerify();
    },
   
    //调用验证码
    async getVerify() {
      const res = await getVerifyApi({
        0: "252454C2BF564050C72B986E1676547324758",
        key: "252454C2BF564050C72B986E1676547324758",
      });
      const blob = new Blob([res]);
      const url = window.URL.createObjectURL(blob);
      this.url = url;
    },
    
  },
  computed: {},
};
</script>

<style scoped lang="less">
.el-image{
  right: 95px;
  top: 17px;
  position: absolute;
}
.btns {
  width: 420px;
  height: 70px;
  margin-left: 100px;
  font-size: 25px;
}
/deep/.el-input {

  height: 60px;
  width: 70%;
  margin: 10px 100px;
 
  .el-input__icon {
    font-weight: 700;
  }
  .img {
    width: 50px;
    background-color: red;
  }
}
/deep/ .el-input__inner{
  height: 100%;
  // width: 70%;
  // margin: 10px 100px;
  // .el-input__icon {
  //   font-weight: 700;
  // }
}
.video {
  position: fixed;
 

width: 100%;
}
.login-box{
  position: relative;
  .login_from {
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px
   
    
  }
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 15px;
  width: 600px;
  background-color: #fff;
  height: 600px;
  .title{
    height: 60px;
    width: 370px;
    margin: 30px 180px;
    margin-bottom: 50px;

    img {
      width: 230px;
      height: 70px;
     
    }
  }
}
</style>