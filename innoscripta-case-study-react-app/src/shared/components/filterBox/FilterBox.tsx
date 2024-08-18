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
import MultiSelectMultiple from '../input/multiSelect/MultiSelectMultiple'

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

const CATEGORY_OPTIONS: SelectOption<string>[] = [
  {
    label: 'Sports',
    code: 'sports',
    selectIndex: 0,
  },
  {
    label: 'Other',
    code: 'other',
    selectIndex: 1,
  },
  {
    label: 'Other2',
    code: 'other2',
    selectIndex: 2,
  },
  {
    label: 'Other3',
    code: 'other3',
    selectIndex: 3,
  },
]

const FilterBox = ({ isVisible }: FilterBoxProps) => {
  const [selectedSortByOptionIndex, setSelectedSortByOptionIndex] =
    useState<number>(0)

  const [selectedCategoriesIndices, setSelectedCategoriesIndices] = useState<
    number[]
  >([])

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
      <FilterSectionVertical>
        <FilterSectionHeader>
          <BoldSpan>{eng.components.filter_box.categories}</BoldSpan>
        </FilterSectionHeader>
        <FilterSectionVerticalOptions>
          <MultiSelectMultiple
            fieldIndex={0}
            fieldCodigo={''}
            options={CATEGORY_OPTIONS}
            onClick={(selectedOption: SelectOption<any>) => {
              const selIndex = selectedOption.selectIndex
              const indexOf = selectedCategoriesIndices.indexOf(selIndex)

              if (indexOf === -1) {
                // add
                setSelectedCategoriesIndices((prev) => [...prev, selIndex])
              } else {
                // remove
                setSelectedCategoriesIndices((prev) => [
                  ...prev.slice(0, indexOf),
                  ...prev.slice(indexOf + 1),
                ])
              }
            }}
            onRemove={(
              removeIndex: number,
              removedOption: SelectOption<any>
            ) => {
              setSelectedCategoriesIndices((prev) => [
                ...prev.slice(0, removeIndex),
                ...prev.slice(removeIndex + 1),
              ])
            }}
            selectedIndices={selectedCategoriesIndices}
            noneSelectedMessage={eng.components.filter_box.all_categories}
          />
        </FilterSectionVerticalOptions>
      </FilterSectionVertical>
    </FilterBoxWrapper>
  )
}

export default FilterBox
