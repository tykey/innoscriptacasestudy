import { COUNTRIES } from '../../shared/constants/misc'
import { HOME_PATH } from '../../shared/constants/paths'
import { Country } from '../../shared/constants/types'
import { BoldSpan, DefaultSpan } from '../../shared/styles/General.styled'
import eng from '../../shared/translations/eng'
import { FlagsWrapper, LandingPageWrapper } from './LandingPage.styled'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  const onClickCountry = (clickedCountry: Country) => {
    navigate(`${HOME_PATH}/${clickedCountry.endpoint}`, { replace: true })
  }

  return (
    <LandingPageWrapper>
      <BoldSpan fontSize="1.4em">{eng.pages.landing_page.welcome}</BoldSpan>
      <DefaultSpan>{eng.pages.landing_page.select_country}</DefaultSpan>
      <FlagsWrapper>
        {COUNTRIES.map((country: Country, countryIndex: number) => {
          const Icon = country.icon

          return (
            <Icon key={countryIndex} onClick={() => onClickCountry(country)} />
          )
        })}
      </FlagsWrapper>
    </LandingPageWrapper>
  )
}

export default LandingPage
