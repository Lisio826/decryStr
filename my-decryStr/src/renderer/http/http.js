import axios from 'axios'

this.$axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // config.data = JSON.stringify(config.data);
    let token = localStorage.token
    // let token = 'xxx';
    let appid = 'xxx'
    let appID = decodeURIComponent(appid)
    config.headers.token = token
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    if (config.method == 'get') {
      config.params.app_id = appID
      config.params.token = token
    }
    if (config.method == 'post') {
      config.data.token = token
      config.data.app_id = appID
    }

    return config
  },
  // eslint-disable-next-line handle-callback-err
  error => {
    return Promise.reject(err)
  }
)

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    this.$axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    this.$axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}
