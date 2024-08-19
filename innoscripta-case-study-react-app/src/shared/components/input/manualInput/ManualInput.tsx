import { InputDiv, InputStyled, InputWrapper } from './ManualInput.styled'
import { memo, ReactNode } from 'react'

type ManualInputProps = {
  type: string
  onChange?: (value: any) => void
  isDisabled?: boolean
  defaultValue?: string | number | readonly string[]
  onEnter?: () => void
  onFocus?: () => void
  placeholder?: string
  fontSize?: string
}

const ManualInput = ({
  type,
  onChange,
  isDisabled,
  defaultValue,
  onEnter,
  onFocus,
  placeholder,
  fontSize,
}: ManualInputProps) => {
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !!onEnter) onEnter()
  }

  return (
    <InputWrapper>
      <InputDiv isDisabled={isDisabled}>
        <InputStyled
          disabled={isDisabled}
          type={type}
          value={defaultValue}
          onChange={(e: any) => onChange(e.currentTarget.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          fontSize={fontSize}
          onKeyDown={handleKeyDown}
        />
      </InputDiv>
    </InputWrapper>
  )
}

export default memo(ManualInput)
