export type Country = {
  icon: any
  endpoint: string
}

export type Section = {
  label: string
  code: string
  allowsCategories: boolean
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
  source: SourceNewsAPIOrg
  title: string
  url: string
  urlToImage?: string
}

export type NewsAPIOrgResponse = {
  articles: Article[]
  status: string
  totalResults: number
}

export type SearchFilter = {
  keywords: string
  sortBy: string
}

export type SelectOption<T> = {
  label: string
  code: T
  selectIndex: number
}

export type TheGuardianCategory = {
  apiUrl: string
  id: string
  webTitle: string
}

export type NewsAPIOrgFilter = {
  sortBy?: string
  sources?: SourceNewsAPIOrg[]
}
