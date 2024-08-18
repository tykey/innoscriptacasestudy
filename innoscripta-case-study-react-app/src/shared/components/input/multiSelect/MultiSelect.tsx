import {
  ClosedView,
  CustomInput,
  CustomOption,
  MultiSelectWrapper,
  OpenViewDiv,
  ViewsDiv,
} from './MultiSelect.styled'
import { memo, ReactNode, useEffect, useRef, useState } from 'react'
import { SelectOption } from '../../../constants/types'
import ChevronSvg from '../../../assets/icons/chevron.svg'
import CheckmarkSvg from '../../../assets/icons/checkmark.svg'
import FilledLoader from '../../loaders/filledLoader/FilledLoader'
import eng from '../../../translations/eng'

type MultiSelectProps = {
  fieldIndex: number
  fieldCodigo: string
  options: SelectOption<any>[]
  isLoading?: boolean
  isDisabled?: boolean
  onChange: (
    selectedOption: SelectOption<any>,
    fieldIndex: number,
    fieldCodigo: string
  ) => void
  setShowTooltip?: (show: boolean) => void
  hasError?: boolean
  helpMessage?: string | ReactNode
  errorMessage?: string
  selectedIndex: number
  noGap?: boolean
  width?: string
  textAlign?: string
  noneSelectedMessage?: string
}
const MultiSelect = ({
  fieldIndex,
  fieldCodigo,
  options,
  isLoading,
  isDisabled,
  onChange,
  setShowTooltip = () => {},
  hasError,
  helpMessage,
  errorMessage,
  selectedIndex,
  noGap,
  width,
  textAlign,
  noneSelectedMessage,
}: MultiSelectProps) => {
  const ref = useRef<HTMLDivElement>()
  const [displayValue, setDisplayValue] = useState<string>('')
  const [preSelectedIndex, setPreSelectedIndex] = useState<number>(0)

  useEffect(() => {
    setDisplayValue(selectedIndex > -1 ? options[selectedIndex].label : '')
  }, [selectedIndex, options])

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

      setDisplayValue('')
      setPreSelectedIndex(selectedIndex)
    }
  }

  useEffect(() => {
    if (!(ref && ref.current)) return

    let element = ref.current

    if (displayValue !== '') {
      if (selectedIndex === -1) {
        // no option selected yet, just filter and scroll to beginning
        setPreSelectedIndex(-1)
        element.scrollTop = 0
      } else {
        // there is an option already selected, we must check if it is still
        // visible after filtering
        let filteredOptions = options.filter((option: SelectOption<any>) =>
          option.label.toLowerCase().includes(displayValue.toLowerCase())
        )
        const selectedOptionIndex = filteredOptions.findIndex(
          (option: SelectOption<any>) => option.selectIndex === selectedIndex
        )

        if (selectedOptionIndex > -1) {
          // selected option is still visible, keep it at top of filtered options
          setPreSelectedIndex(selectedOptionIndex)
          const childElem: HTMLElement = element.children.item(
            selectedOptionIndex
          ) as HTMLElement
          element.scrollTop = childElem.offsetTop ?? 0
        } else {
          // selected option has disappeared, scroll to top with nothing preselected
          setPreSelectedIndex(-1)
          element.scrollTop = 0
        }
      }
    } else {
      // no filtering, showing all options
      setPreSelectedIndex(selectedIndex)
      if (selectedIndex > -1) {
        const childElem: HTMLElement = element.children.item(
          selectedIndex
        ) as HTMLElement
        element.scrollTop = childElem.offsetTop ?? 0
      } else {
        element.scrollTop = 0
      }
    }
  }, [displayValue])

  const showOptions = (element: any) => {
    const iconElement = element.previousElementSibling.children.item(
      1
    ) as HTMLElement

    // set correct height for options
    resizeOptions()
    element.style.visibility = 'visible'
    iconElement.style.transform = 'rotate(180deg)'

    setShowTooltip(false)
  }

  const hideOptions = (element: any) => {
    const iconElement = element.previousElementSibling.children.item(
      1
    ) as HTMLElement

    element.style.maxHeight = '0'
    element.style.visibility = 'hidden'
    iconElement.style.transform = 'rotate(0)'

    if (selectedIndex === -1) {
      setShowTooltip(true)
      setDisplayValue('')
    } else {
      setDisplayValue(options[selectedIndex].label)
    }
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

      setShowTooltip(true)
      if (selectedIndex === -1) {
        setDisplayValue('')
      } else {
        setDisplayValue(options[selectedIndex].label)
      }
    }
  }

  const onClickOption = (optionIndex: number) => {
    onChange(options[optionIndex], fieldIndex, fieldCodigo)

    if (ref && ref.current) {
      hideOptions(ref.current)
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

  const onChangeCustomInput = (e: any) => {
    setDisplayValue(e.target.value)
  }

  const handleOnFocus = () => {
    if (!(ref && ref.current)) return

    const element = ref.current
    if (element.style.visibility === 'hidden') {
      showOptions(element)

      setDisplayValue('')
      setPreSelectedIndex(selectedIndex)
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
    if (displayValue !== '') {
      let filteredOptions = options.filter((option: SelectOption<any>) =>
        option.label.toLowerCase().includes(displayValue.toLowerCase())
      )
      if (
        filteredOptions.length > 0 &&
        preSelectedIndex > -1 &&
        preSelectedIndex < filteredOptions.length
      )
        onClickOption(filteredOptions[preSelectedIndex].selectIndex)
    } else if (preSelectedIndex > -1) {
      onClickOption(preSelectedIndex)
    }
  }

  const handleArrowDown = () => {
    setPreSelectedIndex((prev) => Math.min(prev + 1, showCount - 1))
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
  }, [selectedIndex])

  let showCount = 0

  return (
    <MultiSelectWrapper noGap={noGap} width={width}>
      <ViewsDiv>
        <ClosedView
          isDisabled={isDisabled}
          hasValue={displayValue !== ''}
          hasError={hasError}
          onClick={(e: any) => {
            if (!isDisabled) onClickClosed(e)
          }}
        >
          <CustomInput
            type="text"
            value={displayValue}
            disabled={isDisabled}
            onChange={onChangeCustomInput}
            onKeyDown={handleKeyDown}
            onFocus={handleOnFocus}
            data-testid={'multiSelectInput'}
            textAlign={textAlign}
            placeholder={
              selectedIndex === -1 && noneSelectedMessage
                ? noneSelectedMessage
                : undefined
            }
          />
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
                isLast
              >
                <FilledLoader height="1.5em" width="1.5em" borderSize="4px" />
              </CustomOption>
            ) : (
              <>
                {options.map((option: SelectOption<any>, index: number) => {
                  if (
                    option.label
                      .toLowerCase()
                      .includes(displayValue.toLowerCase())
                  ) {
                    showCount = showCount + 1
                    return (
                      <CustomOption
                        key={`${option.code}`}
                        onClick={() => onClickOption(index)}
                        isselected={index === selectedIndex}
                        isPreSelected={showCount - 1 === preSelectedIndex}
                        data-testid={'customOption'}
                        isLast={index === options.length - 1}
                      >
                        <CheckmarkSvg />
                        <span>{option.label}</span>
                      </CustomOption>
                    )
                  } else if (index === options.length - 1 && showCount === 0) {
                    return (
                      <CustomOption
                        key={-1}
                        onClick={() => {}}
                        isDisabled
                        isLast
                      >
                        <span>{eng.components.multi_select.no_results}</span>
                      </CustomOption>
                    )
                  }
                  return false
                }, showCount)}
              </>
            )}
          </OpenViewDiv>
        )}
      </ViewsDiv>
    </MultiSelectWrapper>
  )
}

export default memo(MultiSelect)
