import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null
let isError = false

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const setError = (value) => {
  isError = value
}

const getError = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(isError)
    }, 1000)
  })
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getBlogComments = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

export default { getAll, setToken, create, update, remove, setError, getError, getBlogComments }
