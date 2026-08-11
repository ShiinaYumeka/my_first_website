
<template>
  <div>
    账号：<input v-model="userInfo.inputUsername"/> {{userInfo.username}} <br />
    密码：<input v-model="userInfo.inputPassword"/> {{userInfo.password}} <br />
    <button v-on:click="changePassword">登入</button>
  </div>
</template>


<script lang="ts">

  export default {
    data(){
      return {
        userInfo:{
          username : "SuperAdmin",
          password: "SuperAdmin",
          inputUsername : "",
          inputPassword : "",
        }
      }
    },
    methods:{
      changePassword(){
        if(this.userInfo.password.length < 6) return "";
        this.userInfo.username = this.userInfo.inputUsername.trim()
        this.userInfo.password = this.userInfo.inputPassword.trim()
      }
    }
  }
</script>


<style scoped>
  .userInfo{
    background: aqua;
    color: #282828;
  }

</style>
