import axios from 'axios'
import { NY_TIMES_MOST_VIEWED_PATH } from './paths'

const API_KEY = process.env.NY_TIMES_KEY

export const getMostViewedNYTimesAxios = (period: number) => {
  return axios.get(NY_TIMES_MOST_VIEWED_PATH(period), {
    params: {
      'api-key': API_KEY,
    },
  })
}
