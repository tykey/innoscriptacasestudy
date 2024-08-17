import styled from '@emotion/styled'
import { INNO_SECONDARY_COLOR } from '../../../constants/colors'

export const InputWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 6px;
  flex: 1 1 auto;
  position: relative;
  background-color: white;
  border-radius: 10px;
`

export const InputDiv = styled.div<ManualInputProps>`
  position: relative;
  width: calc(100% - 32px);
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
`

type ManualInputProps = {
  isDisabled?: boolean
}

export const InputStyled = styled.input<ManualInputProps>`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 auto;
  padding: 10px 2px 10px 10px;
  background-color: white;
  border-radius: 10px;
  border: none;
  cursor: ${(props) => (props.disabled ? 'default' : 'text')};
  z-index: 5;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  outline: none;
  width: 100%;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`
