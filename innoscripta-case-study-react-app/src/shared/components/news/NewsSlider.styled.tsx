import styled from '@emotion/styled'
import {
  CHANGE_TRANSITION,
  HOVER_TRANSITION,
  SLIDER_TRANSITION,
} from '../../constants/transitions'
import {
  FADED_DIV_WIDTH,
  SLIDER_FAKE_PADDING_HORIZONTAL,
  SLIDER_FAKE_PADDING_VERTICAL,
} from '../../constants/dimensions'
import { INNO_MAIN_COLOR } from '../../constants/colors'

type VisibilityProps = {
  isVisible: boolean
}

export const NewsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 80%;
  gap: 20px;
  flex: 1 0 auto;
  overflow-x: hidden;
`

export const FadedDivLeft = styled.div`
  position: absolute;
  height: 100%;
  width: ${FADED_DIV_WIDTH};
  top: 0;
  left: 0;
  z-index: 25;
  background: linear-gradient(
    90deg,
    ${INNO_MAIN_COLOR} 0%,
    ${INNO_MAIN_COLOR} 60%,
    rgba(255, 255, 255, 0) 100%
  );
`

export const FadedDivRight = styled.div`
  position: absolute;
  height: 100%;
  width: ${FADED_DIV_WIDTH};
  top: 0;
  right: 0;
  z-index: 25;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    ${INNO_MAIN_COLOR} 40%,
    ${INNO_MAIN_COLOR} 100%
  );
`

export const VisibilityWrapper = styled.div<VisibilityProps>`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: ${CHANGE_TRANSITION};
`

export const SliderWrapper = styled.div<VisibilityProps>`
  position: relative;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  height: 100%;
  width: calc(100% - ${SLIDER_FAKE_PADDING_HORIZONTAL});
  flex: 0 1 auto;
  gap: 10px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition:
    opacity 0.2s ease-out,
    0.4s ease-in-out;
  z-index: 20;
`

export const SingleNewsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex: 0 0 100%;
`

export const ArticleDiv = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  flex: 0 0 auto;
  font-size: 1.2em;
  gap: 20px;
`

export const ArticleHeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 4px;
`

export const NavigationButtonsDiv = styled.div<VisibilityProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: ${CHANGE_TRANSITION};
`

type PreviousSpanWrapperProps = {
  isDisabled: boolean
}

export const PreviousSpanWrapper = styled.div<PreviousSpanWrapperProps>`
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
  transition: ${HOVER_TRANSITION};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'all')};
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  user-select: none;
`
