import { Navigate, useNavigate } from 'react-router-dom'
import { isValidLocation } from '../../shared/constants/misc'
import { DefaultSpan } from '../../shared/styles/General.styled'
import { LANDING_PAGE_PATH } from '../../shared/constants/paths'
import { Section, TEST_NEWS } from '../../shared/constants/types'
import {
  HomepageHeader,
  HomepageHeaderButton,
  HomepageWrapper,
} from './Homepage.styled'
import { useEffect, useState } from 'react'
import LandingPage from '../landingPage/LandingPage'
import News from '../../shared/components/news/News'

const SECTIONS: Section[] = [
  {
    label: 'Trending',
    code: 'trending',
  },
  {
    label: 'BBC News',
    code: 'bbc',
  },
]

const Homepage = () => {
  // const splitPath: string[] = window.location.pathname.split('/')
  // const selectedLocation = splitPath[splitPath.length - 1]

  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0)

  // news fetching
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingNews(false)
    }, 1000)
  }, [])

  // if (!isValidLocation(selectedLocation))
  //   return <Navigate to={LANDING_PAGE_PATH} replace />

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
      <News isLoading={isLoadingNews} news={TEST_NEWS} />
    </HomepageWrapper>
  )
}

export default Homepage
