import request from "../utils/request";
//获取菜单列表数据
export const getMenuApi = () => {
  return request({
   
    url: `/menus`,
  
    
  });
};
export const getTreeApi = () => {
  return request({
   
    url: `/business-hall/tree`,
  
    
  });
};
//获取工作台数据
export const getAllApi= () => {
  return request({
   
    url: `/workspace`,
  
    
  });
};
export const getaddressApi= (params) => {
  return request({
   
    url: `/areas/children/`,
    params

  
    
  });
};
// 获取机构信息
export const getOrgizationInfoApi = (id, params) => {
  return request({
    method: 'get',
    url: '/business-hall/' + id,
    params
  })
}

// 获取员工信息
export const getuserInfoApi = (params) => {
  return request({
    method: 'get',
    url: '/business-hall/user/page',
    params
  })
}