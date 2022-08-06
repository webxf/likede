<template>
  <div class="navbar">
    <div class="header-img">
      <img src="@/assets/home.png" alt="" />
    </div>
    <div class="right-menu">
      <div class="avatar-wrapper">
        <img src="@/assets/touxiang.png" class="user-avatar" />
        <span class="welcome"
          >欢迎您，{{ $store.state.user.userInfo.loginName }}</span
        >
        <span class="loginout" @click="logout">退出</span>
        <i class="el-icon-caret-bottom" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 1999;
  background: #5373e0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .header-img img {
    width: 88px;
    height: 36px;
    position: absolute;
    top: 12px;
    left: 20px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
    }
  }
}
.avatar-wrapper {
  position: relative;
  .user-avatar {
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 10px;
    // margin-right: 130px;
    // margin-top: 10px;
    position: absolute;
    right: 220px;
    top: 15px;
  }
  .welcome {
    font-size: 16px;
    color: #fff;
    // margin-right: 100px;
    // margin-top: 50px;
    position: relative;
    right: 74px;
    top: 10px;
  }
  .loginout {
    color: #fff;
    position: relative;
    right: 30px;
    top: 10px;
  }
  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 30px;
    font-size: 12px;
    color: #fff;
    margin-bottom: 20px;
  }
}
</style>
