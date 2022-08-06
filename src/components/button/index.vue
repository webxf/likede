<template>
  <div class="button">
    <el-card class="box-card" shadow="never">
      <span>工单编号：</span>
      <el-input v-model="input" placeholder="请输入"></el-input>
      <span class="status">工单状态：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in btnstatus"
          :key="item.value"
          :label="item.statusName"
          :value="item.statusId"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search
"
        class="search-btn"
        @click="allStatus"
        >查询</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { allTaskStatus } from "@/api/task";
export default {
  props: {
    btnstatus: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      input: "",
      value: "",
      taskstatus: [],
    };
  },

  created() {},

  methods: {
    async allStatus() {
      const res = await allTaskStatus({
        statusId: this.btnstatus.statusId,
        statusName: this.btnstatus.statusName,
      });
      console.log(res);
      console.log(this.btnstatus);
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
    border: none;
  }
}
.el-input {
  width: 200px;
}
.el-input_inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #d8dde3;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.status {
  margin-left: 20px;
}
.search-btn {
  margin-left: 20px;
  min-width: 90px;
  height: 40px;
  padding: 0px;
  background-color: rgb(95, 132, 255);
  border: none;
  font-size: 14px;
}
</style>
