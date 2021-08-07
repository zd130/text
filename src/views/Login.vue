<template>
  <div>
    <van-nav-bar class="app-nav" title="登录"/>
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import { Dialog } from 'vant';
  import { Toast } from 'vant';
  import qs from 'qs'
  export default {
    data() {
      return {
        username: "MissZhou",
        password: "123456"
      }
    },
    methods: {
      async onSubmit() {
        if (this.username.length >= 6) {
          var reg = /[\u4E00-\u9FA5]/
          if (reg.test(this.username)) {
            Dialog.alert({
              title: "标题",
              message: '账号格式有误',
            })
            return
          }
        } else {
          Dialog.alert({
            theme: "round",
            title: "提示",
            width: "70%",
            height: "30%",
            message: "账号长度为6-12位"
          })
          return
        }

        if (this.password.length >= 6) {
          var reg = /[\u4E00-\u9FA5]/
          if (reg.test(this.password)) {
            Dialog.alert({
              title: "标题",
              message: '密码格式有误',
            })
            return
          }
        } else {
          Dialog.alert({
            theme: "round",
            title: "提示",
            width: "70%",
            height: "30%",
            message: "密码长度为6-12位"
          })
          return
        }

        var user = {
          loginName: this.username,
          loginPassword: this.password
        }

        // var data = qs.stringify(user)
        var data = "loginName=" + this.username + "&loginPassword=" + this.password
        const res = await this.$axios({
          url: "app/Employee/doLogin",
          data,
          method: 'POST'
        })
        if (res.data.status == 200) {
          sessionStorage.setItem("set_token", res.data.data)
          this.$router.push("/Home");
          Toast.loading({
            message: "登录成功",
            position: "top" //上面显示
          })
        } else {
          Toast.fail({
            message: "登录失败",
            position: "top" //上面显示
          })
        }

      }
    },
  }
</script>
<style>
  .app-nav {
    background-color: rgb(28, 128, 196) !important;
    color: white;
  }

  .app-nav .van-nav-bar__title {
    color: white
  }

  .app-nav .van-icon {
    color: white !important;
  }
</style>