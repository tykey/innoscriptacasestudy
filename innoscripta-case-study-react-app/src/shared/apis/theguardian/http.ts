import axios from 'axios'
import { GET_ALL_NEWS_PATH, GET_ALL_SECTIONS_PATH } from './paths'
import { TheGuardianCategory } from '../../constants/types'

const API_KEY = process.env.THE_GUARDIAN_KEY

export const getAllTheGuardianAxios = (
  numberOfArticles: number,
  category?: TheGuardianCategory
) => {
  return axios.get(category ? category.apiUrl : GET_ALL_NEWS_PATH, {
    params: {
      'api-key': API_KEY,
      'page-size': numberOfArticles,
    },
  })
}

export const getTheGuardianSectionsAxios = () => {
  return axios.get(GET_ALL_SECTIONS_PATH, {
    params: {
      'api-key': API_KEY,
    },
  })
}

export const getTheGuardianSingleItem = (id: string) => {
  return axios.get(id, {
    params: {
      'api-key': API_KEY,
    },
  })
}
