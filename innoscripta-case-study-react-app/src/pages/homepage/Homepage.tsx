import { Navigate, useNavigate } from 'react-router-dom'
import { isValidLocation } from '../../shared/constants/misc'
import { DefaultSpan } from '../../shared/styles/General.styled'
import { LANDING_PAGE_PATH } from '../../shared/constants/paths'
import {
  HomepageHeader,
  HomepageHeaderButton,
  HomepageWrapper,
} from './Homepage.styled'
import { useEffect, useState } from 'react'
import LandingPage from '../landingPage/LandingPage'
import NewsSlider from '../../shared/components/news/NewsSlider'
import {
  getEverythingAxios,
  getSourcesAxios,
  getTrendingHeadlinesAxios,
} from '../../shared/apis/newsapiorg/http'
import { NewsAPIOrgResponse, Section } from '../../shared/constants/types'
import {
  getAllTheGuardianAxios,
  getTheGuardianSingleItem,
} from '../../shared/apis/newsapiorg/theguardian/http'
import { mapTheGuardianNewsToNews } from '../../shared/constants/util'

const SECTIONS: Section[] = [
  {
    label: 'Trending',
    code: 'trending',
  },
  {
    label: 'The Guardian',
    code: 'theguardian',
  },
]

const NUMBER_OF_ARTICLES = 10
const SORT_BY = 'popularity'

const Homepage = () => {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0)

  // news fetching
  const [isLoadingSources, setIsLoadingSources] = useState<boolean>(true)
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(true)
  const [sources, setSources] = useState<string[]>([])
  const [news, setNews] = useState<NewsAPIOrgResponse>(null)

  const getTrendingNews = () => {
    getEverythingAxios(sources, NUMBER_OF_ARTICLES, SORT_BY)
      .then((res: any) => {
        console.log(res.data)
        setNews(res.data)
      })
      .catch(() => {
        setNews(null)
      })
      .finally(() => {
        setIsLoadingNews(false)
      })
  }

  const getTheGuardianNews = () => {
    getAllTheGuardianAxios(NUMBER_OF_ARTICLES)
      .then((res: any) => {
        setNews(mapTheGuardianNewsToNews(res.data.response))
      })
      .catch(() => {
        setNews(null)
      })
      .finally(() => {
        setIsLoadingNews(false)
      })
  }

  const getNews = () => {
    setIsLoadingNews(true)

    const newsCode = SECTIONS[selectedSectionIndex].code
    switch (newsCode) {
      case 'trending':
        getTrendingNews()
        break
      case 'theguardian':
        getTheGuardianNews()
        break
      default:
        alert('Unknown type of news!')
    }
  }

  const getSources = () => {
    setIsLoadingSources(true)

    getSourcesAxios()
      .then((res: any) => {
        setSources(res.data.sources?.map((source: any) => source.id))
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadingSources(false)
      })
  }

  useEffect(() => {
    getSources()
  }, [])

  useEffect(() => {
    if (sources.length > 0) getNews()
  }, [selectedSectionIndex, sources])

  return (
    <HomepageWrapper>
      <HomepageHeader>
        {SECTIONS.map((section: Section, sectionIndex: number) => {
          return (
            <HomepageHeaderButton
              key={sectionIndex}
              isSelected={sectionIndex === selectedSectionIndex}
              onClick={() => setSelectedSectionIndex(sectionIndex)}
            >
              {section.label}
            </HomepageHeaderButton>
          )
        })}
      </HomepageHeader>
      <NewsSlider isLoading={isLoadingNews} news={news} />
    </HomepageWrapper>
  )
}

export default Homepage
