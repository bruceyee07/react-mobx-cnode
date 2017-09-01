export const prettyDate = (date) => {
  date = new Date(date)

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const month = 31 * day
  const year = 12 * month

  if (date == null) { 
    return null
  } 
  const diff = new Date().getTime() - date.getTime()
  let r = 0
  if (diff > year) { 
    r = parseInt(diff / year)
    return r + '年前'
  } 
  if (diff > month) { 
    r = parseInt(diff / month)
    return r + '个月前' 
  } 
  if (diff > day) { 
    r = parseInt(diff / day) 
    return r + '天前'
  } 
  if (diff > hour) { 
    r = parseInt(diff / hour)
    return r + '小时前' 
  } 
  if (diff > minute) { 
    r = parseInt(diff / minute)
    return r + '分钟前'
  } 
  return '刚刚'
}

export const storeToken = (...args) => {
  if (args.length === 1) {
    return window.localStorage.getItem(args[0])
  }
  window.localStorage.setItem(args[0], JSON.stringify(args[1]))
}

export const deleteToken = (key) => {
  window.localStorage.removeItem(key)
}