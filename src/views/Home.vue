<template>
  <div >
      <div class="largeTitle">
        <div class="title">
          <span>今日事件数</span>
          <span>{{eventCount}}</span>
        </div>
        <div class="title">
          <span>今日任务数</span>
          <span>{{taskCount}}</span>
        </div>
        <div class="title">ww
          <span>今日作业人数</span>
          <span>{{taskPesCount}}</span>
        </div>
      </div>
      <van-grid :column-num = "2">
        <van-grid-item class="mb-4" icon="envelop-o" text="任务" to="task"/>
        <van-grid-item icon="sign" class="mb-4" text="事件" to="event"/>
      </van-grid>

      <van-cell class="mb-4" title="修改密码" is-link to="/pwd"/>
      <van-cell class="logout-cell" title="退出登录"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      eventCount:0,
      taskCount:0,
      taskPesCount:0
    }
  },
  methods: {
    async geteventCount(){
      const res = await this.$axios('app/Event/getCurrEventCount')
      // console.log(res);
      this.eventCount = res.data
    },
    async gettaskCount(){
      const res = await this.$axios('app/Task/getCurrTaskCount')
      this.taskCount = res.data
    },
    async gettaskPesCount(){
      const res = await this.$axios('app/Task/getCurrTaskPerCount')
      this.taskPesCount = res.data
    }
   
  },
  created() {
    this.geteventCount() //今日事件数
    this.gettaskCount() // 今日任务数
    this.gettaskPesCount() // 今日作业人数
  },
}
</script>
<style>
  .largeTitle{
    display: flex;
    background: rgb(25, 147, 228);
  }
  .title{
    display: flex;
    flex: 1;
    flex-direction: column;
    color: white;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .mb-4{
    margin-bottom: 4px;
    color: #d86262;
  }
  .logout-cell{
    text-align: center;
    color: #d86262 !important;
  }
</style>