import request from "../utils/request";
export const getCarPageApi= (params) => { //获取车辆分页数据
  return request({
   
    url: `/truck/page`, 
    params
  });
};
export const getCarBackPageApi= (data) => { //获取车辆回车分页数据
  return request({
   method:'post',
    url: `/truck-return-register/pageQuery`, 
    data
  });
};