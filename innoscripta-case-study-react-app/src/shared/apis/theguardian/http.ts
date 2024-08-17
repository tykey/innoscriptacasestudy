import axios from 'axios'
import { GET_ALL_NEWS_PATH } from './paths'

const API_KEY = process.env.THE_GUARDIAN_KEY

export const getAllTheGuardianAxios = (numberOfArticles: number) => {
  return axios.get(GET_ALL_NEWS_PATH, {
    params: {
      'api-key': API_KEY,
      'page-size': numberOfArticles,
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
