<template>
  <div>
    <el-card style="height:160px">
      <el-form :inline="true">
        <el-row>
          <el-col :span='8'>
            <el-form-item label="运输任务编号">
              <el-input style="width:380px" v-model="searchForm.transportTaskId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
        起始地机构 <el-cascader
         :props="cat"
    v-model="treeVal"
   
    :options="treeList"
    ></el-cascader>
          </el-col>
          <el-col :span='8'>
        目的地机构 <el-cascader
         :props="cat"
    v-model="endval"
   
    :options="treeList"
    ></el-cascader>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span='7'>

           回车时间  
             <el-date-picker
      v-model="value1"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
          </el-col>
          <el-col :span='7'>
            车辆是否可用:
            <el-select v-model="searchForm.isAb" placeholder="请选择" style="width:300px">
                    <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
            </el-select>
          </el-col>
          <el-col :span='5'>
            <el-button type="danger" @click='serach'>搜索</el-button>
             <el-button >重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-table
    :data="tableList"
    stripe
    style="width: 100%;margin-top:30px">
    <el-table-column
      prop="transportTaskId"
      label="运输任务编号"
      width="280">
    </el-table-column>
    <el-table-column
      prop="startAgencyName"
      label="起始地机构"
      width="180">
    </el-table-column>
    <el-table-column
      prop="endAgencyName"
      label="目的地机构">
    </el-table-column>
     <el-table-column
      prop="transportOrderNumber"
      label="运单数量">
    </el-table-column>
     <el-table-column
      prop="outStorageTime"
      label="出车时间">
    </el-table-column>
     <el-table-column
      prop="intoStorageTime"
      label="回车时间">
    </el-table-column>
     <el-table-column
      prop="licensePlate"
      label="车牌号码">
    </el-table-column>
     <el-table-column
     
      label="车辆是否可用">
      <template #default='{row}'>
        {{row.isAvailable ? '可用' :'不可用'}}
      </template>
    </el-table-column>
     <el-table-column
     
      label="操作">
      <template>
          <el-link type="primary" :underline="false">查看</el-link>
      </template>
    </el-table-column>
    
  </el-table>
  </div>
</template>

<script>
import {getTreeApi} from '@/api/user'
import {getCarBackPageApi} from '@/api/transit'
export default {
  watch:{
    treeVal:{
      handler(old,newval){
     
       this.searchForm.startAgencyId = old[this.treeVal.length-1]
      
      }
    },
     endval:{
      handler(old,newval){
       console.log(old,newval);
       this.searchForm.endAgencyId = old[this.endval.length-1]
      
      }
    },
    value1:{
      handler(val){
      this.searchForm.intoStorageEndTime = val[1]
      this.searchForm.intoStorageStartTime = val[0]
      }
    }
  },
  name:'reg',
  created(){
   
    this.getCarBackPage()
    this.getTree()
    
  },
  data() {
   
    return {
      searchForm:{
        isAb:'', //是否可用
        endAgencyId:'', //目的机构  
        intoStorageEndTime:'',//结束时间
        intoStorageStartTime:'',//开始时间
        startAgencyId:'',//起始机构
        transportTaskId:""//任务ID
        },
      
       value1:[], //回车事件
      
      options:[{label:'全部',value:''},
      {label:'可用',value:true},
      {label:'不可用',value:false}],
      tableList:[],
      userInfo:{
        page:1,
        pageSize:10
      },
      cat:{
        label:'name',
        value:'id',
        expandTrigger: 'hover',
        checkStrictly: true
      },
       defa:{
       label: 'name',
        children:'children'
    },
      treeVal:[],
      endval:[],
      treeList:[]
    }
  },
methods:{
 async serach(){
   let res = await getCarBackPageApi(this.searchForm)
   console.log(res);
  },
 async getCarBackPage(){
let res = await getCarBackPageApi(this.userInfo)
console.log(res);
this.tableList = res.data.items
  },
  async getTree(){
    let res = await getTreeApi()
   this.treeList = JSON.parse(res.data)
  }
}
}
</script>

<style>

</style>