import { Navigate, useNavigate } from 'react-router-dom'
import { isValidLocation } from '../../shared/constants/misc'
import { DefaultSpan } from '../../shared/styles/General.styled'
import { LANDING_PAGE_PATH } from '../../shared/constants/paths'
import { Section } from '../../shared/constants/types'
import {
  HomepageHeader,
  HomepageHeaderButton,
  HomepageWrapper,
} from './Homepage.styled'
import { useState } from 'react'

const SECTIONS: Section[] = [
  {
    label: 'Trending',
    Component: <span>Trending</span>,
  },
  {
    label: 'BBC News',
    Component: <span>BBC News</span>,
  },
]

const Homepage = () => {
  const splitPath: string[] = window.location.pathname.split('/')
  const selectedLocation = splitPath[splitPath.length - 1]

  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0)

  if (!isValidLocation(selectedLocation))
    return <Navigate to={LANDING_PAGE_PATH} replace />

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
    </HomepageWrapper>
  )
}

export default Homepage
