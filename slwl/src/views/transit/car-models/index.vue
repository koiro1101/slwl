<template>
  <div>
    <el-card>
      <el-form :inline="true" ref="ref" :model='carData'>
        <el-row>
          <el-col :span='8'> <el-form-item label="车型编号:" >
           <el-input style="width:400px" v-model="carData.id"></el-input>
           </el-form-item>
           </el-col>
           <el-col :span='8'>
             <!-- <el-form-item label="应载重量:" >
           <el-input style="width:400px"></el-input>
           </el-form-item> -->
             应载重量: <el-select v-model="carData.allowableLoad" placeholder="请选择" style="width:400px" label="应载重量:">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
           </el-col>
           <el-col :span='8'> 
            应载体积: <el-select v-model="carData.allowableVolume" placeholder="请选择" style="width:400px" label="应载重量:">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
           </el-col>
           
        </el-row>
        <el-row>
          <el-col :span='8'>
          <el-form-item label="车型类型:" >
           <el-input style="width:400px" v-model="carData.name"></el-input>
           </el-form-item>
          </el-col>
          <el-col :span='8'> 
            <el-button type='danger' style="width:100px" @click='serachCar'>搜索</el-button>
            <el-button type='info' style="width:100px" @click='cz'>重置</el-button>
          </el-col>
          
        </el-row>
      </el-form>
    </el-card>
    <el-card class="a">
      <el-button type='danger' @click='addCar=showdig = true'>新增车型</el-button>
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
      prop="id"
      label="车辆编号"
      width="280">
    </el-table-column>
    <el-table-column
     width="200"
      prop="name"
      label="车辆类型">
    </el-table-column>
    <el-table-column
      prop="num"
      label="车辆数量">
    </el-table-column>
    <el-table-column
      prop="allowableLoad"
      label="应载重量（吨）">
    </el-table-column>
    <el-table-column
      prop="allowableVolume"
      label="应载体积">
    </el-table-column>
    <el-table-column
      prop="measureLong"
      label="长">
    </el-table-column>
    <el-table-column
      prop="measureWidth"
      label="宽">
    </el-table-column>
    <el-table-column
      prop="measureHigh"
      label="高">
    </el-table-column>
     <el-table-column
     
      label="操作">
      <template #default='{row}'>
         <el-link type="primary" :underline="false" @click='edit(row)'>编辑</el-link> <span style="color:#dcdfe6;margin:0 10px 0">|</span>
          <el-link type="danger" :underline="false" @click='del(row.id)'>删除</el-link>
      </template>
    </el-table-column>
    
  </el-table>
    </el-card>
    <el-dialog
  :title="showname"
  :visible.sync="showdig"
  width="40%"
  @close='close'
  >
  <el-form :inline="true"  label-position='right' :model="formData" ref='form'>
   <div style="margin-left:40px">
     <el-form-item label="车辆类型" prop='name'>
    <el-input style="width:550px" v-model="formData.name"></el-input>
  </el-form-item>
   <el-form-item label="应载重量" prop='allowableLoad'>
    <el-input style="width:550px" v-model="formData.allowableLoad">
      <template slot="suffix">吨</template>
    </el-input>
  </el-form-item>
  <el-form-item label="应载体积" prop='allowableVolume'>
    <el-input style="width:550px" v-model="formData.allowableVolume">  <template slot="suffix">立方</template></el-input>
  </el-form-item>
  <el-form-item label="长" style="margin-left:40px " prop='measureLong'>
    <el-input style="width:550px;" v-model="formData.measureLong">  <template slot="suffix">米</template></el-input>
  </el-form-item>
  <el-form-item label="宽" style="margin-left:40px" prop='measureWidth'>
    <el-input style="width:550px" v-model="formData.measureWidth">  <template slot="suffix">米</template></el-input>
  </el-form-item>
  <el-form-item label="高" style="margin-left:40px" prop='measureHigh'>
    <el-input style="width:550px" v-model="formData.measureHigh">  <template slot="suffix">米</template></el-input>
  </el-form-item>
   </div>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click='sureCar' >确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import {getTruckApi,addTruckApi,editTruckApi,putTruckApi,delTruckApi,getTruckInfoApi} from '@/api/truckType'
