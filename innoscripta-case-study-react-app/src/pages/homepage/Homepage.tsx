import { Navigate, useNavigate } from 'react-router-dom'
import { isValidLocation } from '../../shared/constants/misc'
import { DefaultSpan } from '../../shared/styles/General.styled'
import { LANDING_PAGE_PATH } from '../../shared/constants/paths'
import {
  FilterIconWrapper,
  HiddenWrapper,
  HomepageHeader,
  HomepageHeaderButton,
  HomepageSectionsDiv,
  HomepageWrapper,
  SearchIconWrapper,
  SearchWrapper,
} from './Homepage.styled'
import { useEffect, useRef, useState } from 'react'
import LandingPage from '../landingPage/LandingPage'
import NewsSlider from '../../shared/components/news/NewsSlider'
import {
  getEverythingAxios,
  getSourcesAxios,
  getTrendingHeadlinesAxios,
} from '../../shared/apis/newsapiorg/http'
import {
  NewsAPIOrgFilter,
  NewsAPIOrgResponse,
  Section,
  SourceNewsAPIOrg,
  TheGuardianCategory,
} from '../../shared/constants/types'
import {
  getAllTheGuardianAxios,
  getTheGuardianSectionsAxios,
  getTheGuardianSingleItem,
} from '../../shared/apis/theguardian/http'
import {
  mapNYTimesNewsToNews,
  mapTheGuardianNewsToNews,
} from '../../shared/constants/util'
import { getMostViewedNYTimesAxios } from '../../shared/apis/nytimes/http'
import ManualInput from '../../shared/components/input/manualInput/ManualInput'
import SearchIcon from '../../shared/assets/icons/search.svg'
import FilterIcon from '../../shared/assets/icons/filter.svg'
import FilterBox from '../../shared/components/filterBox/FilterBox'
import eng from '../../shared/translations/eng'

const SECTIONS: Section[] = [
  {
    label: 'Trending',
    code: 'trending',
    allowsCategories: false,
  },
  {
    label: 'The Guardian',
    code: 'theguardian',
    allowsCategories: true,
  },
  {
    label: 'The New York Times',
    code: 'nytimes',
    allowsCategories: false,
  },
]

const NUMBER_OF_ARTICLES = 10
const SORT_BY = 'popularity'
const NY_TIMES_PERIOD = 7
const EMPTY_NEWS: NewsAPIOrgResponse = {
  totalResults: 0,
  articles: [],
  status: 'err',
}

const INITIAL_NEWS_API_ORG_FILTERS: NewsAPIOrgFilter = {
  sortBy: 'publishedAt',
  sources: null,
}

