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
