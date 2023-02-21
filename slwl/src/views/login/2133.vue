<template>
  <div>
    <div class="shadow"></div>
    <video
      autoplay
      muted
      loop
      src="https://slwl-admin.itheima.net/static/media/video.3cf57b17.mp4"
    ></video>
    <el-form>
      <el-image
        src="https://slwl-admin.itheima.net/static/img/logo1.33ef7fa0.png"
        class="logo"
      ></el-image>
      <el-form-item>
        <el-input
          v-model="form.account"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          prefix-icon="el-icon-lock"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.code"
          prefix-icon="el-icon-s-claim"
          placeholder="验证码"
        >
        </el-input>
        <div class="img" @click="refiresh">
          <el-image :src="url" fit="contain"></el-image>
        </div>
      </el-form-item>
      <el-button type="danger" @click="submit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { getVerifyApi } from "@/api/login";

export default {
  name: "login-page",
  data() {
    return {
      form: {
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
    //登录  将token保存到vuex中
    async submit() {
      // this.$store.dispatch("user/login", this.form);
      this.login(this.form);
      this.$router.push("/");
    },
    //验证码图片刷新
    refiresh() {
      this.getVerify();
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
body {
  position: relative;
  .shadow {
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1a1c41;
    opacity: 0.3;
  }
  video {
    position: absolute;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
  }
  .el-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 450px;
    height: 467px;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 36px 40px;
    border-radius: 10px;
    .logo {
      padding: 0 80px;
    }
    .el-button {
      width: 100%;
      height: 54px;
    }
    .el-image {
      width: 370px;
      height: 58px;
      margin-bottom: 22px;
      text-align: center;
      .el-image__inner {
        height: 54px;
      }
    }
    .el-form-item {
      position: relative;
      height: 50px;
      /deep/ .el-input__inner {
        height: 50px !important;
      }
      .img {
        position: absolute;
        top: 9px;
        right: 0;
        width: 71px;
        height: 32px;
        cursor: pointer;
        // background-color: aqua;
        .el-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
