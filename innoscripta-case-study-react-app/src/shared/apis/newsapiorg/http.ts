import axios from 'axios'
import {
  GET_EVERYTHING_PATH,
  GET_SOURCES_PATH,
  GET_TRENDING_HEADLINES_PATH,
} from './paths'
import { SourceNewsAPIOrg } from '../../constants/types'

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
  sources: SourceNewsAPIOrg[],
  numberOfArticles: number,
  sortBy: string
) => {
  let sourcesParam: string = ''
  for (let i = 0; i < sources.length; i++) {
    sourcesParam = `${sourcesParam}${sources[i].id},`
  }
  // remove comma
  sourcesParam = sourcesParam.slice(0, sourcesParam.length)

  return axios.get(GET_EVERYTHING_PATH, {
    params: {
      sources: sourcesParam,
      pageSize: numberOfArticles,
      sortBy: sortBy,
      apiKey: API_KEY,
    },
  })
}
