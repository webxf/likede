<template>
  <div id="login">
    <div class="login-form">
      <el-form
        ref="loginform"
        :model="loginform"
        label-width="80px"
        :rules="loginRule"
      >
        <img src="@/assets/likeed.png" alt="" class="icon-img" />
        <el-form-item prop="loginName">
          <el-input
            v-model="loginform.loginName"
            placeholder="请输入账号"
            prefix-icon="el-icon-mobile-phone"
        /></el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginform.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            :type="passwordform"
          >
          </el-input>
          <svg-icon
            class="svgShow"
            @click="showeyes"
            :icon-class="passwordform == 'password' ? 'eye' : 'eye-open'"
          ></svg-icon>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginform.code"
            placeholder="请输入验证码"
            prefix-icon="el-icon-key"
          >
            <div slot="suffix">
              <img
                :src="imgBanner"
                alt=""
                class="verification"
                @click="changeImg"
              />
            </div>
          </el-input>
        </el-form-item>
        <!-- <el-form-item> -->
        <el-button type="primary" @click="loginBtn" :loading="loading"
          >登录</el-button
        >
        <!-- </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import { code } from "@/api/user";

export default {
  data() {
    return {
      // 数据对象
      loginform: {
        // 账号
        loginName: "admin",
        // 密码
        password: "admin",
        code: "", // 验证码
        //验证码token
        //登陆类型
      },
      input: "",
      // 校验规则 {key:value}
      loginRule: {
        loginName: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          // {
          //   pattern: /^1[3-9]\d{9}$/, // 以1开头，第二位为3-9，最后9位数
          //   trigger: "blur",
          //   message: "账号格式不正确",
          // },
        ], // 账号校验
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          // {
          //   min: 6,
          //   max: 16,
          //   trigger: "blur",
          //   message: "密码长度6-16位",
          // },
        ], // 密码校验
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
      },
      imgBanner: "",
      loginFotmList: {},
      codeToken: "",
      passwordform: "password", //密码类型
      loading: false,
    };
  },
  computed: {},
  created() {
    this.changeImg();
  },

  methods: {
    //添加点击事件，获取随机的验证码
    async changeImg() {
      //获取验证码

      //获取随机数
      const random = Math.random();

      //发送请求，获取验证码接口数据
      const { data } = await code(random);
      this.imgBanner = URL.createObjectURL(data);
      //将随机数赋值给codeToken
      this.codeToken = random;
      // console.log(this.codeToken);
    },
    // 通过$refs来拿到form元素标签，然后调用validate
    async loginBtn() {
      this.loading = true;
      this.loginFotmList = {
        loginName: this.loginform.loginName,
        password: this.loginform.password,
        code: this.loginform.code,
        clientToken: this.codeToken,
        loginType: 0,
      };
      //拿到form表单框，表单校验
      await this.$refs.loginform.validate(async () => {
        try {
          await this.$store.dispatch("user/getToken", this.loginFotmList);
          //登录成功跳转页面
          this.$router.push("/");
          this.$message.success("登录成功");
        } finally {
          this.loading = false;
        }
      });
    },

    //判断密码类型
    showeyes() {
      //加入密码类型为文本，让其变成password
      if (this.passwordform === "text") {
        this.passwordform = "password";
      } else {
        this.passwordform = "text";
      }
    },
  },
};
</script>

<style scoped lang="scss">
#login {
  background-image: url("../../assets/bg.png");
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 518px;
    height: 388px;
    background: #fff;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    .el-form {
      width: 448px;
      height: 280px;
      box-sizing: border-box;
    }
    .icon-img {
      position: absolute;
      width: 96px;
      height: 96px;
      top: -46px;
      left: 50%;
      margin-left: -48px;
    }
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    margin-left: -70px;
  }
}

::v-deep .el-input__inner {
  height: 47px;
  background: transparent;
  border: 0;
  border-radius: 0;
  padding: 12px 5px 12px -10px;
  color: #999;
  caret-color: #999;
  -webkit-appearance: none;
}
::v-deep .el-input__icon {
  padding: 6px 10px 6px 0px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.el-form-item {
  width: 100%;
  height: 52px;
  margin-bottom: 24px;
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
::v-deep .el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  margin-left: 20px;
}
::v-deep .el-input__suffix-inner {
  position: absolute;
  right: -120px;
  top: 1px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
}
.el-button--primary {
  width: 100%;
  height: 52px;
  background: linear-gradient(262deg, #2e50e1, #6878f0);
  opacity: 0.91;
  border-radius: 8px;
  color: #fff;
  text-shadow: 0 7px 22px #cfcfcf;
}
::v-deep .verification {
  // display: block;
  width: 130px !important;
  height: 51px !important;
  margin-right: -11px !important;
  margin-top: -1px;
}
::v-deep .el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 50px;
  left: -60px;
}
::v-deep .el-form-item.is-error .el-input__validateIcon {
  display: none !important;
}
.svgShow {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
}
</style>
