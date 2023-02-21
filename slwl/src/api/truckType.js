import request from "../utils/request";
export const getTruckApi = (params) => {
  return request({
   
    url: `/truckType/page`,
   params
    
  });
};
export const addTruckApi = (data) => {
  return request({
   method:'post',
    url: `/truckType`,
   data
    
  });
};
export const editTruckApi = (id,params) => {
  return request({
   
    url: `/truckType/${id}`,
   params
    
  });
};
export const putTruckApi = (id,data) => { //更新车辆信息
  return request({
   method:'put',
    url: `/truckType/${id}`,
   data
    
  });
};
export const delTruckApi = (id) => { //删除车辆信息
  return request({
   method:'delete',
    url: `/truckType/${id}`,
   
    
  });
};

export const getTruckInfoApi= () => { //获取车辆类型信息列表
  return request({
   
    url: `/truckType/simple`,
   
    
  });
};