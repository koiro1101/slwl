<template>
  <div>
    <el-card style="height:80px">
      <el-form :inline="true">
        <el-row type='flex'>
        <el-col :span='8'>
          车辆类型：<el-select v-model="carTypeId" placeholder="请选择"  style="width:400px">
    <el-option
      v-for="item in carType"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
        </el-col>
        <el-col :span='10'>
          <el-form-item label="车牌号码" >
            <el-input style="width:400px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='4'>
          <el-button type="danger">搜索</el-button>
          <el-button @click='cz'>重置</el-button>
        </el-col>
      </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top:15px">
      <el-button
        @click='btn("alls")'
        type="text"
        class="promptSize"
        :autofocus="true"
        :class="{bg:type==='alls'}"
        
        >全部</el-button
      >

      <el-button
        @click='btn("ok")'
        type="text"
        class="promptSize"
        :class="{bg:type==='ok'}"
       
        >可用</el-button
      >

      <el-button
      @click='btn("disable")'
        type="text"
        class="promptSize"
        :class="{bg:type==='disable'}"
       
       
        >停用</el-button
      >
    </el-card>
     <el-card style="margin-top:20px">
      <el-button type="danger" style="margin:25px 0" @click='addCar'>新增车辆</el-button>
      <el-table
     
        v-loading="loading"
        element-loading-text="加载中"
        :data="list"
        stripe
        :header-cell-style="{ background: '#f8faff' }"
        >>
        <el-table-column label="序号" type="index" align="center" width="60" />
        <el-table-column
          label="车型号码"
          prop="licensePlate"
          align="center"
          width="250"
        />
        <el-table-column
          label="车型类型"
          prop="truckTypeName"
          align="center"
          width="179"
        />
        <el-table-column
          label="司机数量"
          prop="driverNum"
          align="center"
          width="138"
        />
        <el-table-column
          label="车辆状态"
          prop="status"
          align="center"
          width="207"
        >
          <template #default="{ row }">
            {{row.workStatus ?'正常' :'停用'}}
          </template>
        </el-table-column>
        <el-table-column
          label="GPS设备ID"
          prop="deviceGpsId"
          align="center"
          width="207"
        />
        <el-table-column
          label="实载重量(T)"
          prop="allowableLoad"
          align="center"
          width="138"
        />
        <el-table-column
          label="实载体积(方)"
          prop="allowableVolume"
          align="center"
          width="138"
        />

        <el-table-column label="操作" align="center">
          <template #default>
            <el-link :underline="false" style="color: #47a2ff">查找</el-link>
            <span
              style="
                border-right: 1px solid #dcdfe6;
                zoom: 0.8;
                margin: 0 10px;
                vertical-align: middle;
              "
            ></span>
            <el-link :underline="false" style="color: red">停用</el-link>
            <span
              style="
                border-right: 1px solid #dcdfe6;
                zoom: 0.8;
                margin: 0 10px;
                vertical-align: middle;
              "
            ></span>
            <el-link :underline="false" style="color: #47a2ff"
              >配置司机</el-link
            >
          </template>
        </el-table-column>

       
      </el-table>
     </el-card>
     
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userInfo.page"
      :page-sizes="[5,10,15]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog
  title="新增车辆"
  :visible.sync="showCar"
  width="40%"
  >
  <el-form :model="addForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <i style="margin-left:30px;">车辆类型:</i><el-select v-model="addForm.truckTypeName" placeholder="请选择" style="width:630px;">
    <el-option
      v-for="item in carType"
      :key="item.value"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
  <el-form-item label="车牌号码" prop="name" style="margin-top:30px">
    <el-input v-model="addForm.licensePlate"></el-input>
  </el-form-item>
  <el-form-item label="GPS设备ID" prop="name">
    <el-input v-model="addForm.deviceGpsId"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button>取 消</el-button>
    <el-button type="primary" @click='sureCar'>确 定</el-button>
  </span>
   </el-dialog>
  </div>
</template>

<script>
import {getCarPageApi} from '@/api/transit'
import {getTruckInfoApi,addTruck} from '@/api/truckType'
export default {
  name:'veh',
  methods:{
    close(){
      this.showCar = false
    },
   async sureCar(){
     await addTruck(this.addForm)
    this.$message.success('新增成功')
    this.getCarPage()
    this.close()
    
    },
    addCar(){
     this.showCar = true
    },
    handleCurrentChange(val){
      this.userInfo.page = val
      this.getCarPage()
    },
    handleSizeChange(val){
      this.userInfo.pageSize =val
      this.getCarPage()
    },
    cz(){
     
    },
  async   btn(type){
    this.type = type
      if(type==='alls') {
        this.getCarPage()
      }else if(type==='ok') {
        this.loading = true
      let res = await getCarPageApi({...this.userInfo,workStatus: "1",})
     
      this.list = res.data.items
      this.loading = false
      }else {
         this.loading = true
      let res = await getCarPageApi({...this.userInfo,workStatus: "0",})
    
      this.list = res.data.items
      this.loading = false
      }
     },
    async getCarPage(){
    this.loading = true
      let res = await getCarPageApi({...this.userInfo})
     this.total = +res.data.counts
      this.list = res.data.items
      this.loading = false
    },
   async getTruckInfo(){
      let res = await getTruckInfoApi()
      
      this.carType = res.data
    }
  },
  created(){
    this.getTruckInfo()
    this.getCarPage()
  },
data() {
  return {
    addForm:{
      deviceGpsId:'',
      licensePlate:'',
      truckTypeName:'',
    },
    showCar:false,
    total:0,
    type:'',
    loading:false,
    list:[],
    userInfo:{
       page: 1, //当前页
        pageSize: 10, //当前页条数
        truckTypeId: "", //车辆类型
        licensePlate: "", //车牌号码
    },
    activeName: 'second',
    carTypeId:'',
    carType:[]
  }
},
}
</script>

<style scoped lang='less'>

  .tab {
   background-color: #fff;
   margin: 20px 0;
  .el-button {
    padding: 0;
    line-height: 60px;
    text-align: center;
    width: 120px;
    height: 60px;
    background-color: red;
  }

}
.promptSize {
  width: 120px;
  height: 48px;
  text-align: center;
  font-weight: 700;
  color: #333;
}
.bg {
  color: red;
  background-color: #ffeeeb;
}
</style>
<style scoped>
  .box-card >>> .el-card__body {
  padding: 0;
  height: 48px;
 
}
</style>