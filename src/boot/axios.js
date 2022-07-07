import { boot } from "quasar/wrappers";
import axios from "axios";

// const http = axios.create({ baseURL: "http://localhost:18099" });
const http = axios.create();

const useApi = () => {
  return {
    getSettings: () => http.get("/get_setting"),
    getHistory: (begin, end) => http.post("/history", {
      begin: begin,
      end: end
    }),
    getData: () => http.get("/dht11_json"),
    sendMail: () => http.get("/mail"),
    sendWechat: () => http.get("/wechat"),
    setSettings: (settings) => http.post("/update", settings)
  };
};

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$http = http;
  app.config.globalProperties.$api = useApi();
});

export { http, useApi };
