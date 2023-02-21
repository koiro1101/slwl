<template>
  <div class="dashboard-box">
   <el-row style="height:235px">
    <el-col  class="col1" style="margin-bottom:20px">
      <div class="left" >
        <div style="font-weight:700;margin:20px">机构概述</div>
       <div class="container">
        <p style="margin-top:30px">西三旗分拣中心</p>
        <div class="address">地址：北京顺义区天澜综合保税区123号</div>
        <p>负责人：赵五金 16712345678</p>
        <el-button>点击查看营业分布</el-button>
       </div>
      </div>
      <div class="right" >
       <div class="top">
        <div class="item">
          <div class="label">分拣中心(个)</div>
          <div class="num">1</div>
        </div>
        <div class="item">
          <div class="label">司机人数(个)</div>
          <div class="num">1</div>
        </div>
       </div>
        <div class="bot">
          <div class="item">
          <div class="label">营业部(个)</div>
          <div class="num">1</div>
        </div>
        <div class="item">
          <div class="label">快递员人数(个)</div>
          <div class="num">1</div>
        </div>
        </div>
      </div>
    </el-col>
    <el-col  class="col2">
      <div class="header">
        <p>今日数据</p>
        <div class="ref">2023-02-18 14:09</div>
      </div>
      <div class="continer">
        <div class="item">
          <p>订单金额(元)</p>
          <div class="num">2284</div>
          <p style="color:#818693;font-size:10px">较昨日 +342 <i class="el-icon-top" style="font-size:15px;font-weight:700;color:red;"></i></p>
        </div>
        <div class="item">
          <p>订单金额(元)</p>
          <div class="num">2284</div>
          <p style="color:#818693;font-size:10px">较昨日 +342 <i class="el-icon-top" style="font-size:15px;font-weight:700;color:red;"></i></p>
        </div>
        <div class="item">
          <p>订单金额(元)</p>
          <div class="num">2284</div>
          <p style="color:#818693;font-size:10px">较昨日 +342 <i class="el-icon-top" style="font-size:15px;font-weight:700;color:red;"></i></p>
          
        </div>
      </div>
    </el-col>
    <el-col  class="col1" >
     <div style="font-weight:700;margin:20px">代办任务</div>
     <div class="conChart">
      <div ref="box" class="chart"></div>
     </div>
    
     
     
    </el-col>
    <el-col  class="col2">
      <div class="header">
        <p>执行任务中</p>
        <div class="ref">2023-02-18 14:09</div>
      </div>
      
    </el-col>
   </el-row>
   
  </div>
</template>

<script>

import { getAllApi} from '@/api/user'

export default {
  mounted() {
 
 
  },
  name:'dash',
  data() {
    return {
      
        backlog: {},
       orderLineChart: {},
       organOverview: {},
       todayData: {},
       transportTaskList:[],
     
    }
  },
  created() {
    console.log(this);
    this.getAll()
    console.log(this.backlog);
  },
  methods: {
   
   async getAll() {
    const {
        data: {
          backlog,
          orderLineChart,
          organOverview,
          todayData,
          transportTaskList
        }
    } = await getAllApi()
     
      this.backlog = backlog
      this.organOverview = organOverview
      this.orderLineChart = orderLineChart
      this.todayData = todayData
      this.transportTaskList = transportTaskList
   
    }
  }
 
}
</script>

<style scoped lang="less">

.col1{
  
  height: 100%;
  width: 960px;
  display: flex;
  background-color: #fff;
  .left {
   width: 500px !important;
   z-index: 111;
   
    // background-color: skyblue;
    .container{
      margin-left: 25px;
      p:nth-child(3){
        color: #818693;
      }
      .address{
        margin: 10px 0;
        font-size: 12px;
        color: #818693;

      }
      .el-button {
        margin-top: 25px;
        border-color: #ff6b4a;
        background-color: #ffeeeb;
        border-radius: 5px;

      }
      .el-button:hover {
        background-color: #ff6b4a;
      }
      
    }
  }
  .right {
    
    width: 490px;
    margin: 40px 0;
    border-left: 1px solid #ebeef5;
    display: flex;
    justify-content: space-around;
    
    .item {
      height: 85px;
      .num {
        font-weight: 700;
        color: red;
        font-size: 30px;
      }
    }
    
  }
}
.col2 {
  .continer{
    display: flex;
    justify-content: space-around;
    .item {
      margin-top: 10px;
      .num {
        margin-top: 20px;
        margin-bottom: 20px;
        color: #20232a;
        font-size: 35px;
        font-weight: 700;
      }
      text-align: center;
      width: 210px;
      height: 139px;
      // background-color: skyblue;
    }
  }
  margin-left: 20px;
      background-color: #fff;
      width: 670px;
      height: 100%;
      .header{
        p{
          font-weight: 700;
        }
        margin: 15px;
        display: flex;
        justify-content: space-between;
      }
    }
</style>