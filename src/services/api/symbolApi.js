import axiosClient from "./axiosClient"

const symbolApi = {
  getAll(params) {
    const url = "/symbol_static_data.json"
    return axiosClient.get(url, { params })
  }
  // get(id) {
  //     const url = `/categories/${id}`;
  //     return axiosClient.get(url);
  // },
  // add(data) {
  //     const url = '/categories';
  //     return axiosClient.post(url,data);
  // },
  // update(data) {
  //     const url = `/categories/${data}`;
  //     return axiosClient.patch(url,data);
  // },
  // remove(id) {
  //     const url = `/categories/${id}`;
  //     return axiosClient.delete(url);
  // }
}
export default symbolApi
