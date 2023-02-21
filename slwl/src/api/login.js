import request from "../utils/request";
export const getVerifyApi = (params) => {
  return request({
    method: `GET`,
    url: `/captcha`,
    params,
    responseType: "blob",
  });
};
export const loginApi = (data) => {
  return request({
    method: `post`,
    url: `/login`,
    data,
    
  });
};
