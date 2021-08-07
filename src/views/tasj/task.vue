<template>
  <div>
    <van-nav-bar class="app-nav" title="任务列表" left-arrow @click-left="$router.back()" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{scope.row.taskName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{scope.row.taskType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{scope.row.taskStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handle(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      handle() {

      },
      async query() {
        const res = await this.$axios('app/Task/getTaskListAll')
        console.log(res);
        this.tableData = res.data.data
      }

    },
    created() {
      this.query()
    },
  }
</script>
<style>
  th{
    text-align: center;
  }
</style>