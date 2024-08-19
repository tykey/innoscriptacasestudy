import {
  ClosedView,
  CustomOption,
  HiddenInput,
  MultipleOption,
  MultipleOptionsWrapper,
  MultiSelectWrapper,
  OpenViewDiv,
  RemoveIconDiv,
  ViewsDiv,
} from './MultiSelect.styled'
import { memo, useEffect, useRef, useState } from 'react'
import { SelectOption } from '../../../constants/types'
import FilledLoader from '../../loaders/filledLoader/FilledLoader'
import ChevronSvg from '../../../assets/icons/chevron.svg'
import CheckmarkSvg from '../../../assets/icons/checkmark.svg'
import CloseIcon from '../../../assets/icons/close.svg'
import AddIcon from '../../../assets/icons/add.svg'
import eng from '../../../translations/eng'
import { DefaultSpan } from '../../../styles/General.styled'

type MultiSelectMultipleProps = {
  fieldIndex: number
  fieldCodigo: string
  options: SelectOption<any>[]
  isLoading?: boolean
  isDisabled?: boolean
  onClick: (
    selectedOption: SelectOption<any>,
    fieldIndex: number,
    fieldCodigo: string
  ) => void
  onRemove: (removeIndex: number, removedOption: SelectOption<any>) => void
  hasError?: boolean
  helpMessage?: string
  errorMessage?: string
  selectedIndices: number[]
  noneSelectedMessage?: string
  addOption?: () => void
}
const MultiSelectMultiple = ({
  fieldIndex,
  fieldCodigo,
  options,
  isLoading,
  isDisabled,
  onClick,
  onRemove,
  hasError,
  helpMessage,
  errorMessage,
  selectedIndices,
  noneSelectedMessage,
  addOption,
}: MultiSelectMultipleProps) => {
  const ref = useRef<HTMLDivElement>()
  const [preSelectedIndex, setPreSelectedIndex] = useState<number>(0)

  const onClickClosed = (e: any) => {
    if (!(ref && ref.current)) return

    let element = ref.current
    const target = e.target
    const isInput = target.tagName.toLowerCase() === 'input'

    // hide or show
    const currentValue = element.style.visibility
    // is visible -> hide
    if (currentValue === 'visible' && !isInput) {
      hideOptions(element)
    }
    // not visible -> show
    else {
      showOptions(element)
      if (!isInput) {
        e.currentTarget.children.item(0).focus()
      }

      setPreSelectedIndex(0)
    }
  }

  const resizeOptions = () => {
    if (!(ref && ref.current)) return

    // options div
    let element = ref.current
    // column element, if structure changes this will change (sorry :))
    const columnElement =
      element.parentElement.parentElement.parentElement.parentElement
    const padding = 10
    const optionHeight = element.parentElement.offsetHeight
    let maxHeight: number

    const yBotColumn = columnElement.getBoundingClientRect().bottom
    const yTopElement = element.getBoundingClientRect().top
    const columnHeight = columnElement.offsetHeight
    maxHeight = yTopElement - columnHeight

    element.style.maxHeight = `${275}px`
  }

  const showOptions = (element: any) => {
    const iconElement = element.previousElementSibling.children.item(
      2
    ) as HTMLElement

    // set correct height for options
    resizeOptions()
    element.style.visibility = 'visible'
    iconElement.style.transform = 'rotate(180deg)'
  }

  const hideOptions = (element: any) => {
    const iconElement = element.previousElementSibling.children.item(
      2
    ) as HTMLElement

    element.style.maxHeight = '0'
    element.style.visibility = 'hidden'
    iconElement.style.transform = 'rotate(0)'
  }

  const handleClick = (e: any) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      !ref.current.parentElement.contains(e.target)
    ) {
      ref.current.style.maxHeight = '0'
      ref.current.style.visibility = 'hidden'
      let icon = ref.current.previousElementSibling.children.item(
        1
      ) as HTMLElement
      icon.style.transform = 'rotate(0)'
    }
  }

  const onClickOption = (optionIndex: number) => {
    onClick(options[optionIndex], fieldIndex, fieldCodigo)

    if (ref && ref.current) {
      hideOptions(ref.current)
    }
  }

  const handleOnFocus = () => {
    if (!(ref && ref.current)) return

    const element = ref.current
    if (element.style.visibility === 'hidden') {
      showOptions(element)

      setPreSelectedIndex(0)
    }
  }

  const handleKeyDown = (e: any) => {
    const key = e.key
    switch (key) {
      case 'ArrowDown':
        e.preventDefault()
        handleArrowDown()
        break
      case 'ArrowUp':
        e.preventDefault()
        handleArrowUp()
        break
      case 'Tab':
        handleOnTab()
        break
      case 'Enter':
        e.preventDefault()
        handleOnEnter()
        break
      default:
        return
    }
  }

  const handleOnTab = () => {
    if (!(ref && ref.current)) return

    const element = ref.current
    if (element.style.visibility === 'visible') hideOptions(element)
  }

  const handleOnEnter = () => {
    if (preSelectedIndex > -1) {
      onClickOption(preSelectedIndex)
    }
  }

  const handleArrowDown = () => {
    setPreSelectedIndex((prev) => Math.min(prev + 1, options.length - 1))
  }

  const handleArrowUp = () => {
    setPreSelectedIndex((prev) => Math.max(prev - 1, 0))
  }

  useEffect(() => {
    if (!(ref && ref.current) || preSelectedIndex < 1) return

    let element = ref.current
    const childElem: HTMLElement = element.children.item(
      preSelectedIndex
    ) as HTMLElement

    if (!childElem) return

    const optionHeight = element.parentElement.offsetHeight
    const yBot = childElem.offsetTop + optionHeight
    const yTop = childElem.offsetTop

    if (yBot >= element.offsetHeight + element.scrollTop)
      element.scrollTop = element.scrollTop + optionHeight
    else if (yTop <= element.scrollTop)
      element.scrollTop = element.scrollTop - optionHeight
  }, [preSelectedIndex])

  useEffect(() => {
    // add close select options click listener
    document.addEventListener('click', handleClick, true)
    // add resize listener for select options height
    window.addEventListener('resize', resizeOptions)

    return () => {
      document.removeEventListener('click', handleClick, true)
      window.removeEventListener('resize', resizeOptions)
    }
  }, [])

  return (
    <MultiSelectWrapper>
      <ViewsDiv>
        <ClosedView
          isDisabled={isDisabled}
          hasError={hasError}
          onClick={(e: any) => {
            if (!isDisabled) onClickClosed(e)
          }}
        >
          <HiddenInput onKeyDown={handleKeyDown} onFocus={handleOnFocus} />
          <MultipleOptionsWrapper>
            {selectedIndices.map((index: number, removeIndex: number) => {
              if (options[index])
                return (
                  <MultipleOption key={index}>
                    <span>{options[index].label}</span>
                    <RemoveIconDiv
                      onClick={(e: any) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onRemove(removeIndex, options[index])
                      }}
                    >
                      <CloseIcon />
                    </RemoveIconDiv>
                  </MultipleOption>
                )
            })}
            {selectedIndices.length === 0 && noneSelectedMessage && (
              <DefaultSpan>{noneSelectedMessage}</DefaultSpan>
            )}
          </MultipleOptionsWrapper>
          <ChevronSvg />
        </ClosedView>
        {!isDisabled && (
          <OpenViewDiv
            style={{ visibility: 'hidden', maxHeight: '0' }}
            ref={ref}
            onMouseEnter={() => setPreSelectedIndex(-1)}
            data-testid={'optionsDiv'}
          >
            {isLoading ? (
              <CustomOption
                onClick={() => {}}
                isDisabled
                data-testid={'customOptionLoading'}
              >
                <FilledLoader height="1.5em" width="1.5em" borderSize="4px" />
              </CustomOption>
            ) : (
              <>
                {options.map((option: SelectOption<any>, index: number) => {
                  return (
                    <CustomOption
                      key={`${option.code}`}
                      onClick={() => onClickOption(index)}
                      isselected={selectedIndices.includes(index)}
                      isPreSelected={index === preSelectedIndex}
                      data-testid={'customOption'}
                    >
                      <CheckmarkSvg />
                      <span>{option.label}</span>
                    </CustomOption>
                  )
                })}
                {addOption && (
                  <CustomOption visibleIcon={true} onClick={addOption}>
                    <AddIcon />
                    <span>
                      {eng.components.multi_select_multiple.add_option}
                    </span>
                  </CustomOption>
                )}
              </>
            )}
          </OpenViewDiv>
        )}
      </ViewsDiv>
    </MultiSelectWrapper>
  )
}

export default memo(MultiSelectMultiple)
