const _baseURL_ = 'http://172.29.35.149:5656/v1/i'

function jump(to, v) {
  if (v.$router) {
    v.$router.push(to, function () {
    }, function () {
    })
  } else {
    console.log('Not Found router!')
  }
}

function go(n, v) {
  if (v.$router) {
    v.$router.go(n)
  } else {
    console.log('Not Found router!')
  }
}

function objToStrMap(obj) {
  let strMap = new Map()
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k])
  }
  return strMap
}

function strMapToObj(strMap) {
  let obj = Object.create(null)
  for (let [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}

// options axios的options
function PF(v, url, data, options = {}) {
  if (url === false) {
    return false
  }
  if (v.$axios === false) {
    return false
  }
  let o = objToStrMap(options)
  let _url = url
  let _method = 'post'
  let _baseURL = _baseURL_
  let _data = data

  if (!o.has('url')) {
    o.set('url', _url)
  }
  if (!o.has('method')) {
    o.set('method', _method)
  }
  if (!o.has('baseURL')) {
    o.set('baseURL', _baseURL)
  }
  if (!o.has('data')) {
    o.set('data', _data)
  }
  if (o.get('method') === 'post') {
    if (!o.has('headers')) {
      o.set('headers', new Map())
      o.get('headers').set('Content-Type', 'application/json;charset=UTF-8')
    } else {
      if (typeof o.get('headers') === "object" && !objToStrMap(o.get('headers')).has('Content-Type')) {
        o.get('headers').set('Content-Type', 'application/json;charset=UTF-8')
      }
      // if (!o.get('headers').has('Content-Type')) {
      //   o.get('headers').set('Content-Type', 'application/json;charset=UTF-8')
      // }
    }
  }
  o.set('Keep-Alive', 'timeout=5, max=100')
  // if (!o.has('xsrfCookieName')) {
  //     o.set('xsrfCookieName','_csrf')
  // }
  //
  // if (!o.has('xsrfHeaderName')) {
  //     o.set('xsrfHeaderName','X-CSRF-Token')
  // }
  options = strMapToObj(o)

  return v.$axios(options)
}

/**
 * 获取字符串的哈希值
 * @param {String} str
 * @param {Boolean} caseSensitive
 * @return {Number} hashCode
 */
function getHashCode(str, caseSensitive) {
  if (!caseSensitive) {
    str = str.toLowerCase()
  }
  let hash = 1315423911
  let i
  let ch
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i)
    hash ^= ((hash << 5) + ch + (hash >> 2))
  }
  return (hash & 0x7FFFFFFF)
}

export default {

  methods: {
    go: function (n) {
      return go(n, this)
    },
    jump: function (to) {
      return jump(to, this)
    },
    PF: function (url, data, options) {
      return PF(this, url, data, options)
    },
    baseURL: function () {
      return _baseURL_
    },
    getHashCode(str, caseSensitive) {
      return getHashCode(str, caseSensitive)
    }
  }
}
