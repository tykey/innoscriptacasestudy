import { useState } from 'react'
import {
  SelectOption,
  SourceNewsAPIOrg,
  TheGuardianCategory,
} from '../../constants/types'
import { BoldSpan, DefaultSpan } from '../../styles/General.styled'
import eng from '../../translations/eng'
import MultiSelect from '../input/multiSelect/MultiSelect'
import {
  FilterApplyDiv,
  FilterBoxWrapper,
  FilterHeader,
  FilterSectionHeader,
  FilterSectionsWrapper,
  FilterSectionVertical,
  FilterSectionVerticalOptions,
} from './FilterBox.styled'
import MultiSelectMultiple from '../input/multiSelect/MultiSelectMultiple'
import DefaultButton from '../buttons/defaultButton/DefaultButton'

type FilterBoxProps = {
  isVisible: boolean
  sources: SourceNewsAPIOrg[]
  allowsCategories: boolean
  isLoadingCategories: boolean
  categories: TheGuardianCategory[]
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
]

const FilterBox = ({
  isVisible,
  sources,
  allowsCategories,
  isLoadingCategories,
  categories,
}: FilterBoxProps) => {
  const [selectedSortByOptionIndex, setSelectedSortByOptionIndex] =
    useState<number>(0)

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(-1)

  const [selectedSourcesIndices, setSelectedSourcesIndices] = useState<
    number[]
  >([])

  const onClickApply = () => {
    alert('apply')
  }

  return (
    <FilterBoxWrapper isVisible={isVisible}>
      <FilterHeader>
        <BoldSpan fontSize="1.1em">{eng.components.filter_box.header}</BoldSpan>
      </FilterHeader>
      <FilterSectionsWrapper>
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
        {sources.length > 0 && (
          <FilterSectionVertical>
            <FilterSectionHeader>
              <BoldSpan>{eng.components.filter_box.sources}</BoldSpan>
            </FilterSectionHeader>
            <FilterSectionVerticalOptions>
              <MultiSelectMultiple
                fieldIndex={0}
                fieldCodigo={''}
                options={sources.map(
                  (source: SourceNewsAPIOrg, sourceIndex: number) => {
                    const mappedSource: SelectOption<any> = {
                      label: source.name,
                      code: source.id,
                      selectIndex: sourceIndex,
                    }

                    return mappedSource
                  }
                )}
                onClick={(selectedOption: SelectOption<any>) => {
                  const selIndex = selectedOption.selectIndex
                  const indexOf = selectedSourcesIndices.indexOf(selIndex)

                  if (indexOf === -1) {
                    // add
                    setSelectedSourcesIndices((prev) => [...prev, selIndex])
                  } else {
                    // remove
                    setSelectedSourcesIndices((prev) => [
                      ...prev.slice(0, indexOf),
                      ...prev.slice(indexOf + 1),
                    ])
                  }
                }}
                onRemove={(removeIndex: number) => {
                  setSelectedSourcesIndices((prev) => [
                    ...prev.slice(0, removeIndex),
                    ...prev.slice(removeIndex + 1),
                  ])
                }}
                selectedIndices={selectedSourcesIndices}
                noneSelectedMessage={eng.components.filter_box.all_sources}
              />
            </FilterSectionVerticalOptions>
          </FilterSectionVertical>
        )}
        {allowsCategories && (
          <FilterSectionVertical>
            <FilterSectionHeader>
              <BoldSpan>{eng.components.filter_box.category}</BoldSpan>
            </FilterSectionHeader>
            <FilterSectionVerticalOptions>
              <MultiSelect
                fieldIndex={0}
                fieldCodigo={''}
                options={categories.map(
                  (category: TheGuardianCategory, categoryIndex: number) => {
                    const mappedCategory: SelectOption<any> = {
                      label: category.webTitle,
                      code: category.apiUrl,
                      selectIndex: categoryIndex,
                    }

                    return mappedCategory
                  }
                )}
                onChange={(selectedOption: SelectOption<any>) => {
                  setSelectedCategoryIndex(selectedOption.selectIndex)
                }}
                selectedIndex={selectedCategoryIndex}
                noneSelectedMessage={eng.components.filter_box.all_categories}
              />
            </FilterSectionVerticalOptions>
          </FilterSectionVertical>
        )}
      </FilterSectionsWrapper>
      <FilterApplyDiv>
        <DefaultButton
          text={eng.components.filter_box.apply}
          onClick={onClickApply}
        />
      </FilterApplyDiv>
    </FilterBoxWrapper>
  )
}

export default FilterBox
