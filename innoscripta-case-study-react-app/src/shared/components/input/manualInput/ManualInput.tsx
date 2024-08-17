import { InputDiv, InputStyled, InputWrapper } from './ManualInput.styled'
import { memo, ReactNode } from 'react'

type ManualInputProps = {
  type: string
  onChange?: (value: any) => void
  isDisabled?: boolean
  defaultValue?: string | number | readonly string[]
  onEnter?: () => void
  onFocus?: () => void
}

const ManualInput = ({
  type,
  onChange,
  isDisabled,
  defaultValue,
  onEnter,
  onFocus,
}: ManualInputProps) => {
  return (
    <InputWrapper>
      <InputDiv isDisabled={isDisabled}>
        <InputStyled
          disabled={isDisabled}
          type={type}
          value={defaultValue}
          onChange={(e: any) => onChange(e.currentTarget.value)}
          onFocus={onFocus}
        />
      </InputDiv>
    </InputWrapper>
  )
}

export default memo(ManualInput)
