import { Article, NewsAPIOrgResponse } from './types'

export const mapTheGuardianNewsToNews = (
  theGuardianResponse: any
): NewsAPIOrgResponse => {
  const mappedNews: NewsAPIOrgResponse = {
    totalResults: theGuardianResponse.total,
    articles: theGuardianResponse.results.map((result: any) => {
      const mappedArticle: Article = {
        title: result.webTitle,
        publishedAt: result.webPublicationDate,
        url: result.webUrl,
        source: {
          id: 'theguardian',
          name: 'The Guardian',
        },
      }

      return mappedArticle
    }),
    status: 'ok',
  }

  return mappedNews
}

export const mapNYTimesNewsToNews = (
  maxNumberOfArticles: number,
  nyTimesResponse: any
): NewsAPIOrgResponse => {
  const mappedNews: NewsAPIOrgResponse = {
    totalResults: Math.min(maxNumberOfArticles, nyTimesResponse.num_results),
    articles: nyTimesResponse.results
      .slice(0, maxNumberOfArticles)
      .map((result: any) => {
        const mappedArticle: Article = {
          title: result.title,
          publishedAt: result.published_date,
          url: result.url,
          source: {
            id: 'nytimes',
            name: 'The New York Times',
          },
        }

        return mappedArticle
      }),
    status: 'ok',
  }

  return mappedNews
}

export const redirectToUrl = (url: string) => window.open(url, '_blank')
