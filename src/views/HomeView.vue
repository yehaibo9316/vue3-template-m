<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import api from '@/api/index'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  async created () {
    const [e, r] = await api.userApi.getUserInfo({ id: 1 })
    if (!e && r) this.userInfo = r.data.userinfo
  }
}
</script>
<style lang="scss" scoped>
.home {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
