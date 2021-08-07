<template>
  <div>
    <van-nav-bar class="app-nav" title="事件确定" left-arrow @click-left="$router.back()" />
    <van-form @submit="onSubmit">

      <van-field v-model="fuzeusername" @click="show=true" right-icon="arrow" label="负责人" placeholder="请选择负责人" />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />

      <van-field v-model="fuzeusername1" @click="show1=true" right-icon="arrow" label="处理人" placeholder="请选择处理人" />
      <van-action-sheet v-model="show1" :actions="actions1" @select="onSelect1" />

      <van-field v-model="form.eventDesc" label="描述" placeholder="描述" :rules="[{ required: true, message: '请填写描述' }]" />

      <van-field @click="chooseFile" right-icon="arrow" label="上传照片" placeholder="上传照片" />
      <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" ref="file" />

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>

    </van-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fuzeusername: "",
        fuzeusername1: "",
        fuzeusername2: "",
        show: false,
        show1: false,
        show2: false,
        actions: [],
        actions1: [],
        actions2: [],
        form: {
          eventLeaderId: null, //负责人id
          userEventOptions: [],
          handlerPersonId: null,//处理人id
          userHandlerOptions: [],
          handlerDesc: ""
        },
        fileList: []
      }
    },
    methods: {
      chooseFile() {
        this.$refs.file.chooseFile()
      },
      afterRead(file) {
        this.file = file.file //获取上传到后台图片的数据
      },
      onSelect(data) {
        this.fuzeusername = data.name
        this.form.eventLeaderId = data.id
        this.show = false
      },
      onSelect1(data) {
        this.fuzeusername1 = data.name
        this.form.handlerPersonId = data.id
        this.show1 = false
      },

      async onSubmit() {
        var form = new FormData()
        form.append('file', this.file);
        form.append('eventLeaderId', this.form.eventLeaderId);
        form.append('handlerPersonId', this.form.handlerPersonId);
        form.append('handlerDesc', this.form.handlerDesc);
        form.append('id', this.$route.params.id);

        const res = await this.$axios({
          url: "app/Event/confirehandler",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: form
        })
        if (res.data.status == "200") {
          this.$toast({
            message: "事件确认成功",
            position: "top",
          })
          this.$router.push("/event")
        } else {
          this.$toast({
            message: "事件确认失败",
            position: "top",
            duration: 1500,
          })
          this.$router.push("/event")
        }
      },
      async query() {
        const res = await this.$axios("getUserListAll")
        console.log(res);
        var array = res.data.data
        array.forEach((item) => {
          this.actions.push({
            id: item.id.toString(),
            name: item.username
          })
        })
      },
      async getpage() {
        const res = await this.$axios("getUserListAll")
        console.log(res);
        var array = res.data.data
        array.forEach((item) => {
          this.actions1.push({
            id: item.id.toString(),
            name: item.username
          })
        })
      }
    },
    created() {
      this.query()
      this.getpage()
    },
  }
</script>