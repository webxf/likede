<template>
  <div class="operation">
    <Button />
    <el-card class="card-btn" shadow="never">
      <el-button icon="el-icon-circle-plus-outline" class="new">新建</el-button>
      <el-button class="deploy">工单配置</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="工单编号" width="180">
        </el-table-column>
        <el-table-column prop="address" label="设备编号"> </el-table-column>
        <el-table-column prop="address" label="工单类型"> </el-table-column>
        <el-table-column prop="address" label="工单方式"> </el-table-column>
        <el-table-column prop="address" label="工单状态"> </el-table-column>
        <el-table-column prop="address" label="运营人员"> </el-table-column>
        <el-table-column prop="address" label="创建日期"> </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
//引入按钮组件
import Button from "@/components/button";
import { getTaskStatusApi, getTaskSearchApi } from "@/api/task";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  //注册按钮组件
  components: {
    Button,
  },
  created() {},

  methods: {},
};
</script>

<style scoped lang="scss">
.card-btn {
  border: none;
  width: 100%;
  height: 800px;
  background-color: #fff;
  margin-top: 20px;
  .new {
    width: 100px !important;
    height: 42px;
    padding: 0;
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
    border: none;
    font-size: 16px;
    color: #fff;
  }
  .deploy {
    width: 100px !important;
    height: 42px;
    font-size: 16px;
    padding: 0;
    background-color: #fbf4f0 !important;
    border: none;
    color: #655b56 !important;
  }
  // .el-row {
  //   margin-bottom: 20px;
  //   text-align: center;
  //   line-height: 45px;
  //   margin-top: 20px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
  // .el-col {
  //   border-radius: 4px;
  // }
  // .bg-purple-light {
  //   background: #f3f6fb;
  // }
  // .grid-content {
  //   // border-radius: 4px;
  //   min-height: 45px;
  //   padding-right: 10px;
  // }
  // .row-bg {
  //   padding: 10px 0;
  //   background-color: #f9fafc;
  // }
}
</style>