export default {
  computed:{
    showname(){
    return  this.formData.id ?'编辑车型' :'新增车型'
    }
  },
  created() {
    this.getTruck()
    this.getTruckInfo()
  },
  methods: {
    cz(){
      this. carData = {
      page:1,
      pageSize:10,
      allowableLoad:'',
      allowableVolume:'',
      id:'',
      name:''
    }
    this.getTruck()
      
      
    },
   async serachCar(){
     console.log(this.carData);
      let res =await getTruckApi(this.carData)
      this.tableData = res.data.items
      // this.getTruck()
    },
  async  getTruckInfo(){
    let res =  await getTruckInfoApi()
    console.log(res);
    },
   async del(id){
     await this.$confirm('是否确认删除')
    await  delTruckApi(id)
    this.$message.success('删除成功')
    this.getTruck()
    },
    close(){
      this.showdig = false
       this.formData = {
      name:'',//类型
      measureWidth:'',
      measureLong:'',
      measureHigh:'',
      allowableVolume:'',//体积
      allowableLoad:'', //重量
    }
    },
   async edit(row){
    console.log(row);
 let res =   await editTruckApi(row.id,{0:row.id})
      this.showdig = true
      this.formData = res.data
      // console.log(res);
    },
  async  sureCar(){
  if(this.formData.id){
   let res = await putTruckApi(this.formData.id,{...this.formData})
   this.getTruck()
   this.$message.success('编辑成功')
   this.close()
    
  }else{
let res =await  addTruckApi(this.formData)
    console.log(res);
    this.$message.success('添加成功')
    this.getTruck()
     this.close()
  }
    
    },
   async getTruck() {
    let res =await getTruckApi(this.truckInfo)
    console.log(res);
    this.tableData = res.data.items
   }
  },
data() {
  
  return {
    carData:{
      page:1,
      pageSize:10,
      allowableLoad:'',
      allowableVolume:'',
      id:'',
      name:''
    },
   

    options1: [{
          value: 'RANGE_LEVEL_1',
          label: '<1.8（吨）'
        }, {
          value: 'RANGE_LEVEL_2',
          label: '1.8-1.6（吨）'
        }, {
          value: 'RANGE_LEVEL_3',
          label: '6-1.4（吨）'
        }, {
          value: 'RANGE_LEVEL_4',
          label: '14-30（吨）'
        }, {
          value: 'RANGE_LEVEL_5',
          label: '30-50（吨）'
        },
        {
          value: 'RANGE_LEVEL_6',
          label: '50-100（吨）'
        },
        {
          value: 'RANGE_LEVEL_7',
          label: '100>（吨）'
        }],
        options2: [{
          value: 'RANGE_LEVEL_1',
          label: '<3（m）'
        }, {
          value: 'RANGE_LEVEL_2',
          label: '3-5（吨）'
        }, {
          value: 'RANGE_LEVEL_3',
          label: '5-10（吨）'
        }, {
          value: 'RANGE_LEVEL_4',
          label: '10-15（吨）'
        }, {
          value: 'RANGE_LEVEL_5',
          label: '15-30（吨）'
        },
        {
          value: 'RANGE_LEVEL_6',
          label: '30-50（吨）'
        },
        {
          value: 'RANGE_LEVEL_7',
          label: '50-80（吨）'
        },
        {
          value: 'RANGE_LEVEL_8',
          label: '80-150（吨）'
        },
        {
          value: 'RANGE_LEVEL_9',
          label: '150>（吨）'
        }],
    formData:{
      name:'',//类型
      measureWidth:'',
      measureLong:'',
      measureHigh:'',
      allowableVolume:'',//体积
      allowableLoad:'', //重量
    },
    showdig:false,
    truckInfo:{
      page:1,
      pageSize:10
    },
    tableData: []
  }
},
}
</script>

<style scoped lang='less'>
.el-card {
  height: 140px;
  
}
.a {
  margin-top: 20px;
  width: 1670px;
  height: 714px;

}

</style>