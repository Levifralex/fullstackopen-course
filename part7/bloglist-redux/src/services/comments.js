import axios from 'axios'

const baseUrl = '/api/comments'
let isError = false

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

const createComment = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { createComment, setError, getError }