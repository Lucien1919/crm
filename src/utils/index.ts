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
