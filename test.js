const axios = require("axios").default
const getToken = function() {
  return axios
    .post(
      "/oauth/token",
      {},
      {
        baseURL: "http://localhost:8091",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        auth: {
          username: "master",
          password: "8xY87473J444rt4x",
        },
        params: {
          grant_type: "client_credentials",
          scope: "root",
        },
      }
    )
    .then(res => {
      console.log(res.data)
      return res.data.access_token
    })
}

getToken()
  .then(res => console.log(res))
  .catch(e => console.log(e))
