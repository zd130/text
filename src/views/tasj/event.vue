<template>
  <div>
    <van-nav-bar class="app-nav" title="事件列表" left-arrow @click-left="$router.back()" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件内容">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{scope.row.qualityContent}}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源">
        <span>内部巡查</span>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.eventStatus == 1">处理中</span>
          <span v-if="scope.row.eventStatus == 2">已处理</span>
          <span v-if="scope.row.eventStatus == 3">已结案</span>
          <span v-if="scope.row.eventStatus == 4">驳回</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handle(scope.row)">详情</el-button>
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
      async query() {
        const res = await this.$axios('app/Event/getEventListAll')
        // console.log(res);
        this.tableData = res.data.data
      },
      handle(row) {
        this.$router.push({name:"EventDetail",params:{
          id:row.id
        }});
      }
    },
    created() {
      this.query()
    },
  }
</script>