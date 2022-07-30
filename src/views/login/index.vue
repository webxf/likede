<template>
  <div id="login">
    <div class="login-form">
      <el-form ref="form" :model="form" label-width="80px">
        <img src="@/assets/likeed.png" alt="" class="icon-img">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入账号" prefix-icon="el-icon-mobile-phone" validate-event /></el-form-item>
        <el-form-item>
          <el-input v-model="form.password" prefix-icon="el-icon-lock" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.verification" placeholder="请输入验证码" prefix-icon="el-icon-key">
            <div slot="suffix">
              <img src="@/assets/yanzhengma.jpg" alt="" class="verification">
            </div>
          </el-input>

        </el-form-item>
        <!-- <el-form-item> -->
        <el-button type="primary">登录</el-button>
        <!-- </el-form-item> -->
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: 'admin',
        password: '123456',
        verification: ''

      },
      input: ''
    }
  },

  created() {

  },

  methods: {

  }
}
</script>

<style scoped lang="scss">
#login {
  background-image: url('../../assets/bg.png');
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .login-form{
    position: absolute;
    top:50%;
    left:50%;
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
      box-sizing: border-box
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

    .el-input{
      display: inline-block;
      height: 47px;
      width: 85%;
      margin-left: -70px
    }
  }

::v-deep .el-input__inner{
   height: 47px;
    background: transparent;
    border: 0;
    border-radius: 0;
    padding: 12px 5px 12px -10px;
    color: #999;
    caret-color: #999;
    -webkit-appearance: none;
      }
    ::v-deep .el-input__icon{
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
      ::v-deep .el-form-item__content{
    line-height: 40px;
    position: relative;
    font-size: 14px;
    margin-left: 20px;
  }
  ::v-deep .el-input__suffix-inner{
    position: absolute;
    right: -120px;
    top: 1px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
  }
  .el-button--primary{
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf
  }
  ::v-deep .verification{
      // display: block;
      width: 130px !important;
      height: 51px !important;
      margin-right: -11px !important;
      margin-top: -1px;
  }
</style>
