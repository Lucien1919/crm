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

// 表单重置

export const resetFields = (obj: any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = ""
    }
  }
}

// 根据code获取name
export const getCodeName = (codeList: any, code: number) => {
  return codeList.find((item: any) => item.id == code)?.name || "未知类型"
}

// 格式化对象
export const formatObj = (obj: any) => {
  Object.keys(obj).map((key: string) => {
    ;(obj as any)[key] = (obj as any)[key] || "--"
    return
  })
  return obj
}
