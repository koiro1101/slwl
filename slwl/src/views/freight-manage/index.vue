<template>
  <div>
    <el-card>
      <el-button type='danger' @click='addMb'>新增模板</el-button>
       <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      
      label="模板类型"
      width="280">
      <template #default='{row}'> {{fomater(row.templateType)}}</template>
    </el-table-column>
    <el-table-column
     
      label="运送类型"
      width="280">
      <template #default='{row}'> {{fomater1(row.transportType)}}</template>
    </el-table-column>
    <el-table-column
      
      label="关联城市">
      <template #default='{row}'> {{fomater2(row.associatedCityList)}}</template>
    </el-table-column>
    <el-table-column
      prop="firstWeight"
      label="首重">
    </el-table-column>
    <el-table-column
      prop="continuousWeight"
      label="续重">
    </el-table-column>
    <el-table-column
      prop="lightThrowingCoefficient"
      label="轻抛系数">
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
  :title="showName"
  :visible.sync="dialogVisible"
  width="40%"
  @close='close'
  >
<el-form :inline="true"  label-position='right' :model="formData" ref='form'>
   <div style="margin-left:40px">
     <el-form-item label="模板类型" style='margin-left:40px'>
    <el-select v-model="formData.templateType" placeholder="请选择" style="width:550px">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item label="运送类型"  style='margin-left:40px'>
    <el-select v-model="formData.transportType" placeholder="请选择" style="width:550px">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="关联城市" prop='allowableVolume' style="margin-left:40px ">
    <span v-if="!type">全国</span>
    <el-checkbox-group v-model="associatedCityList" v-else >
              <el-checkbox label="京津冀" name="associatedCityList"></el-checkbox>
              <el-checkbox label="江浙沪" name="associatedCityList"></el-checkbox>
              <el-checkbox label="川渝" name="associatedCityList"></el-checkbox>
              <el-checkbox label="黑吉辽" name="associatedCityList"></el-checkbox>
            </el-checkbox-group>
   <!-- <el-select v-model="associatedCityList" placeholder="请选择" style="width:550px">
    <el-option
      v-for="item in options3"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
  </el-form-item>
  <el-form-item label="首重价格" style="margin-left:40px " >
    <el-input style="width:550px;" v-model="formData.firstWeight">  <template slot="suffix">元</template></el-input>
  </el-form-item>
  <el-form-item label="续重价格" style="margin-left:40px" prop='measureWidth'>
    <el-input style="width:550px" v-model="formData.continuousWeight">  <template slot="suffix">元</template></el-input>
  </el-form-item>
  <el-form-item label="轻抛系数" style="margin-left:40px" >
    <el-input style="width:550px"  v-model="formData.lightThrowingCoefficient">  <template slot="suffix">元</template></el-input>
  </el-form-item>
   </div>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button >取 消</el-button>
    <el-button type="primary" @click='sureMb'>确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
const map= {
  1:'同城寄',
  2:'省内寄',
  3:'经济区互寄',
  4:'跨省'
}
const map1= {
  1:'普快',
  2:'特快',

}
const map2= {
  1:'全国',
  2:'京津冀',
  3:'江浙沪',
  4:'川渝',
  5:'黑吉辽'
}
import {getcarriagesApi,addcarriagesApi,delcarriagesApi} from '@/api/user'
export default {
  name:'fre',
  computed:{
    showName(){
      return this.type==='edit' ? '编辑模板' :'新增模板'
    }
  },
   created() {
    this.getcarriages()
  },
  methods: {
   async del(id){
    await this.$confirm('确定删除吗')
     await delcarriagesApi(id)
     this.$message.success('删除成功')
     this.getcarriages()
    },
    async edit(row){
      this.type  ='edit'
      this.dialogVisible = true
    this.formData = row
    this.formData.associatedCityList[0] = map2[this.formData.associatedCityList[0]]
    console.log(row);
    
    },
    close(){
      this.type = ''
      this.$refs.form.resetFields()
      this.dialogVisible = false
      this. formData={
        templateType:'',
        transportType:'', //快递类型
        //关联城市
        firstWeight:'',//首重
        continuousWeight:'',//续重
        lightThrowingCoefficient:''
    }
    },
   async sureMb(){
    if(this.type!=='edit'){
       await addcarriagesApi({...this.formData,associatedCityList:[1]})
      
      this.$message.success('新增成功')
    }else {
      await addcarriagesApi({...this.formData,associatedCityList:[1]})
      this.$message.success('修改成功')
    }
    
      this.getcarriages()
      this.close()
    },
    addMb(){
      this.dialogVisible = true
    },
     fomater2(val){
      return map2[val]
    },
    fomater1(val){
      return map1[val]
    },
    fomater(val){
      return map[val]
    },
    async getcarriages(){
      let res = await getcarriagesApi()
        console.log(res)
      this.tableData = res.data
    }
  },
 
data() {
  
  return {
    type:"",
    options3: [{
          value: 1,
          label: '全国'
        }, {
          value: 2,
          label: '京津冀'
        }, {
          value: 3,
          label: '江浙沪'
        }, {
          value: 4,
          label: '川渝'
        },
         {
          value: 5,
          label: '黑吉辽'
        }],
    options1: [{
          value: 1,
          label: '普快'
        },
        {
          value: 2,
          label: '特快'
        }],
     options: [{
          value: 1,
          label: '同城寄'
        }, {
          value: 2,
          label: '省内寄'
        }, {
          value: 3,
          label: '经济区互寄'
        }, {
          value: 4,
          label: '跨省'
        }],
    formData:{
        templateType:'',
        transportType:'', //快递类型
        //关联城市
        firstWeight:'',//首重
        continuousWeight:'',//续重
        lightThrowingCoefficient:''
    },
    associatedCityList:[],
    
    dialogVisible:false,
    tableData: []
  }
},
}
</script>

<style scoped lang='less'>
.el-card {
  width: 1670px;
  height: 460px;
}
</style>