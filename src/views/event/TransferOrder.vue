<template>
  <div class=''>
    <van-nav-bar class="app-nav" title="转单" left-arrow @click-left="$router.back()" />

    <van-form @submit="onSubmit">
      <van-field label="负责人" v-model="fuzeUsername" right-icon="arrow" placeholder="请选择负责人" @click="show1 = true">
      </van-field>
      <van-action-sheet v-model="show1" :actions="userList" @select="onSelect1">
      </van-action-sheet>
      <div style="margin:16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
  //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';

  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
        show1: false,
        fuzeUsername: '',
        chuliUsername: '',
        userList: [],
        form: {
          eventLeaderId: null,
        },
 
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.query();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    //方法集合
    methods: {
      onSelect1(data) {
        this.fuzeUsername = data.name;
        this.form.eventLeaderId = data.id;
        this.show1 = false;
      },
      onSubmit() {
        var form = new FormData();
        let reportpersonId = 106
        form.append("districtId", this.form.eventLeaderId);
        form.append("id",this.$route.params.id)
        form.append("userId",reportpersonId)
        this.$axios({
          method: "get",
          url: "app/Event/transferOrder"+"?districtId="+ this.form.eventLeaderId +"&id="+this.$route.params.id+"&userId="+reportpersonId,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: form,
        }).then((res) => {
         
          if (res.data.status == "200") {
            this.$toast.success("转单成功");
            this.$router.push("/event")
          } else {
            this.$toast({
              message: "转单失败",
              position: "top",
              duration: 1500,
            })
          }
        })

      },
      async query() {
        const res = await this.$axios("getUserListAll");
        var array = res.data.data;
        array.forEach(item => {
          this.userList.push({
            id: item.id.toString(),
            name: item.username,
          })
        });
      },
    }
  }
</script>
<style>
</style>