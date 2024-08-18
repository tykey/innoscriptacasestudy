import { useState } from 'react'
import {
  Section,
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
  selectedSection: Section
  isLoadingCategories: boolean
  categories: TheGuardianCategory[]
  onClickApply: (
    sortBy?: string,
    sources?: SourceNewsAPIOrg[],
    category?: TheGuardianCategory
  ) => void
}

const SORT_BY_OPTIONS: SelectOption<string>[] = [
  {
    label: 'Popularity',
    code: 'popularity',
    selectIndex: 0,
  },
  {
    label: 'Most recent',
    code: 'publishedAt',
    selectIndex: 1,
  },
]

const FilterBox = ({
  isVisible,
  sources,
  selectedSection,
  isLoadingCategories,
  categories,
  onClickApply,
}: FilterBoxProps) => {
  const [selectedSortByOptionIndex, setSelectedSortByOptionIndex] =
    useState<number>(0)

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(-1)

  const [selectedSourcesIndices, setSelectedSourcesIndices] = useState<
    number[]
  >([])

  const onClickApplyFilter = () => {
    let filteredSortBy: string = undefined
    if (selectedSortByOptionIndex > -1)
      filteredSortBy = SORT_BY_OPTIONS[selectedSortByOptionIndex].code

    let filteredSources: SourceNewsAPIOrg[] = null
    if (selectedSourcesIndices.length > 0) {
      filteredSources = []
      selectedSourcesIndices.forEach((sourceIndex: number) => {
        filteredSources.push(sources[sourceIndex])
      })
    }

    let category: TheGuardianCategory = undefined
    if (selectedCategoryIndex > -1) category = categories[selectedCategoryIndex]

    onClickApply(filteredSortBy, filteredSources, category)
  }

  return (
    <FilterBoxWrapper isVisible={isVisible}>
      <FilterHeader>
        <BoldSpan fontSize="1.1em">{eng.components.filter_box.header}</BoldSpan>
      </FilterHeader>
      <FilterSectionsWrapper>
        {selectedSection.allowsSortBy && (
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
        )}
        {selectedSection.allowsSources && (
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
        {selectedSection.allowsCategories && (
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
        {!selectedSection.allowsSources &&
          !selectedSection.allowsSortBy &&
          !selectedSection.allowsCategories && (
            <FilterSectionVertical>
              <DefaultSpan style={{ lineHeight: 1.6 }}>
                {eng.components.filter_box.no_filters}
              </DefaultSpan>
            </FilterSectionVertical>
          )}
      </FilterSectionsWrapper>
      <FilterApplyDiv>
        <DefaultButton
          text={eng.components.filter_box.apply}
          onClick={onClickApplyFilter}
          isDisabled={
            !selectedSection.allowsSources &&
            !selectedSection.allowsSortBy &&
            !selectedSection.allowsCategories
          }
        />
      </FilterApplyDiv>
    </FilterBoxWrapper>
  )
}

export default FilterBox
