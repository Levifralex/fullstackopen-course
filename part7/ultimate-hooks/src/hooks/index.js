import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    inputProps: {
      type,
      value,
      onChange,
    },
    reset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try{
        const response = await axios.get(baseUrl);
        setResources(response.data);
    } catch(error) {
        alert('Something go wrong');
        console.error(error);
        setResources();
    }
  };

  const create = async(resource) => {
    try {
        const response = await axios.post(baseUrl, resource);
        setResources(resources.concat(response.data));
    } catch (error) {
        alert('Something go wrong');
        console.error(error);
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}