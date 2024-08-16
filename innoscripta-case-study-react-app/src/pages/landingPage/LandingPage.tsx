import { Country } from '../../shared/constants/types'
import { BoldSpan, DefaultSpan } from '../../shared/styles/General.styled'
import eng from '../../shared/translations/eng'
import { FlagsWrapper, LandingPageWrapper } from './LandingPage.styled'
import UKSvg from '../../shared/assets/flags/uk.svg'
import GermanySvg from '../../shared/assets/flags/de.svg'
import { DE_PATH, UK_PATH } from '../../shared/constants/paths'

const COUNTRIES: Country[] = [
  {
    icon: UKSvg,
    endpoint: UK_PATH,
  },
  {
    icon: GermanySvg,
    endpoint: DE_PATH,
  },
]

const LandingPage = () => {
  const onClickCountry = (clickedCountry: Country) => {
    alert(`clicked ${clickedCountry.endpoint}`)
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
