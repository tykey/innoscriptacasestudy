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
