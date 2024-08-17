import styled from '@emotion/styled'
import {
  INNO_SECONDARY_COLOR,
  INNO_SECONDARY_COLOR_DISABLED,
  INNO_SECONDARY_COLOR_HOVER,
} from '../../../constants/colors'
import {
  CHANGE_TRANSITION,
  HOVER_TRANSITION,
} from '../../../constants/transitions'

type DefaultButtonStyledProps = {
  fontSize?: string
  isDisabled?: boolean
}

export const DefaultButtonStyled = styled.button<DefaultButtonStyledProps>`
  appearance: none;
  outline: none;
  background-color: ${(props) =>
    props.isDisabled ? INNO_SECONDARY_COLOR_DISABLED : INNO_SECONDARY_COLOR};
  border: none;
  color: white;
  padding: 12px 25px;
  box-sizing: border-box;
  border-radius: 2em;
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  font-size: ${(props) => props.fontSize ?? '1em'};
  transition: ${HOVER_TRANSITION};
  user-select: none;

  &:hover {
    background-color: ${(props) =>
      props.isDisabled
        ? INNO_SECONDARY_COLOR_DISABLED
        : INNO_SECONDARY_COLOR_HOVER};
  }
`
