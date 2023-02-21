<template>
  <div>
    <el-container>
  <el-aside width="200px">
    <div>
      <img src="@/assets/layoutlogo.png" alt="">
    </div>
    <el-menu router active-text-color="#ff7a63" unique-opened @open="open">
      <!-- 一级菜单 -->
      <el-menu-item index="/dashboard">
      <i class="el-icon-loading"></i>
        <span style="margin-left:5px;font-size:14px">工作台</span>
      </el-menu-item>
      <el-submenu v-for="(x,y) in menuList" :key="x.id" :index="x.path" v-show="x.children">
        <template #title>
          <i :class="iconsObj[y]"></i>
          {{ x.name }}
        </template>
        <!-- 二级菜单 -->
        <el-menu-item v-for="(item2) in x.children" :key="item2.id" :index="item2.path" @click="getindex(item2.path)">
          <template #title>
            {{ item2.name }}
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
    
      <el-row type="flex" justify="space-between">
        <span class="a">工作台</span>
        
          <div>
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="" class="c" >
          <span class="b">神领管理员</span>
          <img src="../../assets/logout.png" alt="" class="logout" @click="logout">
          </div>
       
       
      </el-row>
     
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import {getMenuApi} from '@/api/user'
export default {
  data() {
    return {
      iconsObj: {
        0: 'el-icon-s-home',
        1: 'el-icon-notebook-2',
        2: 'el-icon-ship',
        3: 'el-icon-cloudy',
        4: 'el-icon-sunny',
        5: 'el-icon-light-rain',
      },
      menuList: [], //菜单数据,
      index:''
    }
  },
  created() {
    this.getMenu() //获取菜单列表
  },
  methods: {
    open( indexPath) {
      console.log( indexPath);
    },
    getindex(index) {
      // console.log(this.index);
      
      // this.index = index
    },
  async  getMenu() {
     let res = await getMenuApi()
      console.log(res);
     this.menuList = res.data
    },
    logout() {
    this.$store.commit('user/delToken')
    this.$router.push('/login')
  }
}
}
</script>

<style scoped lang="less">
.el-main {
  margin: 0;
  padding: 0;
  // background-color: #ffffff;
}
.el-header {
  .logout {
    margin-bottom: 5px;
    margin-left: 20px;
    width: 20px;
    height: 30px;
  }
  .el-row {
    line-height: 100px;
    
      .c{
        margin-top: 20px;
    border-radius: 30px;
    width:50px;
    
  
    }
    .b {
      vertical-align: top;
      font-size: 18px;
    }
  }
 
  // background-color: ;
  height: 76px !important;
  .a {
    font-size: 22px;
    font-weight: bold;
    line-height: 100px;
    margin-left: -20px;
  }
}
.el-aside {
  background-color: #ffffff;
  height: 100vh;
  width: 210px !important;
  margin-right: 20px;
  img {
    margin-top: 20px;
    margin-left: 13px;
    width: 150px;
    height: 108px;
  }
}

</style>