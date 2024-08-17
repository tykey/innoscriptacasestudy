const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2'
const MOST_VIEWED_PATH = '/viewed'

export const NY_TIMES_MOST_VIEWED_PATH = (period: number) =>
  BASE_URL + MOST_VIEWED_PATH + `/${period}.json`
