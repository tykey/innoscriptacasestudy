import styled from '@emotion/styled'
import { SIDEBAR_WIDTH } from '../../constants/dimensions'
import { SLIDER_TRANSITION } from '../../constants/transitions'

type FilterBoxWrapperProps = {
  isVisible: boolean
}

export const FilterBoxWrapper = styled.div<FilterBoxWrapperProps>`
  position: absolute;
  height: 100%;
  width: min(${SIDEBAR_WIDTH}, 100%);
  right: ${(props) =>
    props.isVisible ? '10px' : `max(-${SIDEBAR_WIDTH}, -100%)`};
  background-color: white;
  transition: ${SLIDER_TRANSITION};
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.isVisible ? '-4px 0px 2px 4px #00000020' : 'none'};
  z-index: 50;
`
