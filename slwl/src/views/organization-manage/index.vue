<template>
  <div class="manage">
    <div class="top">
    <el-card>
      <el-tree
  class="filter-tree"
  :data="treeList"
  :props="treeProps"
  default-expand-all
@node-click="nodeclick"
@current-change='nodechange'
  ref="tree">
      </el-tree>
    </el-card>
    <div class="con">
      <p class="top">机构管理</p>
      <el-form :inline="true"  :model="formData">
        <el-row style="margin:20px 25px" class="row1">
          <el-col :span="8">
            <el-form-item label="机构编号" prop="id" >
              <el-input v-model="formData.id" disabled></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构名称" prop="name">
              <el-input v-model="formData.name" disabled></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构类型">
             <el-input :value="showType" disabled></el-input>
           </el-form-item>
          </el-col>
          
          
        </el-row>
        <el-row class="row2" style="margin:-20px 25px">
          <el-col >
            <el-form-item label="机构地址">
              <el-select @change="change" v-model="prionId" :disabled='showab'>
                <el-option v-for="(item) in prionArea" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="conId" @change='changecon' :disabled='showab'>
                <el-option v-for="(item) in conArea" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
              <el-select v-model="AreaId" :disabled='showab'>
                <el-option v-for="(item) in Areaarea" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
             </el-form-item>
          </el-col>

        </el-row>
        <el-row style="margin:20px 25px" class="row1">
          <el-col :span="8">
            <el-form-item label="详细地址" >
              <el-input v-model="realAddress" :disabled='showab' ></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="formData.longitude" disabled></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="维度" prop="latitude">
              <el-input v-model="formData.latitude" disabled></el-input>
           </el-form-item>
          </el-col>
          
          
        </el-row>
        <el-row style="margin:-10px 25px" class="row1">
          <el-col :span="8">
            <el-form-item label="机构负责人" prop="managerName">
              <el-input v-model="formData.managerName" :disabled='showab'></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构电话" prop="phone">
              <el-input v-model="formData.phone" :disabled='showab'></el-input>
           </el-form-item>
          </el-col>
         
        </el-row>
        <el-row>
          <el-col :span='12' type='flex' style="margin-left:45%">
            <el-button type='danger' @click="btn" >{{showab ? '编辑' :'保存'}}</el-button>
          </el-col>
        </el-row>
      </el-form>
      
    </div>
    
   </div>
   
    <div class="bot">
<div class="header">员工信息</div>
<el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      type='index'
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="userId"
      label="员工编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="员工姓名">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="手机号">
    </el-table-column>
    <el-table-column
      prop="agency.name"
      label="所属机构">
    </el-table-column>
    <el-table-column
      prop="account"
      label="系统账户">
    </el-table-column>
    <el-table-column
      prop="stationName"
      label="系统角色">
    </el-table-column>
    <el-table-column
      
      label="账号状态">
      <template #default='{row}'>
        {{row.status ? '正常' :'异常'}}
      </template>
    </el-table-column>
  </el-table>
  <el-pagination style="margin-left:400px;margin-top:30px" v-show="formData.type!==3"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userInfo.page"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>


import {getTreeApi,getaddressApi,getOrgizationInfoApi,getuserInfoApi} from '@/api/user'
export default {
 
  computed: {
    showType() {
      if (this.formData.type === 1) {
        return '一级转运中心'
      } else if (this.formData.type === 2) {
        return '二级转运中心'
      } else {
        return '营业部'
      }
    }
  },
  data() {
    return {
      total:0,
      userInfo:{
        page:1,
        pageSize:5,
        agencyId:''
      },
        tableData: [],
      showab:true,
      formData: {
        id: '',
        latitude: '',
        longitude: '',
        managerName: '',
        name: '',
        phone: '',
        type:''

      },
      realAddress:'',
      AreaId:'',
      prionId:'',
      conId:'',
      prionArea: [],
      conArea:[],
      Areaarea:[],
      treeProps: {
        label: 'name',
        children:'children'
        
      },
      treeList:[]
    }
  },
  
  methods: {
    handleCurrentChange(val){
       this.userInfo.page= val
      this.getuserInfo()
    },
    handleSizeChange(val){
      this.userInfo.pageSize = val
      this.getuserInfo()
    },
   async getuserInfo(){
     let res = await getuserInfoApi(this.userInfo)
     console.log(res);
     this.tableData = res.data.items
     this.total = +res.data.counts
    },
    btn(){
       if(!this.showab) {
        this.$message.error('演示系统不允许被修改')
       }
      this.showab = !this.showab
     
    },
   async nodechange(val){
     let res =await getOrgizationInfoApi(val.id,{0:val.id})
    //  console.log(res);
     this.realAddress = res.data.address
     this.prionId = res.data.province.name
     this.conId = res.data.city.name
     this.AreaId = res.data.county.name
    
    },
   async changecon(val){
      let res = await getaddressApi({ parentId: val })
     
      this.Areaarea = res.data
      this.AreaId = ''
    },
    async change(val) {
    // console.log(val)
      let res = await getaddressApi({ parentId: val })
      this.conId =''
      this.AreaId = ''
      this.conArea  = res.data
     
    },
  async  getaddress() {
      let res = await getaddressApi()
      this.prionArea = res.data
      
    },
    nodeclick(a, b, c) {
      console.log(a);
      this.userInfo.agencyId = a.id
       this.getuserInfo()
       
      this.showab = true
      this.formData = a

    },
  async  getTree() {
     let res =  await getTreeApi()
    this.treeList = JSON.parse(res.data)
    this.formData = this.treeList[1] 
     let res1 =await getOrgizationInfoApi(this.treeList[1].id,{0:this.treeList[1].id})
    //  console.log(res);
     this.realAddress = res1.data.address
     this.prionId = res1.data.province.name
     this.conId = res1.data.city.name
     this.AreaId = res1.data.county.name
    
   
    console.log(this.treeList);
    }
  },
 created() {
   this.getaddress()
  this.getTree()
  this.getuserInfo()
 
}
}
</script>

<style lang="less" scoped>
.manage{
 position: relative;
  .bot {
    .header{
      font-weight: 700;
      padding: 20px;

      background-color: #fafafa;
    }
    top: 410px;
    left: 233px;
     position: absolute;
    width: 1435px;
    height: 440px;
    background-color: #fff;
  }
  .top{
    display: flex;
  }
  .el-card {
  height: 855px;
  width: 215px;

}
.con{
  .row2 {
    .el-input,.el-select {
     margin: 0 5px;
    width: 420px;
  } 
  }
  .row1{
    .el-input {
    width: 350px;
  }
  }
  
  .top {
    font-size: 16px;
    font-weight: 700;
    
    height: 50px;
    background-color: #fafafa;
  }
  margin-left: 15px;
  width: 1440px;
  height: 390px;
  background-color: #fff;
}

}

</style>