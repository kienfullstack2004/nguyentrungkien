import axiosConfig from "../config/axiosConfig";

export const apiCreateNew = (payload: { title: string, dess: string, desshort: string, image: string }) => new Promise(async (relsove, reject) => {
  try {
    const responsive = await axiosConfig({
      method: "post",
      url: "public/new",
      data: payload
    })
    relsove(responsive);
  } catch (error) {
    reject(error);
  }
})
export const apiNews = () => new Promise(async (relsove, reject) => {
  try {
    const responsive = await axiosConfig({
      method: "get",
      url: "public/news"
    })
    relsove(responsive);
  } catch (error) {
    reject(error);
  }
})
export const apiNewsUser = () => new Promise(async (relsove, reject) => {
  try {
    const responsive = await axiosConfig({
      method: "get",
      url: "public/newsUser"
    })
    relsove(responsive);
  } catch (error) {
    reject(error);
  }
})
export const apiDeletePost = (id: string) => new Promise(async (relsove, reject) => {
  try {
    const responsive = await axiosConfig({
      method: "delete",
      url: "public/news/" + id
    })
    relsove(responsive);
  } catch (error) {
    reject(error);
  }
})
export const apiOnePost = (id: string) => new Promise(async (relsove, reject) => {
  try {
    const responsive = await axiosConfig({
      method: "get",
      url: "public/news/" + id
    })
    relsove(responsive);
  } catch (error) {
    reject(error);
  }
})

