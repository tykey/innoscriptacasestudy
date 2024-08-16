import styled from '@emotion/styled'
import {
  INNO_MAIN_COLOR,
  INNO_MAIN_COLOR_FADED,
} from '../../shared/constants/colors'
import { CHANGE_TRANSITION } from '../../shared/constants/transitions'

export const HomepageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 20px;
  flex: 1 0 auto;
  padding: 10px;
  box-sizing: border-box;
`

export const HomepageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 15px;
`
type HomepageHeaderButtonProps = {
  isSelected: boolean
}

export const HomepageHeaderButton = styled.button<HomepageHeaderButtonProps>`
  appearance: none;
  outline: none;
  background-color: ${(props) => (props.isSelected ? 'white' : 'transparent')};
  border: solid 1px ${(props) => (props.isSelected ? 'transparent' : 'white')};
  color: ${(props) => (props.isSelected ? INNO_MAIN_COLOR : 'white')};
  transition: ${CHANGE_TRANSITION};
  padding: 10px;
  box-sizing: border-box;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? 'white' : INNO_MAIN_COLOR_FADED};
  }
`
