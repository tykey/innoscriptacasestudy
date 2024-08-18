import styled from '@emotion/styled'
import { SIDEBAR_WIDTH } from '../../constants/dimensions'
import { SLIDER_TRANSITION } from '../../constants/transitions'
import { INNO_MAIN_COLOR } from '../../constants/colors'

type FilterBoxWrapperProps = {
  isVisible: boolean
}

export const FilterBoxWrapper = styled.div<FilterBoxWrapperProps>`
  position: absolute;
  height: 100%;
  max-height: 420px;
  width: min(${SIDEBAR_WIDTH}, 100%);
  right: ${(props) =>
    props.isVisible ? '10px' : `max(-${SIDEBAR_WIDTH}, -100%)`};
  background-color: white;
  transition: ${SLIDER_TRANSITION};
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.isVisible ? '-4px 0px 2px 4px #00000020' : 'none'};
  z-index: 50;
  color: ${INNO_MAIN_COLOR};
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 20px;
`

export const FilterHeader = styled.div`
  width: 100%;
  padding: 0 0 5px 0;
  box-sizing: border-box;
  border-bottom: solid 2px;
  border-image: linear-gradient(
      90deg,
      transparent 0%,
      ${INNO_MAIN_COLOR} 5%,
      transparent 80% 100%
    )
    100% 1;
  font-size: 1.1em;
`

export const FilterSectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  flex: 1 0 auto;
  gap: 20px;
`

export const FilterSectionVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 5px;
  width: 100%;
  padding: 0 5px 0 5px;
  box-sizing: border-box;
  font-size: 0.9em;
`

export const FilterSectionVerticalOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 2px;
  width: 100%;
  box-sizing: border-box;
`

export const FilterSectionHeader = styled.div`
  width: 100%;
`
export const FilterApplyDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
  width: 100%;
`
