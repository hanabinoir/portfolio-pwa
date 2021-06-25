export default function Http(action, request) {

  let url = `https://hanabi-tube.herokuapp.com/${action}`
  // let localUrl = `http://127.0.0.1:5000/${action}`

  return fetch(url, { request })
  .then((response) => {
    var res

    if (response.ok) {
      res = response.json()
    } else {
      res = {
        "status": response.status,
        "msg": response.statusText,
        'is_error': !response.ok
      }
      console.log(res)
    }

    return new Promise((resolve, reject) => {
      resolve(res)
    })
  })
  .catch((error) => console.error(error))
  
}