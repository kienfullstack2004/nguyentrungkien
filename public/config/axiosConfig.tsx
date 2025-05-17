import axios from "axios";
const instance = axios.create({
    baseURL:"https://nguyentrungkien-api.onrender.com/",
});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
    const authData = localStorage.getItem("persist:auth");
    const token = authData ? JSON.parse(authData)?.token?.slice(1,-1) : null;

    config.headers.set('Authorization', `Bearer ${token}`);
    return config;
  }, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  });

// Thêm một bộ đón chặn response
instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance;
