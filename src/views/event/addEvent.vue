<template>
  <div>
    <van-nav-bar class="app-nav" title="事件上报" />
    <van-form @submit="onSubmit">
      <van-field v-model="form.reportingLocation" label="位置" placeholder="位置"
        :rules="[{ required: true, message: '请填写位置' }]" />

      <van-field v-model="form.eventDesc" label="描述" placeholder="描述" :rules="[{ required: true, message: '请填写描述' }]" />

      <van-field v-model="quality" @click="show=true" right-icon="arrow" label="质量内容" placeholder="请选择质量内容" />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />

      <van-field v-model="quality1" @click="show1=true" right-icon="arrow" label="部位内容" placeholder="请选择质量内容" />
      <van-action-sheet v-model="show1" :actions="actions1" @select="onSelect1" />、

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
        fileList: [],
        form: {
          reportingLocation: "",
          eventDesc: "",
          qualityId: null,
          partsId: null,
          reportpersonId: null,
        },
        quality: "",
        actions: [], //质量内容数组
        show: false,
        show1: false,
        actions1: [],
        quality1: ""
      }
    },
    methods: {
      afterRead(data) {
        this.file = data.file
        this.fileList.push(data.content)
      },
      //选择图片
      chooseFile() {
        //获取ref = file 的组件
        this.$refs.file.chooseFile()
      },
      onSelect(data) {
        this.quality = data.name
        this.form.qualityId = data.id
        this.show = false
      },
      async onSubmit() {
        var form = new FormData()
        form.append("file", this.file)
        // let reportpersonId = sessionStorage.getItem("set_token").split("-")[2]
        let reportpersonId = 106
        form.append("qualityId", this.form.qualityId)
        form.append("reportingLocation", this.form.reportingLocation)
        form.append("eventDesc", this.form.eventDesc)
        form.append("partsId", this.form.partsId)
        form.append("reportpersonId", reportpersonId)
        console.log(this.form);
        const res = await this.$axios({
          url: "app/Event/addEvent",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: form
        })
        console.log(res);

        if (res.data.status == "200") {
          this.$toast.success("事件上报成功")
          this.$router.push("/event")
        } else {
          this.$toast.success("事件上报失败")
        }
      },


      onSelect1(data) {
        this.quality1 = data.name
        this.form.partsId = data.id
        this.show1 = false
      },
      async query() {
        const res = await this.$axios.get('app/Event/getQualityListAll')
        var array = res.data.data
        array.forEach(item => {
          this.actions.push({
            id: item.id.toString(),
            name: item.qualityContent
          })
        })
      },
      async getpage() {
        const res = await this.$axios.get('app/Event/getPartsListAll')
        var array = res.data.data
        array.forEach(item => {
          this.actions1.push({
            id: item.id.toString(),
            name: item.partsName
          })
        })
      }
    },
    created() {
      this.getpage()
      this.query()
    },
  }
</script>