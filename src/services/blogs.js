import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async object => {
  const config = {
    headers: { Authorization: token },
  }
  const url = baseUrl + `/${object.id}`
  const response = await axios.put(url, object, config)
  return response.data
}

const remove = async object => {
  const config = {
    headers: { Authorization: token },
  }
  const url = baseUrl + `/${object.id}`
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, setToken, update, remove }