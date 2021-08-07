<template>
  <div>
    <van-nav-bar class="app-nav" title="事件详情页" left-arrow @click-left="$router.back()" />
    <van-cell class="mb-4" title="事件内容" :value="form.qualityContent"></van-cell>
    <van-cell class="mb-4" title="当前状态" :value="form.taskType">
      <slot v-if="form.eventStatus === '1'">处理中</slot>
      <slot v-if="form.eventStatus === '2'">已处理</slot>
      <slot v-if="form.eventStatus === '3'">已结案</slot>
      <slot v-if="form.eventStatus === '4'">驳回</slot>
    </van-cell>
    <van-cell class="mb-4" title="时间上报" :value="form.reportingLocation"></van-cell>
    <van-cell class="mb-4" title="部件" :value="form.partsName"></van-cell>
    <van-cell class="mb-4" title="部件负责人" :value="form.leader"></van-cell>
    <van-cell class="mb-4" title="上报人" :value="form.reportPerson"></van-cell>
    <van-cell class="mb-4" title="上报时间" :value="form.reportTime"></van-cell>
    <van-cell class="mb-4" title="派发类型" :value="form.taskStatus">
      <slot>自动派发</slot>
      <slot>手动派发</slot>
    </van-cell>

    <van-cell class="mb-4" title="派发人" :value="form.distributePerson"></van-cell>
    <van-cell class="mb-4" title="派发时间" :value="form.distributionTime"></van-cell>
    <van-cell class="mb-4" title="时间描述" :value="form.eventDesc"></van-cell>
    <van-cell class="mb-4" title="处理人" :value="form.handlerPerson"></van-cell>
    <van-cell class="mb-4" title="处理时间" :value="form.handlerTime"></van-cell>
    <van-cell class="mb-4" title="处理时长" :value="form.handlerDuration"></van-cell>
    <van-cell class="mb-4" title="扣分" :value="form.deductPoints"></van-cell>
    <van-cell class="mb-4" title="片区负责人" :value="form.districtName"></van-cell>
    <van-cell class="mb-4" title="转单人" :value="form.transferPerson"></van-cell>
    <van-cell class="mb-4" title="转单时间" :value="form.transferTime"></van-cell>
    <van-cell class="mb-4" title="驳回描述" :value="form.rejectDesc"></van-cell>
    <van-cell class="mb-4" title="照片" center>
      <img :src="imgsrchandler" alt="" slot="extra">
    </van-cell>
    <van-cell class="mb-4" title="已处理照片" center>
      <img :src="imgsrc" alt="" slot="extra">
    </van-cell>
    <div class="dialog-footer">
      <van-button type="info" plain v-if="form.eventStatus === '1'" @click="confirehandler(form.id)" class="btncolor">
        确认处理
      </van-button>
      <van-button type="info" plain v-if="form.eventStatus === '1'" @click="transferOrder(form.id)" class="btncolor">
        转单
      </van-button>
      <van-button type="info" plain v-if="form.eventStatus === '2'" @click="confirmation(form.id)" class="btncolor">
        确定结案
      </van-button>
      <van-button type="info" plain v-if="form.eventStatus === '2'" @click="handleReject(form.id)" class="btncolor">
        驳回
      </van-button>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        imgsrchandler: undefined, //照片路径
        imgsrcsuffix: "&width=100&height=100",
        imgsrc: undefined,//已处理照片路径
        form: {

        }
      }
    },
    methods: {
      confirehandler(id) {
        this.$router.push("/confireHandler/" + id)
      },
      transferOrder(id) {
        this.$router.push("/TransferOrder/" + id)
      },
      handleReject(id) {
        this.$router.push("/EventReject/" + id)
      },
      confirmation() {
        this.$axios({
          url: "app/Event/confirmation",
          params: {
            id: this.$route.params.id
          }
        }).then(res => {
          if (res.data.status == "200") {
            this.$toast({
              message: "事件确认成功",
              position: "top",
              duration: 0,
              onOpend: (res) => {
                this.$router.push("/event")
              }
            })
          }else{
            this.$toast({
              message: "事件确认失败",
              position: "top",
              duration: 1500,
              onOpend: (res) => {
                this.$router.push("/event")
              }
            })
          }
        })
      },
      async query() {
        const res = await this.$axios('app/Event/getEventById/', {
          params: {
            id: this.$route.params.id
          }
        })
        console.log(res);
        this.form = res.data.data
        this.imgsrcid = res.data.data.id
        this.imgsrchandler = "http://139.9.169.87:9002/app/Event/getPhoto" + "?id=" +
          this.$route.params.id
          + this.imgsrcsuffix
        this.imgsrc = "http://139.9.169.87:9002/app/Event/getHandlerPhoto" + "?id=" +
          this.$route.params.id +
          this.imgsrcsuffix
      }

    },
    created() {
      this.query()
    },
  }
</script>
<style>
  .mb-4{
    margin-bottom: 4px;
  }
  .dialog-footer{
    text-align: center;
    background-color: white;
  }
  .dialog-footer button{
    margin: 15px;
  }
</style>