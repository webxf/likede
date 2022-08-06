<template>
  <div class="operation">
    <Button :btnstatus="Taskstatus" />
    <el-card class="card-btn" shadow="never">
      <el-button
        icon="el-icon-circle-plus-outline"
        class="new"
        @click="newBranch"
        >新建</el-button
      >
      <el-button class="deploy" @click="dialogFormVisible = true"
        >工单配置</el-button
      >
      <el-dialog title="工单配置" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <span>♥补货警戒线：</span>
          <el-input-number
            v-model="supplyValue"
            controls-position="right"
            @change="handleChange"
          ></el-input-number>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-table :data="this.tableData" style="width: 100%" size="medium">
        <el-table-column
          prop="currentPageRecords"
          label="序号"
          width="80"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column prop="taskCode" label="工单编号" width="150">
        </el-table-column>
        <el-table-column prop="innerCode" label="设备编号" width="120">
        </el-table-column>
        <el-table-column prop="taskType.typeName" label="工单类型" width="150">
        </el-table-column>
        <el-table-column prop="createType" label="工单方式" width="150">
        </el-table-column>
        <el-table-column
          prop="taskStatusTypeEntity.statusName"
          label="工单状态"
        >
        </el-table-column>
        <el-table-column prop="userName" label="运营人员"> </el-table-column>
        <el-table-column prop="createTime" label="创建日期">
          {{ NowTime }}</el-table-column
        >
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <span class="count"
          >共{{ totalCount.totalCount }}条记录 第{{
            this.searchNum.pageIndex
          }}/{{ totalCount.totalPage }}页</span
        >
        <el-button
          type="info"
          class="previos"
          @click="btnPrevios"
          :disabled="isshow"
          >上一页</el-button
        >
        <el-button type="info" class="next" @click="btnNext">下一页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入按钮组件
import Button from "@/components/button";
import {
  getTaskStatusApi,
  getTaskSearchApi,
  createTaskApi,
  deployTaskApi,
} from "@/api/task";
import dayjs from "@/utils/auth";
export default {
  name: "operation",
  data() {
    return {
      tableData: [],
      Taskstatus: [],
      totalCount: {},
      dialogVisible: false,
      dialogFormVisible: false,
      num: 1,
      searchNum: {
        pageIndex: "1", //页码数
        pageSize: "10",
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      isshow: false,
      supplyValue: "",
    };
  },
  //注册按钮组件
  components: {
    Button,
  },
  created() {
    this.getTaskStatus();
    this.getTaskSearch();
    this.deployTask();
  },
  computed: {
    //事件处理函数
    NowTime() {
      return dayjs(this.createTime).format("YYYY.MM.DD HH:mm:ss");
    },
  },
  methods: {
    //获取索引
    indexMethod(index) {
      return index + 1;
    },
    //获取所有状态
    async getTaskStatus() {
      const res = await getTaskStatusApi();
      //将res赋值给状态的变量值
      this.Taskstatus = res;
      console.log(this.Taskstatus);
    },
    //获取所有列表值
    async getTaskSearch() {
      //将获取到的数据赋值给res
      const res = await getTaskSearchApi(this.searchNum);
      // console.log(res);
      //让当前页等于获取到的页
      this.pageIndex = res.pageIndex;
      // //将res赋值给总计和总页数
      this.totalCount = res;
      this.tableData = res.currentPageRecords;
      // this.indexMethod = this.indexMethod + 10;
      console.log(this.tableData);
      //对数组进行遍历
      this.tableData.forEach((item, index) => {
        // this.searchNum[index].pageIndex =
        //   index + 1 + (this.tableData.pageIndex - 1) * 10;
        // console.log(item);
        //判断工单方式，如果为1则为手动，如果其他就是自动
        if (item.createType === 1) {
          this.tableData[index].createType = "手动";
        } else {
          this.tableData[index].createType = "自动";
        }
      });
    },
    //新建商品
    async newBranch() {
      const res = await createTaskApi({});
      console.log(res);
    },
    //工单配置
    async deployTask() {
      const res = await deployTaskApi();
      this.supplyValue = res;
    },
    //工单弹框组件
    handleChange(value) {
      console.log(value);
    },
    //切换下一页
    btnNext() {
      //判断，假如pageindex为最后一页，因为考虑到最后一页点下一页不会跳转，所以让他等于当前一夜
      if (this.searchNum.pageIndex == this.totalCount.totalPage) {
        return this.pageIndex;
      } else {
        //否则就让pageindex++,然后调用函数（因为接口一样，只要在上面传参数即可）
        this.searchNum.pageIndex++;
        this.getTaskSearch();
      }
    },
    //切换上一页
    btnPrevios() {
      console.log(this.searchNum.pageIndex);
      if (this.searchNum.pageIndex === 1) {
        this.isshow = true;
        this.$message("已是第一页");
      } else {
        this.searchNum.pageIndex--;
        this.getTaskSearch();
        this.isshow = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.el-card__body {
  margin-bottom: 100px;
}
.card-btn {
  border: none;
  width: 100%;
  height: 100%;
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
  .previos {
    position: absolute;
    right: 210px;
    bottom: -30px;
    // margin-left: 420px;
    width: 70px;
    height: 32px;
    border-radius: 2px;
    background-color: #d5ddf8;
    color: #333;
    padding-left: 10px;
    line-height: 10px;
  }
  .next {
    position: absolute;
    right: 100px;
    bottom: -30px;
    width: 70px;
    height: 32px;
    border-radius: 2px;
    background-color: #d5ddf8;
    color: #333;
    padding-left: 10px;
    line-height: 10px;
  }
  .el-table__row {
    height: 30px;
  }
  .count {
    position: absolute;
    bottom: -25px;
    left: 50px;
    color: #dbdfe5 !important;
  }
  .el-dialog {
    width: 400px;
  }
  .el-form {
    margin-left: 200px;
    .el-input {
    }
    span {
      margin-right: 20px;
    }
  }
  .dialog-footer {
    .el-button--default {
      width: 80px !important;
      height: 36px;
      padding: 0;
      background-color: #fbf4f0 !important;
      border: none;
      color: #655b56 !important;
      // margin-right: 300px;
    }
    .el-button--primary {
      width: 80px !important;
      height: 36px;
      padding: 0;
      background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
      border: none;
      margin-right: 250px;
      margin-left: 20px;
    }
  }
}
.el-dialog__title {
  font-size: 14px !important;
}
</style>
