import axios from 'axios'

const baseUrl = '/api/comments'

const createComment = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { createComment }