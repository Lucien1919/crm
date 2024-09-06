import CryptoJS from "crypto-js"
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ")
  console.log(cookies)
  for (let i = 0; i < cookies.length; i++) {
    let parts = cookies[i].split("=")
    if (parts[0] === name) {
      return decodeURIComponent(parts[1])
    }
  }
  return null
}

export const sha1 = (str: string) => {
  return CryptoJS.SHA1(str).toString()
}

// obj to url
export const parseQueryStr = (obj: any) => {
  let str = ""
  for (let key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      str += `${key}=${obj[key]}&`
    }
  }
  return str.slice(0, -1)
}

/**
 * 表单重置
 * @param obj 表单对象
 * @returns
 */
export const resetFields = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    switch (Object.prototype.toString.call(obj[key])) {
      case "[object Number]": {
        obj[key] = 0
        break
      }
      case "[object String]": {
        obj[key] = ""
        break
      }
      case "[object Boolean]": {
        obj[key] = false
        break
      }
      case "[object Object]": {
        obj[key] = {}
        break
      }
      case "[object Array]": {
        obj[key] = []
        break
      }
      default: {
        obj[key] = null
      }
    }
  })
}
