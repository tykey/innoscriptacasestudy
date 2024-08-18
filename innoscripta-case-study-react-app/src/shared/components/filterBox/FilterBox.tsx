import { useState } from 'react'
import { SelectOption } from '../../constants/types'
import { BoldSpan, DefaultSpan } from '../../styles/General.styled'
import eng from '../../translations/eng'
import MultiSelect from '../input/multiSelect/MultiSelect'
import {
  FilterBoxWrapper,
  FilterHeader,
  FilterSectionHeader,
  FilterSectionVertical,
  FilterSectionVerticalOptions,
} from './FilterBox.styled'

type FilterBoxProps = {
  isVisible: boolean
}

const SORT_BY_OPTIONS: SelectOption<string>[] = [
  {
    label: 'Popularity',
    code: 'popularity',
    selectIndex: 0,
  },
  {
    label: 'Most recent',
    code: 'recent',
    selectIndex: 1,
  },
  {
    label: 'Oldest',
    code: 'oldest',
    selectIndex: 2,
  },
]

const FilterBox = ({ isVisible }: FilterBoxProps) => {
  const [selectedSortByOptionIndex, setSelectedSortByOptionIndex] =
    useState<number>(0)

  return (
    <FilterBoxWrapper isVisible={isVisible}>
      <FilterHeader>
        <BoldSpan fontSize="1.1em">{eng.components.filter_box.header}</BoldSpan>
      </FilterHeader>
      <FilterSectionVertical>
        <FilterSectionHeader>
          <BoldSpan>{eng.components.filter_box.sort_by}</BoldSpan>
        </FilterSectionHeader>
        <FilterSectionVerticalOptions>
          <MultiSelect
            fieldIndex={0}
            fieldCodigo={''}
            options={SORT_BY_OPTIONS}
            onChange={(selectedOption: SelectOption<any>) => {
              setSelectedSortByOptionIndex(selectedOption.selectIndex)
            }}
            selectedIndex={selectedSortByOptionIndex}
          />
        </FilterSectionVerticalOptions>
      </FilterSectionVertical>
    </FilterBoxWrapper>
  )
}

export default FilterBox
