import { useContext, useEffect, useState } from 'react'
import {
  Filters,
  Section,
  SelectOption,
  SourceNewsAPIOrg,
  TheGuardianCategory,
} from '../../constants/types'
import {
  BoldSpan,
  ClickableSpanWrapper,
  DefaultSpan,
} from '../../styles/General.styled'
import eng from '../../translations/eng'
import MultiSelect from '../input/multiSelect/MultiSelect'
import {
  FilterFooterDiv,
  FilterBoxWrapper,
  FilterHeader,
  FilterSectionHeader,
  FilterSectionsWrapper,
  FilterSectionVertical,
  FilterSectionVerticalOptions,
} from './FilterBox.styled'
import MultiSelectMultiple from '../input/multiSelect/MultiSelectMultiple'
import DefaultButton from '../buttons/defaultButton/DefaultButton'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../store/store'
import { changeUserFilters } from '../../slices/usersSlice'
import { ToastContext, ToastType } from '../toast/Toast'

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
  const dispatch = useDispatch()

  const toastRef = useContext(ToastContext)

  const currentUserIndex = useSelector(
    (state: IRootState) => state.sessionSlice.value
  )
  const users = useSelector((state: IRootState) => state.usersSlice.value)

  const [selectedSortByOptionIndex, setSelectedSortByOptionIndex] =
    useState<number>(-1)

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(-1)

  const [selectedSourcesIndices, setSelectedSourcesIndices] = useState<
    number[]
  >([])

  const generateFilter = (): Filters => {
    let filteredSortBy: string = undefined
    if (selectedSortByOptionIndex > -1)
      filteredSortBy = SORT_BY_OPTIONS[selectedSortByOptionIndex].code

    let filteredSources: SourceNewsAPIOrg[] = null
    if (selectedSourcesIndices.length > 0) {
      filteredSources = []
      selectedSourcesIndices.forEach((sourceIndex: number) => {
        if (sources[sourceIndex]) filteredSources.push(sources[sourceIndex])
      })
    }

    let category: TheGuardianCategory = undefined
    if (selectedCategoryIndex > -1) category = categories[selectedCategoryIndex]

    const filter: Filters = {
      sortBy: filteredSortBy,
      sources: filteredSources,
      category: category,
    }

    return filter
  }

  const onClickApplyFilter = () => {
    const filter: Filters = generateFilter()

    onClickApply(filter.sortBy, filter.sources, filter.category)
  }

  const onSavePreferences = () => {
    const filter: Filters = generateFilter()

    dispatch(
      changeUserFilters({
        user: users[currentUserIndex],
        sortBy: filter.sortBy,
        sources: filter.sources.length > 0 ? filter.sources : undefined,
        category: filter.category,
      })
    )

    toastRef?.show(ToastType.Success, eng.components.filter_box.save_success, 4)
  }

  // set user preferences
  useEffect(() => {
    console.log('sources', sources)

    setSelectedSortByOptionIndex(
      currentUserIndex === -1 ||
        !users[currentUserIndex].filterPreferences.sortBy
        ? 0
        : SORT_BY_OPTIONS.findIndex(
            (sortByOption: SelectOption<any>) =>
              sortByOption.code ===
              users[currentUserIndex].filterPreferences.sortBy
          )
    )

    setSelectedSourcesIndices(
      currentUserIndex === -1 ||
        !users[currentUserIndex].filterPreferences.sources
        ? []
        : users[currentUserIndex].filterPreferences.sources.map(
            (source: SourceNewsAPIOrg) =>
              sources.findIndex(
                (sourceSource: SourceNewsAPIOrg) =>
                  source.id === sourceSource.id
              )
          )
    )

    setSelectedCategoryIndex(
      currentUserIndex === -1 ||
        !users[currentUserIndex].filterPreferences.category
        ? -1
        : categories.findIndex(
            (category: TheGuardianCategory) =>
              category.id ===
              users[currentUserIndex].filterPreferences.category.id
          )
    )
  }, [sources, categories])

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
                isLoading={isLoadingCategories}
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
      <FilterFooterDiv>
        <ClickableSpanWrapper
          isHidden={currentUserIndex === -1}
          onClick={onSavePreferences}
          isDisabled={
            !selectedSection.allowsSources &&
            !selectedSection.allowsSortBy &&
            !selectedSection.allowsCategories
          }
        >
          <BoldSpan fontSize="0.9em">{eng.components.filter_box.save}</BoldSpan>
        </ClickableSpanWrapper>
        <DefaultButton
          text={eng.components.filter_box.apply}
          onClick={onClickApplyFilter}
          isDisabled={
            !selectedSection.allowsSources &&
            !selectedSection.allowsSortBy &&
            !selectedSection.allowsCategories
          }
        />
      </FilterFooterDiv>
    </FilterBoxWrapper>
  )
}

export default FilterBox
