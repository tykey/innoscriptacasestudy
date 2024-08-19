import styled from '@emotion/styled'
import {
  INNO_MAIN_COLOR,
  INNO_MAIN_COLOR_FADED,
} from '../../shared/constants/colors'
import {
  CHANGE_TRANSITION,
  HOVER_TRANSITION,
} from '../../shared/constants/transitions'

export const HomepageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 20px;
  flex: 1 1 auto;
  padding: 15px 0;
  box-sizing: border-box;
  position: relative;
`

export const HomepageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`
export const HomepageSectionsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  flex: 1;
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

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 20px;
  color: white;
  flex: 1;
`

type HiddenWrapperProps = {
  isHidden: boolean
}

export const HiddenWrapper = styled.div<HiddenWrapperProps>`
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  transition: ${CHANGE_TRANSITION};
`
type SearchIconWrapperProps = {
  isClicked: boolean
  isVisible: boolean
}

export const SearchIconWrapper = styled.div<SearchIconWrapperProps>`
  position: absolute;
  cursor: ${(props) => (props.isVisible ? 'pointer' : 'default')};
  right: 53px;
  z-index: 10;
  transition: ${CHANGE_TRANSITION};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'all' : 'none')};

  > svg {
    fill: ${(props) => (props.isClicked ? INNO_MAIN_COLOR : '#E9E9E9')};
    width: 2em;
    transition: ${HOVER_TRANSITION};

    &:hover {
      fill: ${(props) => (props.isClicked ? INNO_MAIN_COLOR : 'white')};
    }
  }
`
export const FilterIconWrapper = styled.div`
  cursor: pointer;

  > svg {
    width: 2em;
    fill: white;
  }
`
