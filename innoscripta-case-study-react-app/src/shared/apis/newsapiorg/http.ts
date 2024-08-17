import axios from 'axios'
import {
  GET_EVERYTHING_PATH,
  GET_SOURCES_PATH,
  GET_TRENDING_HEADLINES_PATH,
} from './paths'

const API_KEY = process.env.NEWS_API_ORG_KEY
const COUNTRY = 'gb'
const language = 'eng'

export const getTrendingHeadlinesAxios = () => {
  return axios.get(GET_TRENDING_HEADLINES_PATH, {
    params: {
      country: COUNTRY,
      apiKey: API_KEY,
    },
  })
}

export const getSourcesAxios = () => {
  return axios.get(GET_SOURCES_PATH, {
    params: {
      country: COUNTRY,
      apiKey: API_KEY,
    },
  })
}

export const getEverythingAxios = (
  sources: string[],
  numberOfArticles: number,
  sortBy: string
) => {
  let sourcesParam: string = `${sources[0]},`
  for (let i = 1; i < sources.length - 1; i++) {
    sourcesParam = `${sourcesParam}${sources[i]},`
  }
  sourcesParam = `${sourcesParam}${sources[sources.length - 1]}`

  return axios.get(GET_EVERYTHING_PATH, {
    params: {
      sources: sourcesParam,
      pageSize: numberOfArticles,
      sortBy: sortBy,
      apiKey: API_KEY,
    },
  })
}
