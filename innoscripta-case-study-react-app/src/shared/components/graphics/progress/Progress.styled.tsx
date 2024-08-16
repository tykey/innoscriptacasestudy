import styled from '@emotion/styled'
import { CHANGE_TRANSITION } from '../../../constants/transitions'

export const ProgressDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  transition: ${CHANGE_TRANSITION};
`
type CircleWrapperProps = {
  isSelected: boolean
  width: string
}

export const CircleWrapper = styled.div<CircleWrapperProps>`
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
  cursor: pointer;
  transition: all 0.2s ease-out;

  > svg {
    fill: white;
    width: ${(props) => props.width};
  }

  &:hover {
    opacity: ${(props) => (props.isSelected ? 1 : 0.7)};
  }
`
