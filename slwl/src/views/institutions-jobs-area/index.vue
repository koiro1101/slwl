<template>
  <div class="manage">
    <div class="top">
    <el-card class="tree">
      <el-tree
  class="filter-tree"
  :data="treeList"
  :props="treeProps"
  default-expand-all

  ref="tree">
      </el-tree>
    </el-card>
    <el-card class="map">
      <el-row>
        <el-col style="backgroundColor:#f8faff;height:60px">
          <span>作业范围</span>
        </el-col>
      </el-row>
      <el-row>
       <div class="search">
        <i>地区关键词:</i><el-input style="width:300px" v-model="pol" ></el-input>
       </div>
      </el-row>
      <el-row>
        <div class="Gl" id="Gl">

        </div>
      </el-row>
    </el-card>
    </div>
   
  </div>
</template>

<script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&ak=OXcqGcQ5efbRxfkniON8stH4kR4bn8AX"></script>

<script>

import {getTreeApi} from '@/api/user'
export default {
 mounted(){
 
var map = new BMap.Map("Gl"); 
var point = new BMap.Point(116.404, 39.915); 
map.centerAndZoom(point, 15);  
map.enableScrollWheelZoom(true)

var map = new BMap.Map("container");   



 },
  data() {
    return {
      pol:'上海',
      treeProps: {
        label: 'name',
        children:'children'
        
      },
      treeList:[]
    }
  },
  

 created() {

 
 
}
}
</script>

<style lang="less" scoped>
.manage{
  /deep/.el-card__body {
    padding: 0;
  }
 position: relative;
 .top {
  display: flex;
 }
 .map {
  .Gl {
    width: 1380px;
    height: 728px;
    background-color: red;
     margin-left: 20px;
    margin-top: 10px;

  }
  i {
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }
  width: 1430px;
  height: 860px;
  .search {
    margin-top: 15px;
    display: flex;
  }
  span {
  
    margin: 20px;
    font-weight: 700;
  }
 }

  .tree{
    margin-right: 15px;
  height: 855px;
  width: 215px;

}


}

</style>