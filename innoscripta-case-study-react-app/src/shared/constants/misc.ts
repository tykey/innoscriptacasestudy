import { UK_PATH, DE_PATH } from './paths'
import { Country } from './types'
import UKSvg from '../assets/flags/uk.svg'
import GermanySvg from '../assets/flags/de.svg'

export const COUNTRIES: Country[] = [
  {
    icon: UKSvg,
    endpoint: UK_PATH,
  },
  {
    icon: GermanySvg,
    endpoint: DE_PATH,
  },
]

export const isValidLocation = (endpoint: string) =>
  COUNTRIES.findIndex((country: Country) => country.endpoint === endpoint) > -1
