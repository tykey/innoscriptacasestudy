import { DefaultSpan } from '../../styles/General.styled'
import { FilterBoxWrapper } from './FilterBox.styled'

type FilterBoxProps = {
  isVisible: boolean
}

const FilterBox = ({ isVisible }: FilterBoxProps) => {
  return (
    <FilterBoxWrapper isVisible={isVisible}>
      <DefaultSpan>test</DefaultSpan>
    </FilterBoxWrapper>
  )
}

export default FilterBox
