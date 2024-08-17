export type Country = {
  icon: any
  endpoint: string
}

export type Section = {
  label: string
  code: string
}

export type SourceNewsAPIOrg = {
  id: string
  name: string
}

export type Article = {
  author?: string
  content?: string
  description?: string
  publishedAt: Date
  source?: SourceNewsAPIOrg
  title: string
  url: string
  urlToImage?: string
}

export type NewsAPIOrgResponse = {
  articles: Article[]
  status: string
  totalResults: number
}