const Homepage = () => {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0)

  // news fetching
  const [isLoadingSources, setIsLoadingSources] = useState<boolean>(true)
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(true)
  const [sources, setSources] = useState<SourceNewsAPIOrg[]>([])
  const [news, setNews] = useState<NewsAPIOrgResponse>(null)

  // the guardian
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false)
  const [theGuardianCategories, setTheGuardianCategories] = useState<
    TheGuardianCategory[]
  >([])

  // search
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const inputRef = useRef(null)

  // filters
  const [filters, setFilters] = useState<NewsAPIOrgFilter>(
    INITIAL_NEWS_API_ORG_FILTERS
  )

  // filter box
  const [showFilterBox, setShowFilterBox] = useState<boolean>(false)

  const getTrendingNews = () => {
    getEverythingAxios(filters.sources ?? sources, NUMBER_OF_ARTICLES, SORT_BY)
      .then((res: any) => {
        console.log(res.data)
        setNews(res.data)
      })
      .catch(() => {
        setNews(EMPTY_NEWS)
      })
      .finally(() => {
        setIsLoadingNews(false)
      })
  }

  const getTheGuardianCategories = () => {
    setIsLoadingCategories(true)

    getTheGuardianSectionsAxios()
      .then((res: any) => {
        setTheGuardianCategories(res.data.response.results)
      })
      .catch(() => {
        setTheGuardianCategories([])
      })
      .finally(() => {
        setIsLoadingCategories(false)
      })
  }

  const getTheGuardianNews = () => {
    getAllTheGuardianAxios(NUMBER_OF_ARTICLES)
      .then((res: any) => {
        setNews(mapTheGuardianNewsToNews(res.data.response))
      })
      .catch(() => {
        setNews(EMPTY_NEWS)
      })
      .finally(() => {
        setIsLoadingNews(false)
      })
  }

  const getNYTimesNews = () => {
    getMostViewedNYTimesAxios(NY_TIMES_PERIOD)
      .then((res: any) => {
        setNews(mapNYTimesNewsToNews(NUMBER_OF_ARTICLES, res.data))
      })
      .catch(() => {
        setNews(EMPTY_NEWS)
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
        getTheGuardianCategories()
        getTheGuardianNews()
        break
      case 'nytimes':
        getNYTimesNews()
        break
      default:
        alert('Unknown type of news!')
    }
  }

  const onClickApplyFilters = (
    sortBy?: string,
    sources?: SourceNewsAPIOrg[]
  ) => {
    if (SECTIONS[selectedSectionIndex].code === 'trending') {
      const newFilters: NewsAPIOrgFilter = {
        sortBy: sortBy,
        sources: sources,
      }

      setFilters(newFilters)
    }

    setShowFilterBox(false)
  }

  const getSources = () => {
    setIsLoadingSources(true)

    getSourcesAxios()
      .then((res: any) => {
        setSources(res.data.sources)
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadingSources(false)
      })
  }

  const onClickSearch = () => {
    setShowSearch((prev) => !prev)
  }

  const onClickFilter = () => {
    setShowFilterBox((prev) => !prev)
  }

  useEffect(() => {
    getSources()
  }, [])

  useEffect(() => {
    if (sources.length > 0) getNews()
  }, [selectedSectionIndex, sources, filters])

  // focus search
  useEffect(() => {
    if (showSearch && inputRef && inputRef.current) {
      const inputElem = inputRef.current.getElementsByTagName('input')[0]

      inputElem.focus()
    } else if (!showSearch) setSearchInput('')
  }, [showSearch])

  return (
    <HomepageWrapper>
      <HomepageHeader>
        <HomepageSectionsDiv>
          {SECTIONS.map((section: Section, sectionIndex: number) => {
            return (
              <div key={sectionIndex}>
                <HomepageHeaderButton
                  key={sectionIndex}
                  isSelected={sectionIndex === selectedSectionIndex}
                  onClick={() => setSelectedSectionIndex(sectionIndex)}
                >
                  {section.label}
                </HomepageHeaderButton>
                {sectionIndex === 0 && (
                  <DefaultSpan style={{ marginLeft: '15px' }}>
                    {eng.pages.homepage.from_partners}
                  </DefaultSpan>
                )}
              </div>
            )
          })}
        </HomepageSectionsDiv>
        <SearchWrapper>
          <HiddenWrapper isHidden={!showSearch} ref={inputRef}>
            <ManualInput
              type="text"
              defaultValue={searchInput}
              isDisabled={!showSearch}
              onChange={(value: any) => setSearchInput(value)}
            />
          </HiddenWrapper>
          <SearchIconWrapper onClick={onClickSearch} isClicked={showSearch}>
            <SearchIcon />
          </SearchIconWrapper>
          <FilterIconWrapper onClick={onClickFilter}>
            <FilterIcon />
          </FilterIconWrapper>
        </SearchWrapper>
      </HomepageHeader>
      <NewsSlider
        isLoading={isLoadingNews}
        allowsCategories={SECTIONS[selectedSectionIndex].allowsCategories}
        isLoadingCategories={isLoadingCategories}
        categories={theGuardianCategories}
        sources={
          SECTIONS[selectedSectionIndex].code === 'trending' ? sources : []
        }
        news={news}
        showFilterBox={showFilterBox}
        onClickApplyFilters={onClickApplyFilters}
      />
    </HomepageWrapper>
  )
}

export default Homepage
